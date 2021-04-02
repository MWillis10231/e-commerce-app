import { useEffect, useState } from "react";

export default function OrderListItem(props) {
  const [singleOrder, setSingleOrder] = useState("");
  const [displayDetailed, setDisplayDetailed] = useState(false)
  const [contents, setContents] = useState('Show details')

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
        `http://localhost:5000/orders/${props.customerId}/${props.data.order_id}`,
        { credentials: "include" }
      );
      const orderData = await orders.json();
      setSingleOrder(orderData);
    };
    fetchOrder();
  }, [props.customerId, props.data.order_id]);

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

  let orderNumber = props.data.order_id;
  let orderDate = props.data.date_ordered;
  let deliveryDate = props.data.date_delivered

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
            <td>{orderDate}</td>
            <td>{deliveryDate}</td>
        </tr>
      </table>
      <button className="SubmitButton" onClick={toggleDetailedInfo}>{contents}</button>
      <div className="OrderDetailed" id={`detailed${props.id}`}>
        {data}
      </div>
    </div>
  );
}
