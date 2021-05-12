import { Link } from "react-router-dom"
import React from "react"
import { useDispatch, useSelector } from "react-redux";
import { setSearchTerm, selectSearch } from "../features/productSlice";

export default function SearchBar(props) {
  // get the search from the state
  const search = useSelector(selectSearch);
  const dispatch = useDispatch();

  return (
    <div className="SearchBar">
      <form className="SearchForm" >
        <input
          className="SearchInput"
          type="text"
          placeholder="Search..."
          value={search.name}
          onInput={(e) => dispatch(setSearchTerm(e.target.value))}
          required
        ></input>
        <Link to={{
          pathname: `/products/search`,
          search: `name=${search.name}`,
          }}><button className="SearchButton" type="submit">S</button></Link>
      </form>
    </div>
  );
}
