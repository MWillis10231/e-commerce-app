import React from "react"

export default function ProfileEdit() {
  return (
    <div>
      <p>Edit your profile:</p>
      <form method="post">
        <div className="FormItem">
          <label for="firstName">First Name</label>
          <input type="text" id="firstName" name="firstName" />
        </div>
        <div className="FormItem">
          <label for="lastName">Last Name</label>
          <input type="text" id="lastName" name="lastName" />
        </div>
        <div className="FormItem">
          <label for="email">Email Address</label>
          <input type="email" id="email" name="email" />
        </div>
        <div className="FormItem">
          <label for="username">Username</label>
          <input type="text" id="username" name="username" />
        </div>
        <div className="FormItem">
          <label for="password">Password</label>
          <input type="password" id="password" name="password" />
        </div>
        <div className="FormItem">
          <label for="rpassword">Repeat Password</label>
          <input type="password" id="rpassword" name="rpassword" />
        </div>
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
