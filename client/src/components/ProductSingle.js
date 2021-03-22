import React, { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import productImages from '../javascript/productimages'

export default function ProductSingle(props) {
  useEffect(() => {
    fetchProduct();
  }, []);

  let match = useRouteMatch();
  const [product, setProduct] = useState({});

  const fetchProduct = async () => {
    const fetchProduct = await fetch(
      `http://localhost:5000/products/${match.params.productId}`
    );
    const product = await fetchProduct.json();
    setProduct(product);
  };

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
          <form className="ProductAddToCart">
            <input></input>
            <button className="SubmitButton" >Add to cart</button>
          </form>
        </div>
      </React.Fragment>
    );
  } else {
    data = "Loading..";
  }

  return (
  <React.Fragment>
    <header className="BackResults">&larr; Back to your results</header>
    <div className="ProductContainer">{data}</div>
  </React.Fragment>
  )
}
