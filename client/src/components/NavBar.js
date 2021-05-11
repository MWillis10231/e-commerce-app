import { Link } from "react-router-dom"
import SearchBar from './SearchBar'
import React from "react"

export default function NavBar(props) {
    let signInLogOut
    let name
    let register
    // if no username, offer login
    // otherwise say "hi username"
    if (props.loggedIn === false) {
        register = <div className="Nav-Option"><Link className="NavBarLink" to="/register">Register</Link></div>;
        signInLogOut = <div className="Nav-Option"><Link className="NavBarLink" to="/login">Login</Link></div>;
    } else if (props.loggedIn === true) {
        name = <div className="Nav-Option">Hello, <Link className="NavBarLink" to="/profile">{props.username}</Link></div>
        signInLogOut = <div className="Nav-Option"><Link className="NavBarLink" to="/logout" onClick={submitLogout}>Logout</Link></div>
    }

    async function submitLogout(event) {
        try {
            const response = await fetch('/api/account/logout/', {
                method: 'GET',
                mode: 'cors',
                credentials: 'include',
                headers: {'Content-Type': 'application/json'},
            })
            // if the response is okay, then signout and redirect
            if (response.ok === true) {
                props.signOut();
                return
            }
            // if not, stop redirect and flash an error
            alert('There was an error, please try again')
            event.preventDefault();
        } catch (error) {
          console.log(error)
          event.preventDefault();
        }  
    }

    return(
        <nav className="NavBar">
            <h1><Link className="NavBarLink" to="/About">Nile.com</Link></h1>
            <SearchBar findSearch={props.findSearch} search={props.search}/>
            <div className="Nav-Profile">
                {register}
                {name}
                <div className="Nav-Cart"><Link className="NavBarLink" to="/cart">View your cart ({props.cartnumber})</Link></div>
                {signInLogOut}
            </div>
        </nav>
    )
}