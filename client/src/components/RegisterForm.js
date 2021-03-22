import { useEffect, useState } from "react";

export default function RegisterForm(props) {
  const [counter, setCounter] = useState(0)

  useEffect(() => {
    if (!document.getElementById('firstName').value || !document.getElementById('lastName').value || !document.getElementById('email').value || !document.getElementById('username').value || !document.getElementById('password').value === 0 || !document.getElementById('rpassword').value) {
      document.getElementById("RegisterButton").disabled = true;
    } else {
      document.getElementById("RegisterButton").disabled = false;
    }
  })

  function updateForm() {
    // atm this just makes the DOM update // checks if all the fields are filled out after every field is altered
    setCounter(counter + 1)
  }

  async function submitData(data = {}) {
    const response = await fetch('http://localhost:5000/customers/register/', {
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

  async function submitRegistration(event) {
    // preventDefault stops the onsubmit default getReq, which would GET (incl. putting data in url)
    try {
      // check if the passwords match
      if (document.getElementById('password').value === document.getElementById('rpassword').value) {
      } else {
        throw Error('Please make sure the passwords match')
      }
      // make sure there's something entered in each field (shouldn't matter but just in case)
      if (!document.getElementById('firstName').value || !document.getElementById('lastName').value || !document.getElementById('email').value || !document.getElementById('username').value || !document.getElementById('password').value || !document.getElementById('rpassword').value) {
      } else {
        throw Error('Please fill out every field')
      }

      // should put more data checking here
      let form = document.getElementById('signup');
      let formData = new FormData(form)
      submitData(formData).then(response => console.log(response));
      event.preventDefault();
      // not sure if this is the right thing to do next (seems to stop password being shown in URL tho)
      //window.location.replace("http://localhost:3000/");
    } catch (error) {
      alert(error)
      console.log(error)
      event.preventDefault();
    }  
  } 

  return (
    <form onSubmit={submitRegistration} id="signup" name="signup">
            <div className="FormItem">
                <label htmlFor="firstName">First Name</label>
                <input type="text" id="firstName" name="firstName" onInput={updateForm}/>
            </div>
            <div className="FormItem">
                <label htmlFor="lastName">Last Name</label>
                <input type="text" id="lastName" name="lastName" onInput={updateForm}/>
            </div>
            <div className="FormItem">
                <label htmlFor="email">Email Address</label>
                <input type="email" id="email" name="email" onInput={updateForm}/>
            </div>
            <div className="FormItem">
                <label htmlFor="username">Username</label>
                <input type="text" id="username" name="username" onInput={updateForm}/>
            </div>
            <div className="FormItem">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" onInput={updateForm}/>
            </div>
            <div className="FormItem">
                <label htmlFor="rpassword">Repeat Password</label>
                <input type="password" id="rpassword" name="rpassword" onInput={updateForm}/>
            </div>
            <div className="FormItem">
                <input className="SubmitButton" id="RegisterButton" type="submit" value="Sign-up"/>
            </div>
        </form>
  );
}
