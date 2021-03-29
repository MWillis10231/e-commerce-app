import ProductsListItem from "./ProductsListItem.js";
import React, { useEffect, useState } from "react";
import { useRouteMatch, useLocation } from "react-router-dom";

export default function ProductsList(props) {
  let match = useRouteMatch();
  let location = useLocation().pathname
  let search = useLocation().search

  // find out the search term used from these params (if the index of the second doesn't exist, return undefined so no endIndex on slice)
  let searchTerm = search.slice((search.indexOf('=') + 1), (search.indexOf('&') !== -1 ? search.indexOf('&'): undefined))

  useEffect(() => {
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
    const fetchAllProducts = async () => {
      setProducts([])
      const data = await fetch(`http://localhost:5000${location+search}`);
      const products = await data.json();
      setProducts(products);
      if (match.params.categoryId) {
        setCategory(`Category: ${productCategories[match.params.categoryId]}`)
      } else {
        setCategory()
      }
    };
    fetchAllProducts();
  }, [location, match.params.categoryId, match.url, search]);

  const [products, setProducts] = useState("Loading...");
  const [category, setCategory] = useState([]);

  let data;
  console.log(products);

  if (Array.isArray(products)) {
    data = products.map(function (product, index) {
      return (
        <ProductsListItem
          data={products[index]}
          key={index}
          number={index + 1}
        />
      );
    });
  } else if (products === "Loading...") {
    data = "Loading..."
  }else {
    data = "No products found";
  }

  let numberOfResults = products.length

  // if there's a search term, log it
  let searchTermText
  if (searchTerm) {
    searchTermText = 'Search for: ' + searchTerm
  }

  let allProducts
  if (!searchTermText && !category) {
    allProducts =  (<React.Fragment>
    <h3>All products</h3>
    <p>Limit results by searching for a product or filter by a category above.</p>
    </React.Fragment>
    )
  }

  return (
    <div className="Content">
      <h3>{category}{searchTermText}</h3>
      {allProducts}
      <h4>{numberOfResults} Results</h4>
      <div className="ProductListContainer">{data}</div>
    </div>
  );
}
