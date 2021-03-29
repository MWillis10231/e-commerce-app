import { Link } from "react-router-dom"

export default function NavBarMini(props) {
  
    return (
      <nav className="NavBarMini"> 
        <ul className="NavBarMiniItems">
          <li><Link to="/products/" className="NavBarLink" onClick={props.navigationCounter}>All</Link></li>
          <li><Link to="/products/category/1" className="NavBarLink" onClick={props.updateCustomerData}>Books</Link></li>
          <li><Link to="/products/category/2" className="NavBarLink" onClick={props.updateCustomerData}>Audio/Visual</Link></li>
          <li><Link to="/products/category/3" className="NavBarLink" onClick={props.updateCustomerData}>Electronics</Link></li>
          <li><Link to="/products/category/4" className="NavBarLink">Home &#38; Garden</Link></li>
          <li><Link to="/products/category/5" className="NavBarLink">Toys</Link></li>
          <li><Link to="/products/category/6" className="NavBarLink">Clothes</Link></li>
          <li><Link to="/products/category/7" className="NavBarLink">Sports &#38; Outdoors</Link></li>
          <li><Link to="/products/category/8" className="NavBarLink">Health &#38; Beauty</Link></li>
        </ul>
      </nav>
    );
}