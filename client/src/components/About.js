import { Link } from "react-router-dom"

export default function About() {
    return(
        <div className="Content">
            <header>About</header>
            <p>This is a React app</p>
            <p><Link to="/">Return home</Link></p>
        </div>
    )
}