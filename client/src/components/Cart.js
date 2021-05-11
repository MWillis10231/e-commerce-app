import React, { useEffect, useState } from "react";
import { Route, Switch, useRouteMatch, useHistory, useLocation } from "react-router";
import { Link } from "react-router-dom";
import CartProduct from "./CartProduct";
import OrderSummary from "./OrderSummary";
import Payment from "./Payment";

export default function Cart(props) {
  const [cart, setCart] = useState("Loading");
  const [cartUpdated, setCartUpdated] = useState(false);
  const [order, setOrder] = useState('')


  let match = useRouteMatch();
  let history = useHistory();
  let location = useLocation();

  // function to force a cart update (maybe it should update the number near cart)
  function updateCart() {
    setCartUpdated(false);
  }

  useEffect(() => {
    if (cartUpdated === false) {
      const fetchCart = async () => {
        setCart("Loading");
        // it needs to include credentials on any request that requires passport otherwise it won't show
        const cartData = await fetch("/api/cart/", {
          credentials: "include",
        });
        const cartContents = await cartData.json();
        setCart(cartContents);
        if (Array.isArray(cartContents.items)) {
          props.updateCart(cartContents.items.length);
        } else props.updateCart(0);
      };
      fetchCart();
      setCartUpdated(true);
    }
  }, [cartUpdated, props]);

  let cartContents;
  let cartButton;

  let totalItems = 0;

  //this is a bit inefficient, because we are fetching now and then fetching again in each CartProduct
  async function fetchProductPrice(id) {
    const fetchProduct = await fetch(
      `/api/products/${id}`
    );
    const product = await fetchProduct.json();
    return product.price;
  };

  // this is a bit of a silly way to update the price I'm sure
  const [total, setTotal] = useState(0)

  useEffect(() => {
    if (Array.isArray(cart.items)) {
      let newTotal = 0
      cart.items.forEach(async function(item) { 
        const price = await fetchProductPrice(item.id);
        const priceNumber = parseInt(price) * item.quantity;
        newTotal += priceNumber
        setTotal(newTotal)
        })
    } else {
      setTotal(0)
    }
  }, [cart.items])

  if (cart.items === "no cart") {
    cartContents = "You have no cart. Please add something to create one";
  } else if (cart.items === "empty") {
    cartContents = "Cart is empty. Please add something to your cart";
  } else if (Array.isArray(cart.items)) {
    // first updates the quantity total, second maps each to an individual cartItem
    cart.items.forEach(item => totalItems += item.quantity);
    cartContents = cart.items.map(function (cartItem, index) {
      return (
        <CartProduct
          id={cartItem.id}
          quantity={cartItem.quantity}
          key={index}
          number={index + 1}
          updateCart={updateCart}
        />
      );
    });
  } else {
    cartContents = "Something went wrong, please try again later";
  }

  // if there's stuff in the cart and you're logged in, then show the button to proceed
  if (Array.isArray(cart.items) && props.loggedIn) {
    cartButton = (
      <Link to={`${match.path}/payment`}>
        <button>Add payment details</button>
      </Link>
    );
  } else if (props.loggedIn) {

  } else {
    cartButton = <p>Please <Link to="/login">sign in</Link> or <Link to="/register">register</Link> to complete your order</p>
  }


  async function deleteCart() {
    const response = await fetch(
      `/api/cart/${cart.id}/delete/`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );
    const orderData = await response.json();
    console.log(orderData);
  }


  async function submitCart() {
    const response = await fetch(
      `/api/cart/${cart.id}/checkout/`,
      {
        method: "POST",
        credentials: "include",
      }
    );
    const orderData = await response.json();
    console.log(orderData);
    console.log(orderData.success);
    if (orderData.success) {
      history.push(`${match.path}/success`);
      deleteCart();
      setCartUpdated(false);
      setOrder(orderData)
      console.log(order)
    } else {
      history.push(`${match.path}/fail`);
    }
  }

  let paymentAccepted

  if (location.payment === true) {
    paymentAccepted = <React.Fragment>
        <p>Payment method accepted</p>
        <p>Here in a "real" app you'd enter an address, choose postage / delivery methods etc.</p>
    <button onClick={submitCart}>Confirm purchase</button>

      </React.Fragment>
  } else {
    paymentAccepted = <React.Fragment>
      <p>Sorry there was an error</p>
      <Link to="/">Return home</Link>
    </React.Fragment>
  }

  return (
    <div className="Content">
      <Switch>
        <Route path={`${match.path}/`} exact>
          <header>
            <h3>Cart</h3>
          </header>
          <p>Here are the contents of your cart</p>
          {cartContents}
          <h4>Cart Summary</h4>
          <table>
            <tr>
              <th>Total Items</th>
              <th>Total Price</th>
              </tr>
            <tr>
              <td>{totalItems}</td>
              <td>${total}</td>
            </tr>
          </table>
          {cartButton}
        </Route>
        <Route path={`${match.path}/payment`} exact>
          <header>
            <h3>Payment</h3>
          </header>
          <p>Feel free to test this with one of the fake cards on the Stripe Docs. Located here:</p>
          <a href="https://stripe.com/docs/testing#international-cards" target="_blank" rel="noreferrer">Stripe Test Cards</a>
          <Payment />
          <Link to={`${match.path}/finalise`}>
          </Link>
        </Route>
        <Route path={`${match.path}/finalise`} exact>
          {paymentAccepted}
        </Route>
        <Route path={`${match.path}/success`} exact>
          <p>Order complete! Here is a summary of your order:</p>
          <OrderSummary customerId={props.userId}/>
          <Link to="/profile">View all orders</Link>
          <Link to="/">Return home</Link>
        </Route>
        <Route path={`${match.path}/fail`} exact>
          <p>Order failed!</p>
        </Route>
      </Switch>
    </div>
  );
}
