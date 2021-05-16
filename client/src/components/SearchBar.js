import { Link } from "react-router-dom"
import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { setSearchTerm, selectSearch } from "../features/productSlice";

export default function SearchBar(props) {
  // get the search from the state
  const search = useSelector(selectSearch);
  const dispatch = useDispatch();

  const [searchTermValue, setSearchTermValue] = useState('')

  function changeSearch(event) {
    setSearchTermValue(event.target.value)
    dispatch(setSearchTerm(event.target.value))
  }

  return (
    <div className="SearchBar">
      <form className="SearchForm" >
        <input
          className="SearchInput"
          type="text"
          placeholder="Search..."
          value={searchTermValue}
          onInput={(event) => changeSearch(event)}
          required
        ></input>
        <Link to={{
          pathname: `/products/search`,
          search: `name=${search.name}`,
          }}><button className="SearchButton" type="submit"><img src={`/api/images/search.svg`} alt="search"></img></button></Link>
      </form>
    </div>
  );
}
