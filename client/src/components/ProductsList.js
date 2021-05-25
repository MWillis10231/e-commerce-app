import { splitProductListArray } from "./productListFunctions";
import React, { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import SortBar from "./Sort.js";
import ProductsListPageBar from "./ProductsListPageBar.js";
import { getAllProducts, selectAllProducts, selectItemsPerPage, selectSearch, updateCategory, selectUseSearch, selectProductStatus, selectCategory } from "../features/productSlice.js";
import { useSelector, useDispatch } from "react-redux";
import ProductListContainer from "./ProductListContainer.js";

export default function ProductsList() {
  const dispatch = useDispatch();
  const products = (useSelector(selectAllProducts));
  const productStatus = useSelector(selectProductStatus)
  const itemsPerPage = useSelector(selectItemsPerPage);
  const categoryIndex = useRouteMatch().params.categoryId;
  const search = useSelector(selectSearch)

  // useSearch is true/false depending on whether there is a search or filter currently on
  const useSearch = useSelector(selectUseSearch)
  const category = useSelector(selectCategory)

  // get the products on load & dispatch the category to filter the products
  // if there's a category, set the products to that category instead of the full list
  useEffect(() => {
    if (categoryIndex) {
      dispatch(updateCategory(categoryIndex))
    }
    if (useSearch) {
      dispatch(getAllProducts(search))
    } else if (categoryIndex !== 0) {
      dispatch(getAllProducts(parseInt(categoryIndex)))
    } else {
      dispatch(getAllProducts())
    }
    
  }, [categoryIndex, dispatch, search, useSearch])

  // set the page of products we are currently on
  const [page, setPage] = useState(0)

  function updatePage(newPage) {
    setPage(newPage)
  }

  // divide the products up, 25 per page etc.
  const dividedArray = splitProductListArray(products, itemsPerPage)

  // calculate the number of results to display
  let numberOfResults = products.length;

  // if there is search term text, display it
  let searchTermText;
  if (search.name) {
    searchTermText = "Search for: " + search.name;
  } else {
    searchTermText = undefined;
  }

  let content

  if (productStatus === "success") {
    content = dividedArray.map(function (value, index) {
      return (
        <ProductListContainer products={value} displayPage={index} currentPage={page} key={index}/>
      ) 
    })
  } else if (productStatus === "loading") {
    content = "Loading...";
    numberOfResults = "Loading"
  } else {
    content = "No products found";
    numberOfResults = 0
  }

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
      </h3>
      <h4 style={{display: searchTermText ? "block" : "none"}}>{searchTermText}</h4>
      {allProducts}
      <h4>{numberOfResults} Results</h4>
      <SortBar />
      <ProductsListPageBar pages={dividedArray.length} currentPage={page} updatePage={updatePage} />
      {content}
    </div>
  );
}
