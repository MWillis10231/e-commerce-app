import React, { useEffect, useState } from "react";
import { useRouteMatch, useHistory } from "react-router-dom";
import productImages from '../javascript/productimages'

export default function ProductSingle(props) {
  useEffect(() => {
    fetchProduct();
  }, []);

  let history = useHistory();
  let match = useRouteMatch();
  const [product, setProduct] = useState({});

  const fetchProduct = async () => {
    const fetchProduct = await fetch(
      `http://localhost:5000/products/${match.params.productId}`
    );
    const product = await fetchProduct.json();
    setProduct(product);
  };

  async function addProduct(data = {}) {
    const response = await fetch('http://localhost:5000/cart/', {
      method: 'PUT',
      mode: 'cors',
      credentials: 'include',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: new URLSearchParams(data),
    });
    return response;
  }

  async function submitAddProduct(event) {
    // preventDefault stops the onsubmit default getReq, which would GET (incl. putting data in url)
    try {
      // get quantity from the form
        let quantity = document.getElementById('quantity').value;
      // get productid from the state
        let productId = product.product_id;
        console.log(quantity)
        console.log(productId)
      // create an object with the data
        let productToAdd = {productId: productId, quantity: quantity}
        addProduct(productToAdd).then(response => response.json().then(response => console.log(response)));
        // should add a single product to the cart (0) here
        event.preventDefault();
        alert('Item added to cart successfully!')
    } catch (error) {
      console.log(error)
      event.preventDefault();
    }  
  } 

  let data;
  let brand;
  let image;

  if (product) {
    // if category is book, or audio/visual, set the "brand" to a person/author/director rather than a company
    if (product.category === 1 || product.category === 2) {
      brand = product.creator
    } else {
      brand = product.company
    }
    // set up the image relevant to the category too
    image = productImages[product.category]

    data = (
      <React.Fragment>
        <div className="ProductImageContainer">
          <figure>
            <img src={image} alt="product" className="ProductImage"/>
            <figcaption>Hover to enlarge</figcaption>
          </figure>
        </div>
        <div className="ProductInformationContainer">
          <h3>{product.name}</h3>
          <h4>{brand}, {product.year}</h4>
          <h5>{product.score}/5, {product.ratings} reviews</h5>
          <h4>Price: {product.price}$</h4>
          <p>
            {product.description}
          </p> 
        </div>
        <div className="ProductStockInformationContainer">
          <h4>Price: {product.price}$</h4>
          <p>Stock: {product.stock_amount}</p>
          <form className="ProductAddToCart" onSubmit={submitAddProduct}>
            <div className="FormItem">
                <label htmlFor="quantity">Quantity</label>
                <input type="number" id="quantity" name="quantity" maxLength="4" required/>
            </div>
            <div className="FormItem">
              <button className="SubmitButton">Add to cart</button>
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  } else {
    data = "Loading..";
  }

  return (
  <div className="Content">
    <header className="BackResults" onClick={history.goBack}>&larr; Back to your results</header>
    <div className="ProductContainer">{data}</div>
  </div>
  )
}
