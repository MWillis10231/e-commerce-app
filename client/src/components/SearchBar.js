import { Link } from "react-router-dom"

export default function SearchBar(props) {
  return (
    <div className="SearchBar">
      <form className="SearchForm">
        <input
          className="SearchInput"
          type="text"
          placeholder="Search..."
          value={props.search}
          onInput={props.findSearch}
          required
        ></input>
        <Link to={{
          pathname: `/products/search`,
          search: `name=${props.search}`,
          }}><button className="SearchButton" type="submit">S</button></Link>
      </form>
    </div>
  );
}
