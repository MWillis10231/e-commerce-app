import React from "react";

export default function ProductsListPageBar(props) {
  let content;
  if (props.pages) {
    let newArray = [];
    for (let i = 0; i < props.pages; i++) {
      newArray.push(i);
    }
    content = newArray.map(function (product, index) {
      return <li key={index}>{index + 1}</li>;
    });
  }

  return (
    <div className="ProductsListPageSelector">
      <h4>Page</h4>
      <div className="ProductsListPageSelectorContainer">
        <ul>{content}</ul>
        <div className="ProductsListPageItemsControl">
          <label>Items per page</label>
          <input type="text" size="1"></input>
        </div>
      </div>
    </div>
  );
}
