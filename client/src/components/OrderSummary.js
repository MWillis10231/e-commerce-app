import { useEffect, useState } from "react";
import { format } from 'date-fns'
import React from "react"

export default function OrderListItem(props) {

  const [singleOrder, setSingleOrder] = useState("");
  const [order, setOrder] = useState('No order')

  //loads the latest orderId of a customer
  useEffect(() => {
    const fetchOrder = async () => {
      setOrder('Loading')
      // it needs to include credentials on any request that requires passport otherwise it won't show
      // get the latest order by the customer
      const latestOrderId = await fetch(`/api/orders/${props.customerId}/`, {credentials: "include"})
      const latestOrder = await latestOrderId.json()
      setOrder(latestOrder[0])
    };
    fetchOrder();
  }, [props.customerId]);

  // loads the products associated with that order
  useEffect(() => {
    const getOrderInfo = async () => {
      if (order.order_id) {
        console.log(order)
        setSingleOrder("Loading");
        const orders = await fetch(
          `/api/orders/${props.customerId}/${order.order_id}`,
          { credentials: "include" }
        );
        const orderData = await orders.json();
        setSingleOrder(orderData); 
      }
    }
    getOrderInfo();
  }, [order, props.customerId])

  let data;
  // maps the order into a table
  if (Array.isArray(singleOrder)) {
    data = singleOrder.map(function (order, index) {
      return (
        <table>
          <tr>
            <th>Item #</th>
            <th>Name</th>
            <th>Product ID</th>
            <th>Company</th>
            <th>Quantity</th>
          </tr>
          <tr>
            <td>{index + 1}</td>
            <td>{order.product_name}</td>
            <td>{order.product_id}</td>
            <td>{order.company_name}</td>
            <td>{order.quantity}</td>
          </tr>
        </table>
      );
    });
  } else if (singleOrder === "Loading...") {
    data = "Loading...";
  } else {
    data = "No orders found";
  }

  let orderNumber
  let orderDate
  let deliveryDate
  let formattedOrderDate
  let formattedDeliveryDate

  if (order && order.order_id) {
    orderNumber = order.order_id;
    orderDate = new Date(order.date_ordered);
    deliveryDate = new Date(order.date_delivered)
    console.log(orderDate)
    formattedOrderDate = format(orderDate, 'dd/MM/yyyy')
    console.log(formattedOrderDate)
    formattedDeliveryDate = format(deliveryDate, 'dd/MM/yyyy')
  } else {
    orderNumber = "N/A";
    orderDate = "N/A";
    deliveryDate = "N/A";
    formattedOrderDate = "N/A"
    formattedDeliveryDate = "N/A"
  }

  if (!order.date_delivered) {
    formattedDeliveryDate = "N/A"
  }

  return (
    <div className="OrderSingle">
      <table className="OrderInfo">
        <tr>
            <th>Order #</th>
            <th>Date Ordered</th>
            <th>Date Delivered</th>
        </tr>
        <tr>
            <td>{orderNumber}</td>
            <td>{formattedOrderDate}</td>
            <td>{formattedDeliveryDate}</td>
        </tr>
      </table>
      <div className="OrderDetailed" id={`detailed${props.id}`}>
        {data}
      </div>
    </div>
  );
}
