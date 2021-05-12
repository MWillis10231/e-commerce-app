import { useHistory } from "react-router-dom";
import { Fragment } from "react";
import RatingNumbers from "./RatingNumbers";
import React from "react"
import { useDispatch, useSelector } from "react-redux";
import { changeSearch, selectSearch, resetSearch } from "../features/productSlice";

export default function FilterBar(props) {
  // get the search from the state, use dispatch
  const search = useSelector(selectSearch)
  const dispatch = useDispatch()
  const history = useHistory();

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
  // this function maps filter boxes to product categories for the filter
  let categoryFilterBoxes = productCategories.map(function (category, index) {
    return (
      <div className="FilterCategoryItem">
        <input
          className="FilterInput"
          id={`Filter${category}`}
          name="category"
          type="radio"
          value={index}
          onChange={(e) => {
            history.push(`/products/category/${index}`)
            dispatch(changeSearch({category: e.target.value}))
          }}
        ></input>
        <label htmlFor={`Filter${category}`}>{category}</label>
      </div>
    );
  });

    const  categoryFilter = (<Fragment>        <h4>Filter by Category</h4>
      {categoryFilterBoxes}</Fragment>)


  return (
    <div className="FilterBar">
      <h3>Filter Results</h3>
      <form
        className="FilterForm"
        id="filter"
        name="filter"
      >
        {categoryFilter}
        <h4>Filter by Price</h4>
        <div>
          <div className="FilterContainer">
            <label htmlFor="PriceMin">Minimum Price</label>
            <input
              className="FilterInput"
              id="PriceMin"
              name="pricemin"
              type="number"
              min="0"
              maxLength="4"
              step="1"
              required
              value={search.pricemin}
              onChange={(e) => dispatch(changeSearch({pricemin: e.target.value}))}
            ></input>
          </div>
          <div className="FilterContainer">
            <label htmlFor="#PriceMax">Maximum Price</label>
            <input
              className="FilterInput"
              id="PriceMax"
              name="pricemax"
              type="number"
              min="1"
              maxLength="4"
              step="1"
              required
              value={search.pricemax}
              onChange={(e) => dispatch(changeSearch({pricemax: e.target.value}))}
            ></input>
          </div>
        </div>
        <h4>Filter by Rating</h4>
        <div className="FilterItem">
          <div className="FilterContainer">
            <label htmlFor="RatingMin">Minimum</label>
            <RatingNumbers />
            <input
              className="FilterInput"
              id="RatingMin"
              name="minrating"
              type="range"
              max="50"
              min="0"
              step="1"
              default="0"
              required
              value={search.minrating}
              onChange={(e) => dispatch(changeSearch({minrating: e.target.value}))}
            ></input>
          </div>
          <div className="FilterContainer">
            <label htmlFor="RatingMax">Maximum</label>
            <RatingNumbers />
            <input
              className="FilterInput"
              id="RatingMax"
              name="maxrating"
              type="range"
              max="50"
              min="0"
              step="1"
              default="0"
              required
              value={search.maxrating}
              onChange={(e) => dispatch(changeSearch({maxrating: e.target.value}))}
            ></input>
          </div>
        </div>
        <br></br>
          <button className="FilterButton" type="submit" onClick={() => dispatch(resetSearch())}>
            Reset Filter
          </button>
      </form>
    </div>
  );
}
