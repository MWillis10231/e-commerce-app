import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouteMatch, useHistory } from "react-router-dom";
import { addCartItem } from "../features/cartSlice";
import Ratings from "./Ratings";

export default function ProductSingle(props) {
  const match = useRouteMatch();
  const dispatch = useDispatch()
  const history = useHistory();

  useEffect(() => {
    const fetchProduct = async () => {
      const fetchProduct = await fetch(
        `/api/products/${match.params.productId}`
      );
      const product = await fetchProduct.json();
      setProduct(product);
    };
    fetchProduct();
  }, [match.params.productId]);

  
  const [product, setProduct] = useState();
  const [productAmount, setProductAmount] = useState(1)

  async function addProduct(data = {}) {
    const response = await fetch('/api/cart/', {
      method: 'PUT',
      mode: 'cors',
      credentials: 'include',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: new URLSearchParams(data),
    });
    return response;
  }

  async function submitAddProduct(event) {
    event.preventDefault();
    // preventDefault stops the onsubmit default getReq, which would GET (incl. putting data in url)
    try {
      // get quantity from the form
        const quantity = document.getElementById('quantity').value;
      // get productid from the state
      const productId = product.product_id;
        //console.log(quantity)
        //console.log(productId)
      // create an object with the data
      const productToAdd = {productId: productId, quantity: quantity}
      addProduct(productToAdd).then(response => {
          console.log(response)
          if (response.ok) {
            console.log(response)
            dispatch(addCartItem({id: productId, quantity: quantity}))
            alert('Item added to cart successfully!')
          } else {
            console.log(response)
            throw Error('Item could not be added to cart')
          }
        })
    } catch (error) {
      console.log(error)
    }  
  } 

  let data;
  let brand;

  function onQuantityChange(event) {
    if (event.target.value > 0 && event.target.value < product.stock_amount) {
      setProductAmount(event.target.value)
    } else if (event.target.value > product.stock_amount) {
      // prevents you from entering a value more than there is stock for
      setProductAmount(product.stock_amount)
    } else {
      // to prevent you from entering a value less than 1
      setProductAmount(1)
    }
  }

  function showBigImage() {
    let picture = document.getElementById("BigImageContainer")
    picture.style.display = "flex"
  }

  function hideBigImage() {
    let picture = document.getElementById("BigImageContainer")
    picture.style.display = "none"
  }

  if (product) {
    const image = `/api/images/${product.image}`
    if (product.category === 1 || product.category === 2) {
      brand = product.creator
    } else {
      brand = product.company
    }

    data = (
      <React.Fragment>
        <figure className="ProductImageContainerBig" id="BigImageContainer">
          <img src={image} alt="product" className="ProductImageBig" id="BigImage"/>
          <figcaption onClick={hideBigImage}>Click to hide</figcaption>
        </figure>
        <div className="ProductImageContainer">
          <figure>
            <img src={image} alt="product" className="ProductImage"/>
            <figcaption onClick={showBigImage}>Click to enlarge</figcaption>
          </figure>
        </div>
        <div className="ProductInformationContainer">
          <h3 className="ProductName">{product.name}</h3>
          <div className="ProductInformation">
            <span className="ProductBrand">{brand}</span>
            <span className="ProductYear">{product.year}</span>
            <Ratings ratings={product.score} />
            <span className="ProductReviews">{product.ratings} reviews</span>
            <span className="ProductPrice">Price: <em>{product.price}$</em></span>
          </div>
          <p className="ProductDescription">
            {product.description}
          </p> 
        </div>
        <div className="ProductStockInformationContainer">
          <h3>In stock</h3>
          <p>Stock amount: {product.stock_amount}</p>
          <form className="ProductAddToCart" onSubmit={submitAddProduct}>
            <div className="FormItem" id="ProductQuantityContainer">
                <label htmlFor="quantity">Quantity</label>
                <input type="number" id="quantity" name="quantity" maxLength="4" required min="1" max={product.stock_amount} value={productAmount} onChange={onQuantityChange}/>
            </div>
            <p>Total price: <span className="ProductTotalPrice">{productAmount ? (product.price * productAmount).toFixed(2) : product.price}$</span></p>
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
    <header className="BackResults" onClick={history.goBack}>&larr; Back</header>
    <div className="ProductContainer">{data}</div>
  </div>
  )
}
