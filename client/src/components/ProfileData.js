import React from "react"
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";

export default function ProfileData(props) {
  const user = useSelector(selectUser)

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
          <td>{user.username}</td>
          <td>{user.firstName}</td>
          <td>{user.lastName}</td>
          <td>{user.email}</td>
        </tr>
      </table>
    </div>
  );
}
