import { useEffect, useState } from "react";
import { format } from 'date-fns'
import React from "react"
import { selectUser } from "../features/userSlice";
import { useSelector } from "react-redux";
import OrderItemTable from "./OrderItemTable";

export default function OrderListItem(props) {
  const [singleOrder, setSingleOrder] = useState("");
  const [displayDetailed, setDisplayDetailed] = useState(false)
  const [contents, setContents] = useState('Show details')
  const user = useSelector(selectUser)

  useEffect(() => {
    function toggleInfo(){
        if (displayDetailed === false) {
            document.getElementById(`detailed${props.id}`).style.display = "none"
            setContents('Show details');
        } else if (displayDetailed === true) {
            document.getElementById(`detailed${props.id}`).style.display = "block"
            setContents('Hide Details');
        }
    }
    toggleInfo();
  }, [displayDetailed, props.id])

  useEffect(() => {
    const fetchOrder = async () => {
      setSingleOrder("Loading");
      // it needs to include credentials on any request that requires passport otherwise it won't show
      const orders = await fetch(
        `/api/orders/${user.id}/${props.data.order_id}`,
        { credentials: "include" }
      );
      const orderData = await orders.json();
      setSingleOrder(orderData);
    };
    fetchOrder();
  }, [user.id, props.data.order_id]);

  let data;

  // maps the order into a table
  if (Array.isArray(singleOrder)) {
    data = <OrderItemTable singleOrder={singleOrder}/>;
  } else if (singleOrder === "Loading...") {
    data = "Loading...";
  } else {
    data = "No orders found";
  }

  let orderNumber = props.data.order_id;
  let orderDate = props.data.date_ordered;
  let deliveryDate = props.data.date_delivered
  console.log(orderDate)
  let formattedOrderDate = format(new Date(orderDate), 'dd/MM/yyyy-HH:mm')
  let formattedDeliveryDate = format(new Date(deliveryDate), 'dd/MM/yyyy-HH-mm')

  if (!props.data.date_delivered) {
    formattedDeliveryDate = "N/A"
  }

  function toggleDetailedInfo() {
    if (displayDetailed === true) {
        setDisplayDetailed(false)
    } else if (displayDetailed === false) {
        setDisplayDetailed(true)
    }
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
      <button className="SubmitButton" onClick={toggleDetailedInfo}>{contents}</button>
      <div className="OrderDetailed" id={`detailed${props.id}`}>
        {data}
      </div>
    </div>
  );
}
