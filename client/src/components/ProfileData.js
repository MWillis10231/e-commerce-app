import React from "react"

export default function ProfileData(props) {
  return (
    <div>
      <h4>Profile Data</h4>
      <table className="ProfileData">
        <tr>
          <th>Username</th>
          <th>First name</th>
          <th>Last name</th>
          <th>Email</th>
        </tr>
        <tr>
          <td>{props.customerData.username}</td>
          <td>{props.customerData.firstName}</td>
          <td>{props.customerData.lastName}</td>
          <td>{props.customerData.email}</td>
        </tr>
      </table>
    </div>
  );
}
