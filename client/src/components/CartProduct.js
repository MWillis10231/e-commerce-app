import React, { useEffect, useState } from "react";
import productImages from "../javascript/productimages";

export default function ProductSingle(props) {
  //fetches a single product by its ID (passed through props.id)
  useEffect(() => {
    if (props.id) {
      const fetchProduct = async () => {
        const fetchProduct = await fetch(
          `http://localhost:5000/products/${props.id}`
        );
        const product = await fetchProduct.json();
        setProduct(product);
      };
      fetchProduct();
    }
  }, [props.id]);

  // product is assigned into state below, as is the quantity (this is update-able through the cart)
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(props.quantity);

  // put request function, takes in the data and assigns it as the body of the request
  async function updateProduct(data = {}) {
    const response = await fetch("http://localhost:5000/cart/", {
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
        console.log(`The old quantity is ${quantity}`);
        console.log(`The old quantity is ${productId}`);
        //work out the difference to update
        let newQuantity = quantity - props.quantity;
        console.log(
          `There difference between the two / the update to the old quantity is = ${newQuantity}`
        );

        // create an object with the data
        let productToAdd = { productId: productId, quantity: newQuantity };
        updateProduct(productToAdd).then((response) =>
          response.json().then((response) => console.log(response))
        );
        // should add a single product to the cart (0) here
        event.preventDefault();
        alert("Item quantity updated successfully!");
        props.updateCart();
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
        // original quantity is props.quantity, new quantity is a negative version of that
        let quantity = props.quantity * -1;
        console.log(quantity);
        // get productid from the state
        let productId = product.product_id;
        // create an object with the data
        let productToAdd = { productId: productId, quantity: quantity };
        updateProduct(productToAdd).then((response) =>
          response.json().then((response) => console.log(response))
        );
        // should remove a single product to the cart (0) here
        event.preventDefault();
        alert("Item removed successfully!");
        props.updateCart();
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
  let image;

  if (product) {
    // if category is book, or audio/visual, set the "brand" to a person/author/director rather than a company
    if (product.category === 1 || product.category === 2) {
      brand = product.creator;
    } else {
      brand = product.company;
    }
    // set up the image relevant to the category too
    image = productImages[product.category];

    data = (
      <React.Fragment>
        <div className="ProductImageContainer">
          <figure>
            <img src={image} alt="product" className="ProductImage" />
          </figure>
        </div>
        <div className="ProductInformationContainer">
          <h3>{product.name}</h3>
          <h4>
            {brand}, {product.year}
          </h4>
          <h4>Price: {product.price}$</h4>
        </div>
        <form className="ProductAddToCart" onSubmit={updateProductCount}>
          <div className="FormItem">
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
        <form onSubmit={deleteProduct}>
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
