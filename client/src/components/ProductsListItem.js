import { Link } from "react-router-dom";
import productImages from "../javascript/productimages";

export default function ProductsListItem(props) {
  let image = productImages[props.data.category];

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
          {props.data.score}/5, {props.data.ratings}
        </h5>
        <p className="Price">${props.data.price}</p>
      </div>
    </div>
  );
}
