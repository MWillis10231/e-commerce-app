import { Link } from "react-router-dom";

export default function Home() {
    return(
        <div className="Content">
            <header><h3>Home</h3></header>
            <p>Nile is an online marketplace, filled with all kinds of products. 
                <br></br>
                As it's populated with sample data, some of these products might not have the most clear descriptions or titles.
                <br></br>
                Please bear with it! :)
                </p>
            <p>Learn more about Nile <Link to="/about">here</Link>.</p>
            <p>Otherwise, click around and explore what's on offer!</p>
        </div>
    )
}
