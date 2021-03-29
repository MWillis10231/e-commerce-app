import ProductsListItem from "./ProductsListItem.js";
import React, { useEffect, useState } from "react";
import { useRouteMatch, useLocation } from "react-router-dom";

export default function ProductsList2(props) {
  let match = useRouteMatch();
  let location = useLocation().pathname;
  let search = useLocation().search;

  // find out the search term used from these params (if the index of the second doesn't exist, return undefined so no endIndex on slice)
  let searchTerm = search.slice(
    search.indexOf("=") + 1,
    search.indexOf("&") !== -1 ? search.indexOf("&") : undefined
  );

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
      setProducts([]);
      const data = await fetch(`http://localhost:5000${location + search}`);
      const products = await data.json();
      setProducts(products);
      if (match.params.categoryId) {
        setCategory(`Category: ${productCategories[match.params.categoryId]}`);
      } else {
        setCategory();
      }
    };
    fetchAllProducts();
  }, [location, match.params.categoryId, match.url, search]);

  const [products, setProducts] = useState("Loading...");
  const [category, setCategory] = useState([]);
  const [reducedProducts, setReducedProducts] = useState("Loading...");
  const [resultsPage, setResultsPage] = useState(1);
  const [resultsPerPage, setResultsPerPage] = useState(25);

  useEffect(() => {
    if (products && Array.isArray(products)) {
      setReducedProducts(products.slice(resultsPage - 1,
        resultsPage * resultsPerPage
      ))
    }
  }, [products, resultsPage, resultsPerPage])

  let data;

  if (Array.isArray(reducedProducts)) {
    data = reducedProducts.map(function (product, index) {
      return (
        <ProductsListItem
          data={products[index]}
          key={index}
          number={index + 1}
        />
      );
    });
  } else if (products === "Loading...") {
    data = "Loading...";
  } else {
    data = "No products found";
  }

  let numberOfResults = `Displaying ${resultsPage}-${resultsPerPage} of ${products.length}`;
  let pagesOfResults = Math.round(products.length / resultsPerPage);

  // if there's a search term, log it
  let searchTermText;
  if (searchTerm) {
    searchTermText = "Search for: " + searchTerm;
  }

  //update the results page
  function updateResultsPage(event) {
    setResultsPage(event.target.value);
  }

  let pagesResults = (
    <nav>
      <ul>
        <li onClick={updateResultsPage} value="1">1</li>
        <li onClick={updateResultsPage} value={resultsPage - 1}>Previous</li>
        <input type="number" value={resultsPage} onChange={updateResultsPage}></input>
        <li onClick={updateResultsPage} value={resultsPage + 1}>Next</li>
        <li onClick={updateResultsPage} value={pagesOfResults}>{pagesOfResults}</li>
      </ul>
    </nav>
  );

  return (
    <div className="Content">
      <div>{pagesResults}</div>
      <h3>
        {category}
        {searchTermText}
      </h3>
      <h4>{numberOfResults} Results</h4>
      <div className="ProductListContainer">{data}</div>
    </div>
  );
}
