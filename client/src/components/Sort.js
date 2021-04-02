import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function SortBar(props) {
  const sortCategories = ["price", "pricedesc", "score", "scoredesc"]
  const [sort, setSort] = useState('')
  let location = useLocation();

  let sortFilterBoxes = sortCategories.map(function (sortCategory, index) {
    let sortCategoryNames = ["Price: Ascending", "Price: Descending", "Score: Ascending", "Score: Descending"]
    return (
      <div className="SortCategoryItem">
        <input
          className="SortInput"
          id={`Sort${sortCategory}`}
          name="sortoption"
          type="radio"
          value={sortCategory}
          onMouseEnter={callUpdateSearch}
          onChange={callUpdateSearch}
        ></input>
        <label for={`Sort${sortCategory}`} className="SortLabel">{sortCategoryNames[index]}</label>
      </div>
    );
  });

  function callUpdateSearch(event) {
    setSort({sort: event.target.value})
  }

  function sendUpdateSearch() {
    props.updateSearch(sort)
  }

  return (
    <div className="SortBar">
      <form name="sort" id="sort">
        <div className="SortRadio">
        {sortFilterBoxes}
        </div>
        <Link
          to={{
            pathname: `${location.pathname}`,
            search: props.search,
          }}
        >
        <button className="FilterButton" type="submit" onClick={sendUpdateSearch}>
            Apply Filter
          </button>
        </Link>
      </form>
    </div>
  );
}
