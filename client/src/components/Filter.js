import { Link, useLocation } from "react-router-dom";
import { Fragment, useState } from "react";
import RatingNumbers from "./RatingNumbers";
import React from "react"

export default function FilterBar(props) {
  const [filter, setFilter] = useState({
    category: 0,
    pricemin: 0,
    pricemax: 100,
    minrating: 0,
    maxrating: 5,
  });

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
          onChange={updateFilter}
        ></input>
        <label htmlFor={`Filter${category}`}>{category}</label>
      </div>
    );
  });

  let location = useLocation();

  //updates the filter object
  function updateFilter(event) {
    let name = event.target.name;
    let value = parseInt(event.target.value);
    const newFilter = Object.assign({}, filter, {[name]: value})
    setFilter(newFilter)
    }

    function sendFilter() {
      props.updateSearch(filter)
    }

  let categoryFilter
  //if (props.category === undefined) {
    categoryFilter = (<Fragment>        <h4>Filter by Category</h4>
      {categoryFilterBoxes}</Fragment>)
  //} else {
  //  categoryFilter = ''
  //}

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
              value={filter.pricemin}
              onChange={updateFilter}
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
              value={filter.pricemax}
              onChange={updateFilter}
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
              max="5"
              min="0"
              step="1"
              default="0"
              required
              value={filter.minrating}
              onChange={updateFilter}
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
              max="5"
              min="0"
              step="1"
              default="0"
              required
              value={filter.maxrating}
              onChange={updateFilter}
            ></input>
          </div>
        </div>
        <br></br>
        <Link
          to={{
            pathname: `${location.pathname}`,
            search: props.search,
          }}
        >
          <button className="FilterButton" type="submit" onClick={sendFilter}>
            Apply Filter
          </button>
        </Link>
      </form>
    </div>
  );
}
