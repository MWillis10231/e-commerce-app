import { Link } from "react-router-dom"

export default function About() {
    return(
        <div className="Content">
            <header><h3>About</h3></header>
            <p>This is a PERN (full-stack) web application developed as part of the Full-Stack Engineer Course on Codecademy by Matthew Willis.</p>
            <p>Nile is an online marketplace that takes inspiration from real-world online stores.</p>
            <p>If you find any issues or you'd like to give feedback, please submit them on <a href="">GitHub</a></p>
            <p>If you want to learn more about the technologies behidn the stack:</p>
            <a href="https://www.postgresql.org/" target="_blank" rel="noreferrer">
                <strong>P</strong>ostgreSQL
            </a>
            <a href="https://www.expressjs.com/" target="_blank" rel="noreferrer">
                <strong>E</strong>xpress
                </a>
            <a href="https://reactjs.org/" target="_blank" rel="noreferrer"><strong>R</strong>eact</a>
            <a href="https://nodejs.org/" target="_blank" rel="noreferrer"><strong>N</strong>ode.js</a>
            <p><Link to="/">Return home</Link></p>
        </div>
    )
}