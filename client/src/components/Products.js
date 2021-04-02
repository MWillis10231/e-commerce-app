import { Switch, Route, useRouteMatch, useLocation } from "react-router-dom";
import ProductsList from "./ProductsList";
import ProductSingle from "./ProductSingle";
import Filter from "./Filter";
import { Fragment } from "react";
import React, { useEffect, useState } from "react";

export default function Products(props) {
  let match = useRouteMatch();
  let searchLocation = useLocation().search;
  let location = useLocation().pathname;
  let searchTerm = `?name=${props.search}`;

  const [searchString, setSearchString] = useState("");
  const [searchParams, setSearchParams] = useState({});

  //this updates params into text search
  useEffect(() => {
    function updateParams(){
      let newSearch = "&";
      /*       if (combinedParams.search) {
              newSearch = newSearch + `name=${combinedParams.search}&`
            } */
      if (searchParams.category && searchParams.category !== 0) {
        newSearch = newSearch + `category=${searchParams.category}&`;
      }
      if (searchParams.pricemin) {
        newSearch = newSearch + `pricemin=${searchParams.pricemin}&`;
      }
      if (searchParams.pricemax) {
        newSearch = newSearch + `pricemax=${searchParams.pricemax}&`;
      }
      if (searchParams.minrating) {
        newSearch = newSearch + `minrating=${searchParams.minrating}&`;
      }
      if (searchParams.maxrating) {
        newSearch = newSearch + `maxrating=${searchParams.maxrating}`;
      }
      if (searchParams.sort) {
        newSearch = newSearch + `&orderby=${searchParams.sort}`;
      }
      setSearchString(newSearch);
    }
    updateParams()
  }, [searchParams.category, searchParams.maxrating, searchParams.minrating, searchParams.pricemax, searchParams.pricemin, searchParams.sort]);

  // this fetches the data
  useEffect(() => {
    const fetchAllProducts = async () => {
      setProducts([]);
      if (searchString === "") {
        //console.log(`http://localhost:5000${location + searchLocation}`);
        const data = await fetch(
          `http://localhost:5000${location + searchLocation}`
        );
        const products = await data.json();
        setProducts(products);
      } else {
        //console.log(
        //  `http://localhost:5000${location}${searchTerm}${searchString}`
        //);
        const data = await fetch(
          `http://localhost:5000${location}${searchTerm}${searchString}`
        );
        const products = await data.json();
        setProducts(products);
      }
    };
    fetchAllProducts();
  }, [
    location,
    match.params.categoryId,
    match.url,
    searchString,
    searchLocation,
    searchTerm,
  ]);

  function updateSearch(newParams) {
    // this function takes an oldParams = props.search/useLocation().search, makes it into an object
    if (typeof newParams === "object") {
      let combinedParams = Object.assign({}, searchParams, newParams);
      setSearchParams(combinedParams);
    }
  }

  const [products, setProducts] = useState("Loading...");

  return (
    <Fragment>
      <Switch>
        <Route path={`${match.path}/search`} exact>
          <Filter updateSearch={updateSearch} />
          <ProductsList
            update={match}
            products={products}
            updateSearch={updateSearch}
            search={props.search}
          />
        </Route>
        <Route path={`${match.path}/:productId`} exact>
          <ProductSingle addCartItem={props.addCartItem} />
        </Route>
        <Route path={`${match.path}/category/:categoryId`} exact>
          <Filter search={searchString} />
          <ProductsList update={match} products={products} updateSearch={updateSearch}/>
        </Route>
        <Route path={`${match.path}/`} exact>
          <Filter search={searchString} />
          <ProductsList products={products} updateSearch={updateSearch}/>
        </Route>
      </Switch>
    </Fragment>
  );
}
