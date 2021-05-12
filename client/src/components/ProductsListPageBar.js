import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectItemsPerPage, setItemsPerPage } from "../features/productSlice";

export default function ProductsListPageBar(props) {
    const dispatch = useDispatch();
    
    function sendNewItemsPerPage(event) {
        dispatch(setItemsPerPage(event.target.value))
        props.updatePage(0);
    }

    // get the itemsPerPage from the state
    const itemsPerPage = useSelector(selectItemsPerPage)
    // use this array options to map them out
    const itemPerPageArray = [25, 50, 100];
    let itemsPerPageOptions = itemPerPageArray.map(function (item, index) {
        if (item === itemsPerPage) {
            return (<li key={index} value={item}><strong>{item}</strong></li>)
        } else {
            return <li key={index} value={item} onClick={sendNewItemsPerPage}>{item}</li>
        }
      });

  let content;
  if (props.pages) {
    let newArray = [];
    for (let i = 0; i < props.pages; i++) {
      newArray.push(i);
    }
    content = newArray.map(function (item, index) {
        if (index === props.currentPage) {
            return <li key={index}><strong>{index + 1}</strong></li>;
        } else {
            return <li key={index} onClick={(e) => props.updatePage(e.target.value)} value={index}>{index + 1}</li>;
        }
    });
  }

  return (
    <div className="ProductsListPageSelector">
      <div className="ProductsListPageSelectorContainer">
        <p>Page</p>
        <ul>{content}</ul>
      </div>
      <div className="ProductsListPageItemsControl">
        <p>Items per page:</p>
        <ul>
            {itemsPerPageOptions}
        </ul>
      </div>
    </div>
  );
}
