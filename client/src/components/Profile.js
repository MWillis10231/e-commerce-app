import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, Switch, Route, useRouteMatch } from "react-router-dom";
import { selectLoggedIn, selectUser } from "../features/userSlice";
import Orders from "./Orders";
import ProfileData from "./ProfileData";
import ProfileEdit from "./ProfileEdit";

export default function Profile(props) {
  const [customerOrders, setCustomerOrders] = useState('')
  let match = useRouteMatch();
  const user = useSelector(selectUser)
  const loggedIn = useSelector(selectLoggedIn)

  useEffect(() => {
    const fetchOrders = async () => {
      setCustomerOrders('Loading')
      // it needs to include credentials on any request that requires passport otherwise it won't show
      const orders = await fetch(`/api/orders/${user.id}`, {credentials: 'include'})
      const orderData = await orders.json();
      setCustomerOrders(orderData);
      }
    if (loggedIn === true) {
    fetchOrders();
    }
  }, [user.id, loggedIn]);

  let data

  if (loggedIn === false) {
    data = (<React.Fragment>
        <header>
        <h2>Profile</h2>
        </header>
        <p>You're not logged in! So there's no profile data to show.</p>
        <p><Link to="/login">Login here</Link></p>
    </React.Fragment>)
  } else if (loggedIn === true) {
    data = (
      <React.Fragment>
        <header>
        <h3>Profile</h3>
        </header>
        <p>Here is all the information about your profile, including orders and the ability to edit your information.</p>
        <Switch>
          <Route path={`${match.path}/`} exact>
          <ProfileData />
          <Link to={`${match.path}/edit`}><button className="SubmitButton">Edit profile</button></Link>
          <Orders customerOrders={customerOrders}/>
          </Route>
          <Route path={`${match.path}/edit`} exact>
          <Link to={`${match.path}/`}>Go back</Link>
          <h3>Edit Profile</h3>
          <ProfileEdit />
          </Route>
        </Switch>
      </React.Fragment>
    )
  }

  return (
    <div className="Content">
      {data}
    </div>
  );
}
