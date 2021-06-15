import React, { useState } from "react";
import { Link } from "react-router-dom";
import { selectSingleProduct } from "../features/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { updateCart, selectSingleCartItem, removeCartItem, calculateCartTotals } from "../features/cartSlice";

export default function CartProduct(props) {
  //fetches a single product by its ID (passed through props.id)
  const product = useSelector(state => selectSingleProduct(state, props.id))
  const cartItem = useSelector(state => selectSingleCartItem(state, props.id))
  const [quantity, setQuantity] = useState(cartItem.quantity);
  
  const dispatch = useDispatch();

  // put request function, takes in the data and assigns it as the body of the request
  async function updateProduct(data = {}) {
    const response = await fetch("/api/cart/", {
      method: "PUT",
      mode: "cors",
      credentials: "include",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(data),
    });
    return response;
  }

  async function updateProductCount(event) {
    // preventDefault stops the onsubmit default getReq, which would GET (incl. putting data in url)
    if (props.id) {
      try {
        // original quantity is props.quantity, new quantity is from the form
        let quantity = document.getElementById(`quantity${props.id}`).value;
        // get productid from the state
        let productId = product.product_id;
        //console.log(`The old quantity is ${quantity}`);
        //console.log(`The old quantity is ${productId}`);
        //work out the difference to update
        let newQuantity = quantity - props.quantity;
/*         console.log(
          `There difference between the two / the update to the old quantity is = ${newQuantity}`
        ); */

        // create an object with the data
        let productToAdd = { productId: productId, quantity: newQuantity };
        updateProduct(productToAdd).then((response) =>
          response.json().then((response) => console.log(response))
        );
        // dispatch to Redux and prevent default
        dispatch(updateCart({id: productId, quantity: quantity}))
        dispatch(calculateCartTotals())
        event.preventDefault();
      } catch (error) {
        console.log(error);
        event.preventDefault();
      }
    }
  }

  async function deleteProduct(event) {
    // preventDefault stops the onsubmit default getReq, which would GET (incl. putting data in url)
    if (props.id) {
      try {
        // original quantity is cartItem.quantity, new quantity is a negative version of that
        let quantity = cartItem.quantity * -1;
        //console.log(quantity);
        // get productid from the state
        let productId = product.product_id;
        // create an object with the data
        let productToAdd = { productId: productId, quantity: quantity };
        updateProduct(productToAdd).then((response) =>
          response.json().then((response) => console.log(response))
        );
        // dispatch to Redux and prevent default
        dispatch(removeCartItem({id: productId}))
        dispatch(calculateCartTotals())
        event.preventDefault();
      } catch (error) {
        console.log(error);
        event.preventDefault();
      }
    }
  }

  // updates the quantity when the field is altered
  function updateQuantity(event) {
    setQuantity(event.target.value);
  }

  // set up the images /brand based on category
  let data;
  let brand;
  let image

  if (product) {
    image = `/api/images/${product.image}`
    if (product.category === 1 || product.category === 2) {
      brand = product.creator
    } else {
      brand = product.company
    }

    data = (
      <React.Fragment>
        <div className="ProductImageContainer">
          <figure>
            <img src={image} alt="product" className="ProductImage" />
          </figure>
        </div>
        <div className="ProductInformationContainer">
          <h3><Link to={`/products/${props.id}`}>{product.name}</Link></h3>
          <h4>
            {brand}, {product.year}
          </h4>
          <p>Unit Price: ${product.price}</p>
          <h4>Total Price: ${product.price * quantity}</h4>
        </div>
        <form className="ProductAddToCart" onSubmit={updateProductCount}>
          <div className="CartFormItem">
            <label htmlFor="quantity">Quantity</label>
            <input
              type="number"
              id={`quantity${props.id}`}
              name="quantity"
              maxLength="4"
              required
              value={quantity}
              onInput={updateQuantity}
              min="1"
              step="1"
            />
          </div>
          <div className="FormItem">
            <button className="SubmitButton">Update</button>
          </div>
        </form>
        <form className="DeleteForm" onSubmit={deleteProduct}>
          <button className="DeleteButton">X</button>
        </form>
      </React.Fragment>
    );
  } else {
    data = "Loading..";
  }

  return (
    <React.Fragment>
      <div className="ProductContainer">{data}</div>
    </React.Fragment>
  );
}
