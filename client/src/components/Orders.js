import React from "react";
import OrderListItem from "./OrderListItem";

export default function Orders(props) {
let data

if (Array.isArray(props.customerOrders)) {
    data = props.customerOrders.map(function (order, index) {
      return (
        <OrderListItem
          data={props.customerOrders[index]}
          key={index}
          id={`order${index}`}
          number={index + 1}
        />
      );
    });
  } else if (props.customerOrders === "Loading...") {
    data = "Loading..."
  } else {
    data = "No orders found";
  }

  return (
      <React.Fragment>
        <h4>Orders</h4>
        <div className="OrderList">
            {data}
        </div>
      </React.Fragment>
  )
}