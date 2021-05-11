import { Link } from "react-router-dom";
import React from "react"

export default function Logout() {

    return(
        <div className="Content">
            <header><h3>Logout</h3></header>
            <p>You've successfully logged out!</p>
            <p>Log-in again <Link to="/login">here</Link></p>
        </div>
    )
}