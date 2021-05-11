import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Login(props) {
    const [counter, setCounter] = useState(0)

    useEffect(() => {
      if (!document.getElementById('username').value || !document.getElementById('password').value) {
        document.getElementById("LoginButton").disabled = true;
      } else {
        document.getElementById("LoginButton").disabled = false;
      }
    })
  
    function updateForm() {
      // atm this just makes the DOM update // checks if all the fields are filled out after every field is altered
      setCounter(counter + 1)
    }

    async function submitData(data = {}) {
        const response = await fetch('/api/account/login/', {
          method: 'POST',
          mode: 'cors',
          credentials: 'include',
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          body: new URLSearchParams(data),
        });
        return response;
      }

      async function submitLogin(event) {
        // preventDefault stops the onsubmit default getReq, which would GET (incl. putting data in url)
        // should put more data checking here?
        try {
            let form = document.getElementById('login');
            let formData = new FormData(form)
            submitData(formData).then(response => response.json().then(response => (props.updateCustomerData(response))));
            props.signIn();
            event.preventDefault();
        } catch (error) {
          console.log(error)
          event.preventDefault();
        }  
      } 

    return(
        <div className="Content">
            <div className="FormContainer">
                <header><h3>Login</h3></header>
                <p>Log in to your Nile account.</p>
                <form onSubmit={submitLogin} id="login">
                    <div className="FormItem">
                        <label htmlFor="username">Username:</label>
                        <input type="text" id="username" name="username" onInput={updateForm} required/>
                    </div>
                    <div className="FormItem">
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" onInput={updateForm} required/>
                    </div>
                    <div className="FormItem">
                      <input className="SubmitButton" id="LoginButton" type="submit" value="Log In"/>
                    </div>
                </form>
                <p>No account? Register <Link to="/register">here</Link></p>
            </div>
        </div>
    )
}