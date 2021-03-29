import { Link } from "react-router-dom"

export default function About() {
    return(
        <div className="Content">
            <header>About</header>
            <p>This is a React app</p>
            <p>
                Things to implement:
                <ul>
                    <li>Logo</li>
                    <li>Sort by on ALL pages (categories etc.)</li>
                    <li>Filters on ALL pages (categories etc.)</li>
                    <li>Pages of results</li>
                </ul>
                Issues:
                <ul>
                    <li>If you search for multiple filters in a row, it really messes up the URL and thus results.
                        The address bar needs to be cleared between searches, not sure how.
                    </li>
                    <li>Ideally you should be able to filter by multiple categories and companies, but you can't at the moment.</li>
                </ul>
            </p>
            <p><Link to="/">Return home</Link></p>
        </div>
    )
}