import { useState } from "react";
import { Link } from "react-router-dom";
import React from "react";
import { useDispatch } from "react-redux";
import { signIn } from "../features/userSlice";

export default function Login(props) {
  const dispatch = useDispatch();
  const [submitDisabled, setSubmitDisabled] = useState(true)

  function checkDisabled() {
    if (!document.getElementById("username").value || !document.getElementById("password").value) {
      setSubmitDisabled(true);
  } else {
    setSubmitDisabled(false)
  }
}

  async function submitData(data = {}) {
    const response = await fetch("/api/account/login/", {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(data),
    });
    return response;
  }

  async function submitLogin(event) {
    // preventDefault stops the onsubmit default getReq, which would GET (incl. putting data in url)
    try {
      let form = document.getElementById("login");
      let formData = new FormData(form);
      submitData(formData).then((response) => {
        if (response.ok === true) {
          response.json().then((response) => dispatch(signIn(response)));
        }
      });
      event.preventDefault();
    } catch (error) {
      console.log(error);
      event.preventDefault();
    }
  }

  return (
    <div className="Content">
      <div className="FormContainer">
        <header>
          <h3>Login</h3>
        </header>
        <p>Log in to your Nile account.</p>
        <form onSubmit={submitLogin} id="login">
          <div className="FormItem">
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" required onChange={checkDisabled} autoComplete="username"/>
          </div>
          <div className="FormItem">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" required onChange={checkDisabled} autoComplete="current-password"/>
          </div>
          <div className="FormItem">
            <input
              className="SubmitButton"
              id="LoginButton"
              type="submit"
              value="Log In"
              disabled={submitDisabled}
            />
          </div>
        </form>
        <p>
          No account? Register <Link to="/register">here</Link>
        </p>
      </div>
    </div>
  );
}
