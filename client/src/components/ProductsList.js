import ProductsListItem from "./ProductsListItem.js";
import { splitProductListArray } from "./productListFunctions";
import React, { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import SortBar from "./Sort.js";
import ProductsListPageBar from "./ProductsListPageBar.js";

export default function ProductsList(props) {
  let categoryIndex = useRouteMatch().params.categoryId;
  const [category, setCategory] = useState("");
  const [productArray, setProductArray] = useState(props.products)
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const [currentPage, setCurrentPage] = useState(0);

  const dividedArray = splitProductListArray(props.products, itemsPerPage)

  useEffect(() => {
    if (Array.isArray(props.products)) {
      setProductArray(dividedArray[currentPage])
    } else {
      setProductArray()
    }
  }, [currentPage, dividedArray, itemsPerPage, props.products])

  let searchTermText;
  if (props.search) {
    searchTermText = "Search for: " + props.search;
  } else {
    searchTermText = undefined;
  }

  let data;

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

    function applyCategory() {
      if (productCategories[categoryIndex] !== undefined) {
        setCategory(`Category: ${productCategories[categoryIndex]}`);
      }
      if (searchTermText !== undefined) {
        setCategory("");
      }
    }
    applyCategory();
  }, [category, categoryIndex, searchTermText]);

  if (Array.isArray(productArray)) {
    data = productArray.map(function (product, index) {
      return (
        <ProductsListItem
          data={props.products[index]}
          key={index}
          number={index + 1}
        />
      );
    });
  } else if (props.products === "Loading...") {
    data = "Loading...";
  } else {
    data = "No products found";
  }

  let numberOfResults = props.products.length;

  let allProducts;
  if (!searchTermText && !category) {
    allProducts = (
      <React.Fragment>
        <h3>All products</h3>
        <p>
          Limit results by searching for a product or filter by a category
          above.
        </p>
      </React.Fragment>
    );
  }

  return (
    <div className="Content">
      <h3>
        {category}
        {searchTermText}
      </h3>
      {allProducts}
      <h4>{numberOfResults} Results</h4>
      <SortBar updateSearch={props.updateSearch} />
      <ProductsListPageBar pages={dividedArray.length} />
      <div className="ProductListContainer">{data}</div>
    </div>
  );
}
