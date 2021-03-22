import ProductsListItem from "./ProductsListItem.js";
import React, { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";

export default function ProductsList(props) {
  useEffect(() => {
    fetchAllProducts();
  }, []);

  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(["Loading..."]);
  const productCategories = [
    "All products",
    "Books",
    "Audio/Visual",
    "Electronics",
    "Home & Garden",
    "Toys",
    "Clothes",
    "Sports & Outdoors",
    "Health & Beauty",
  ];

  let data;

  const fetchAllProducts = async () => {
    const data = await fetch(`http://localhost:5000${match.url}`);
    const products = await data.json();
    setProducts(products);
    if (match.params.categoryId) {
      setCategory(`Category: ${productCategories[match.params.categoryId]}`)
    } else {
      setCategory()
    }
  };

  let match = useRouteMatch();
  console.log(match);

  if (products) {
    data = products.map(function (product, index) {
      return (
        <ProductsListItem
          data={products[index]}
          key={index}
          number={index + 1}
        />
      );
    });
  } else {
    data = "Loading";
  }

  return (
    <React.Fragment>
      <h3>{category}</h3>
      <div className="ProductListContainer">{data}</div>
    </React.Fragment>
  );
}
