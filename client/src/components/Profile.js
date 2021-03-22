import React from "react";
import { Link } from "react-router-dom";
import ProfileEdit from "./ProfileEdit";

export default function Profile(props) {

  let data

  if (props.loggedIn === false) {
    data = (<React.Fragment>
              <header>
        <h3>Profile</h3>
        </header>
        <p>You're not logged in! So there's no profile data to show.</p>
        <p><Link to="/login">Login here</Link></p>
    </React.Fragment>)
  } else if (props.loggedIn === true) {
    data = (
      <React.Fragment>
        <header>
        <h3>Profile</h3>
        </header>
        <p>Here is all the information about your profile</p>
        <p>Profile information here</p>
        <p>ORDERS!</p>
        <p>Edit your profile (probably its own route here)</p>
        <ProfileEdit />
      </React.Fragment>
    )
  }

  return (
    <div className="Content">
      {data}
    </div>
  );
}
