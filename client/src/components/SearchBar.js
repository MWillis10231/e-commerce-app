export default function SearchBar() {
  return (
    <div className="SearchBar">
      <form className="SearchForm">
        <input
          className="SearchInput"
          type="text"
          placeholder="Search..."
        ></input>
        <button className="SearchButton" type="submit">S</button>
      </form>
    </div>
  );
}
