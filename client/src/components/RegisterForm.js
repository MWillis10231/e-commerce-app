import { useState } from "react";
import React from "react"
import { useDispatch } from "react-redux";
import { signIn } from "../features/userSlice";
import { useHistory } from "react-router";

export default function RegisterForm(props) {
  const dispatch = useDispatch();
  const [submitDisabled, setSubmitDisabled] = useState(true)
  const history = useHistory();

  function checkDisabled() {
    if (!document.getElementById("username").value || !document.getElementById("password").value) {
      setSubmitDisabled(true);
  } else {
    setSubmitDisabled(false)
  }
}

  async function submitData(data = {}) {
    const response = await fetch('/api/customers/register/', {
      method: 'POST',
      mode: 'cors',
      credentials: 'same-origin',
      headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'},
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: new URLSearchParams(data),
    });
    return response;
  }

  async function submitLogin(data = {}) {
    const response = await fetch("/api/account/login/", {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(data),
    });
    return response;
  }

  async function submitRegistration(event) {
    // preventDefault stops the onsubmit default getReq, which would GET (incl. putting data in url)
    try {
      // check if the passwords match
      if (document.getElementById('password').value === document.getElementById('rpassword').value) {
      } else {
        throw Error('Please make sure the passwords match')
      }
      // should put more data checking here
      let form = document.getElementById('signup');
      let formData = new FormData(form)
      submitData(formData).then(response => {
        //console.log(response)
        if (response.ok) {
          // log in as well
          submitLogin({username: document.getElementById('username').value, password: document.getElementById('password').value}).then(response => {
            if (response.ok === true) {
              response.json().then((response) => {
                //dispatch to Redux
                dispatch(signIn(response));
                // redirect
                history.push('/');
              });
            }
          })
        }
      });
      event.preventDefault();
    } catch (error) {
      alert(Error)
      console.log(error)
      event.preventDefault();
    }  
  } 

  return (
    <form onSubmit={submitRegistration} id="signup" name="signup">
            <div className="FormItem">
                <label htmlFor="firstName">First Name</label>
                <input type="text" id="firstName" name="firstName" autoComplete="given-name" onInput={checkDisabled} required/>
            </div>
            <div className="FormItem">
                <label htmlFor="lastName">Last Name</label>
                <input type="text" id="lastName" name="lastName" autoComplete="family-name" onInput={checkDisabled} required/>
            </div>
            <div className="FormItem">
                <label htmlFor="email">Email Address</label>
                <input type="email" id="email" name="email" autoComplete="email" onInput={checkDisabled} required/>
            </div>
            <div className="FormItem">
                <label htmlFor="username">Username</label>
                <input type="text" id="username" name="username" autoComplete="username" onInput={checkDisabled} required/>
            </div>
            <div className="FormItem">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" autoComplete="new-password" onInput={checkDisabled} required/>
            </div>
            <div className="FormItem">
                <label htmlFor="rpassword">Repeat Password</label>
                <input type="password" id="rpassword" name="rpassword" autoComplete="new-password" onInput={checkDisabled} required/>
            </div>
            <div className="FormItem">
                <input className="SubmitButton" id="RegisterButton" type="submit" value="Sign-up" disabled={submitDisabled}/>
            </div>
        </form>
  );
}
