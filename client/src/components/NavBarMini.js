import { Link } from "react-router-dom"

export default function NavBarMini() {
  
    return (
      <nav className="NavBarMini"> 
        <ul className="NavBarMiniItems">
          <li><a href="/products/" className="NavBarLink">All</a></li>
          <li><a href="/products/category/1" className="NavBarLink">Books</a></li>
          <li><a href="/products/category/2" className="NavBarLink">Audio/Visual</a></li>
          <li><a href="/products/category/3" className="NavBarLink">Electronics</a></li>
          <li><a href="/products/category/4" className="NavBarLink">Home &#38; Garden</a></li>
          <li><a href="/products/category/5" className="NavBarLink">Toys</a></li>
          <li><a href="/products/category/6" className="NavBarLink">Clothes</a></li>
          <li><a href="/products/category/7" className="NavBarLink">Sports &#38; Outdoors</a></li>
          <li><a href="/products/category/8" className="NavBarLink">Health &#38; Beauty</a></li>
        </ul>
      </nav>
    );
}