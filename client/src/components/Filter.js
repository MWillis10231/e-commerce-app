import { Link, useRouteMatch, useLocation } from "react-router-dom";
import { useState } from "react";
import RatingNumbers from './RatingNumbers'

export default function SearchBar() {
  const [filterString, setFilterString] = useState('')
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
        <label for={`Filter${category}`}>{category}</label>
      </div>
    );
  });

  let location = useLocation();
  let filterCategory
  let filterPriceMin
  let filterPriceMax
  let filterRatingMin
  let filterRatingMax

async function submitFilter(event) {
    let form = document.getElementById('filter')
    let formContents = new FormData(form)
    event.preventDefault();
    filterCategory = formContents.get('category')
    filterPriceMin = formContents.get('pricemin')
    filterPriceMax = formContents.get('pricemax')
    filterRatingMin = formContents.get('minrating')
    filterRatingMax = formContents.get('maxrating')
    let newFilter = {
      category: filterCategory,
      pricemin: filterPriceMin,
      pricemax: filterPriceMax,
      minrating: filterRatingMin,
      maxrating: filterRatingMax,
    }
    setFilter(newFilter)
  } 

  function updateFilter(event) {
    let name = event.target.name
    let value = parseInt(event.target.value)
    let oldFilter = filter
    let combinedFilter = Object.assign({}, oldFilter, {[name]: value})
    setFilter(combinedFilter)
  }

  // generate a filterstring to request the right results (with a small amount of basic data checking)



  console.log(filterString)
  console.log(location)

  return (
    <div className="FilterBar">
      <h3>Filter Results</h3>
      <form className="FilterForm" onSubmit={submitFilter} id="filter" name="filter">
        <h4>Filter by Category</h4>
        {categoryFilterBoxes}
        <h4>Filter by Price</h4>
        <div>
          <div className="FilterContainer">
            <label for="PriceMin">Minimum Price</label>
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
            <label for="#PriceMax">Maximum Price</label>
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
            <label for="RatingMin">Minimum</label>
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
            <label for="RatingMax">Maximum</label>
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
            pathname: `/products/search`,
            search: `${location.search}&category=${filter.category}&pricemin=${filter.pricemin}&pricemax=${filter.pricemax}&minrating=${filter.minrating}&maxrating=${filter.maxrating}`,
          }}
        > 
          <button className="FilterButton" type="submit">
            Apply Filter
          </button>
        </Link>
      </form>
    </div>
  );
}
