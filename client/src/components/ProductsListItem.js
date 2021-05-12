import { Link } from "react-router-dom";
import React from "react"

export default function ProductsListItem(props) {
  if (props.data) {
    const image = `/api/images/${props.data.image}`
    return (
      <div className="ProductListItemContainer">
        <div className="ProductListItemPictureContainer">
          <figure>
            <img src={image} className="ProductListItemPicture" alt="Product" />
          </figure>
        </div>
        <div className="ProductListItemContent">
          <h4 className="Title">
            <Link to={`/products/${props.data.product_id}`} className="Title">
              {props.data.name}
            </Link>
          </h4>
          <h5>
            {props.data.score/10}/5, {props.data.ratings}
          </h5>
          <p className="Price">${props.data.price}</p>
        </div>
      </div>
    );
  } else {
    return (
      <div>
      </div>
    )
  }
}
