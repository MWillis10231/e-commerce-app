import React from "react"
import { useDispatch } from "react-redux";
import { changeSearch } from "../features/productSlice";

export default function SortBar(props) {
  const sortCategories = ["price", "pricedesc", "score", "scoredesc"]
  const dispatch = useDispatch();

  let sortFilterBoxes = sortCategories.map(function (sortCategory, index) {
    let sortCategoryNames = ["Price: Ascending", "Price: Descending", "Score: Ascending", "Score: Descending"]
    if (index === 0 || index === 2) {
      return (
        <div className="SortCategoryItem">
          <input
            className="SortInput"
            id={`Sort${sortCategory}`}
            name="sortoption"
            type="radio"
            value={sortCategory}
            onChange={(e) => dispatch(changeSearch({sort: e.target.value,
            sortDesc: null}))}
          ></input>
          <label htmlFor={`Sort${sortCategory}`} className="SortLabel">{sortCategoryNames[index]}</label>
        </div>
        );
    } else {
      return (
        <div className="SortCategoryItem">
          <input
            className="SortInput"
            id={`Sort${sortCategory}`}
            name="sortoption"
            type="radio"
            value={sortCategory}
            onChange={(e) => dispatch(changeSearch({sort: null, sortDesc: e.target.value}))}
          ></input>
          <label htmlFor={`Sort${sortCategory}`} className="SortLabel">{sortCategoryNames[index]}</label>
        </div>  
      );
    }
  });

  return (
    <div className="SortBar">
      <form name="sort" id="sort">
        <div className="SortRadio">
        {sortFilterBoxes}
        </div>
      </form>
    </div>
  );
}
