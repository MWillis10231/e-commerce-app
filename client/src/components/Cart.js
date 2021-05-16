import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, useRouteMatch, useHistory, useLocation } from "react-router";
import { Link } from "react-router-dom";
import { getCart, selectCartContents, calculateCartTotals, deleteCart, selectTotalItems, selectTotalPrice } from "../features/cartSlice";
import { getAllProducts } from "../features/productSlice";
import { selectLoggedIn } from "../features/userSlice";
import CartProduct from "./CartProduct";
import OrderSummary from "./OrderSummary";
import Payment from "./Payment";

export default function Cart(props) {
  const [order, setOrder] = useState('')
  const dispatch = useDispatch()

  const cart = useSelector(selectCartContents)
  const totalItems = useSelector(selectTotalItems)
  const totalPrice = useSelector(selectTotalPrice)
  const loggedIn = useSelector(selectLoggedIn)

  let match = useRouteMatch();
  let history = useHistory();
  let location = useLocation();

  // get all Products and get the cart
  // cart contains the ids of products
  useEffect(() => {
    dispatch(getCart())
    dispatch(getAllProducts())
    dispatch(calculateCartTotals())
  }, [dispatch])

  let cartContents;
  let cartButton;

  if (cart.items === "no cart") {
    cartContents = "You have no cart. Please add something to create one";
  } else if (cart.items === "empty") {
    cartContents = "Cart is empty. Please add something to your cart";
  } else if (Array.isArray(cart.items)) {
    // first updates the quantity total, second maps each to an individual cartItem
    //dispatch(calculateCartTotals({totalQuantity: quantity, totalPrice: price}))
    cartContents = cart.items.map(function (cartItem, index) {
      return (
        <CartProduct
          id={cartItem.id}
          quantity={cartItem.quantity}
          key={index}
          number={index + 1}
        />
      );
    });
  } else {
    cartContents = "No cart could be found";
  }

  // if there's stuff in the cart and you're logged in, then show the button to proceed
  if (Array.isArray(cart.items) && loggedIn) {
    cartButton = (
      <Link to={`${match.path}/payment`}>
        <button>Add payment details</button>
      </Link>
    );
  } else if (loggedIn) {

  } else {
    cartButton = <p>Please <Link to="/login">sign in</Link> or <Link to="/register">register</Link> to complete your order</p>
  }


  async function removeCart() {
    dispatch(deleteCart)
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
      removeCart();
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
              <td>${totalPrice}</td>
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
          <OrderSummary />
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
