import { Link } from "react-router-dom"
import { useState } from "react";

export default function SearchBar() {
  const [search, setSearch] = useState();

  function searchTerm(event) {
    setSearch(event.target.value);
  }

  return (
    <div className="SearchBar">
      <form className="SearchForm" >
        <input
          className="SearchInput"
          type="text"
          placeholder="Search..."
          value={search}
          onInput={searchTerm}
          required
        ></input>
        <Link to={{
          pathname: `/products/search`,
          search: `name=${search}`
          }}><button className="SearchButton" type="submit">S</button></Link>
      </form>
    </div>
  );
}
