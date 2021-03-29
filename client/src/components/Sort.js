import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function SortBar() {
  let location = useLocation();

  const [sort, setSort] = useState();

  async function submitSort(event) {
    let form = document.getElementById('sort')
    let formContents = new FormData(form)
    event.preventDefault();
    let sortOption = formContents.get('sortoption')
    setSort(sortOption)
  } 

  const sortCategories = ["price", "pricedesc", "score", "scoredesc"]

  let sortFilterBoxes = sortCategories.map(function (sortCategory, index) {
    let sortCategoryNames = ["Price: Ascending", "Price: Descending", "Score: Ascending", "Score: Descending"]
    return (
      <div className="FilterCategoryItem">
        <input
          className="SortInput"
          id={`Sort${sortCategory}`}
          name="sortoption"
          type="radio"
          value={sortCategory}
          onChange
        ></input>
        <label for={`Sort${sortCategory}`}>{sortCategoryNames[index]}</label>
      </div>
    );
  });


  return (
    <div className="SortBar">
      <h4>Sort Results</h4>
      <form name="sort" id="sort" onSubmit={submitSort}>
        {sortFilterBoxes}
        <Link
          to={{
            pathname: `/products/search`,
            //search: 
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
