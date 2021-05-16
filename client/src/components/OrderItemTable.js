import React from "react";
import { Link } from "react-router-dom"

export default function OrderItemTable(props) {
  // expects an order array as props
  let data;

  if (props.singleOrder && Array.isArray(props.singleOrder)) {
    data = props.singleOrder.map(function (order, index) {
      return (
        
          <tr>
            <td>
                <figure>
                    <img src={`/api/images/${order.product_image}`} alt={order.product_name}></img>
                </figure>
            </td>
            <td>{order.product_id}</td>
            <td><Link to={`/products/${order.product_id}`}>{order.product_name}</Link></td>
            <td>{order.company_name}</td>
            <td>{order.quantity}</td>
          </tr>
      );
    });
  }

  return (
    <table>
      <thead>
        <tr>
          <th></th>
          <th>Product ID</th>
          <th>Name</th>
          <th>Company</th>
          <th>Quantity</th>
        </tr>
      </thead>
      <tbody>
      {data}
      </tbody>
    </table>
  );
}
