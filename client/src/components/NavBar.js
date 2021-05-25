import { Link } from "react-router-dom"
import SearchBar from './SearchBar'
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectCartContentNumber } from "../features/cartSlice"
import { selectLoggedIn, selectUser, signOut } from "../features/userSlice"

export default function NavBar(props) {
    const dispatch = useDispatch();
    const loggedIn = useSelector(selectLoggedIn)
    const userName = useSelector(selectUser).username
    //console.log(loggedIn)

    let signInLogOut
    let name
    let register
    // if no username, offer login
    // otherwise say "hi username"
    if (loggedIn === false) {
        register = <div className="Nav-Option"><Link className="NavBarLink" to="/register">Register</Link></div>;
        signInLogOut = <div className="Nav-Option"><Link className="NavBarLink" to="/login">Login</Link></div>;
    } else if (loggedIn === true) {
        name = <div className="Nav-Option">Hello, <Link className="NavBarLink" to="/profile">{userName}</Link></div>
        signInLogOut = <div className="Nav-Option"><Link className="NavBarLink" to="/logout" onClick={submitLogout}>Logout</Link></div>
    }

    // number of cart items
    const cartItems = useSelector(selectCartContentNumber)

    async function submitLogoutData(data = {}) {
        const response = await fetch('/api/account/logout/', {
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
        })
        return response;
    }

    async function submitLogout(event) {
        try {
            submitLogoutData().then((response) => {
                // if the response is okay, then signout and redirect
                if (response.ok === true) {
                    dispatch(signOut())
                }
            })
            event.preventDefault();
        } catch (error) {
        alert('There was an error, please try again')
          console.log(error)
          event.preventDefault();
        }  
    }

    return(
        <nav className="NavBar">
            <div className="NavBarTitle">
                <h1><Link className="NavBarLink" to="/About">Nile.com</Link></h1>
                <figure>
                <Link to="/About"><img src="/api/images/nilelogo.webp" alt="logo"></img></Link>
                </figure>
            </div>
            <SearchBar />
            <div className="Nav-Profile">
                {register}
                {name}
                <div className="Nav-Cart"><Link className="NavBarLink" to="/cart">Cart ({cartItems})</Link></div>
                {signInLogOut}
            </div>
        </nav>
    )
}