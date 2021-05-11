import { Link } from "react-router-dom";
import React from "react"

export default function Home() {
    return(
        <div className="Content">
            <header><h3>Home</h3></header>
            <p>Nile is an online marketplace, filled with all kinds of products. 
                </p>
            <p>Learn more about Nile <Link to="/about">here</Link>.</p>
            <p>Otherwise, click around and explore what's on offer!</p>
        </div>
    )
}
