import React, { useState } from "react"
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";

export default function ProfileEdit() {
  const user = useSelector(selectUser)
  const [firstName, setFirstName] = useState(user.firstName)
  const [lastName, setLastName] = useState(user.lastName)
  const [username, setUsername] = useState(user.username)
  const [email, setEmail] = useState(user.email)

  return (
    <div>
      <p>Edit your profile:</p>
      <form method="post">
        <div className="FormItem">
          <label htmlFor="firstName">First Name</label>
          <input type="text" id="firstName" name="firstName" autoComplete="given-name" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
        </div>
        <div className="FormItem">
          <label htmlFor="lastName">Last Name</label>
          <input type="text" id="lastName" name="lastName" autoComplete="family-name" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
        </div>
        <div className="FormItem">
          <label htmlFor="email">Email Address</label>
          <input type="email" id="email" name="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div className="FormItem">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" autoComplete="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
        </div>
        <br></br>
        <div className="FormItem">
          <label htmlFor="password"><em>Current</em> Password</label>
          <input type="password" id="password" name="password" autoComplete="current-password"/>
        </div>
        <div className="FormItem">
          <label htmlFor="rpassword">Repeat <em>current</em> Password</label>
          <input type="password" id="rpassword" name="rpassword" autoComplete="current-password"/>
        </div>
{/*         <div className="FormItem">
          <label htmlFor="newpassword"><em>New</em> Password</label>
          <input type="password" id="newpassword" name="newpassword" autoComplete="new-password"/>
        </div>
        <div className="FormItem">
          <label htmlFor="rnewpassword">Repeat <em>new</em> Password</label>
          <input type="password" id="rnewpassword" name="rnewpassword" autoComplete="new-password"/>
        </div> */}
        <div className="FormItem">
          <input
            className="SubmitButton"
            type="submit"
            value="Save profile information"
          />
        </div>
      </form>
    </div>
  );
}
