import { Link, useLocation } from "react-router-dom"
import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { resetSearch } from "../features/productSlice";

export default function NavBarMini(props) {
    const dispatch = useDispatch();
    // bit of a hacky way to get the category only if we are on certain parts of the app
    let location = useLocation();
    let category = location.pathname.slice(19)
    //console.log(typeof category)
    const [active, setActive] = useState(null)
    
    useEffect(() => {
      setActive(document.getElementById(`NavbarMini${category}`))
      if (category === "") {
        setActive(null)
      }
    }, [category])

    const productCategories = [
      "All products",
      "Books",
      "Audio/Visual",
      "Electronics",
      "Home & Garden",
      "Toys",
      "Clothes",
      "Sports & Outdoors",
      "Health & Beauty",
    ];

    // was a way of highlighting categoriers when you're "in" them, but implementation isn't good. if re-introduce, use Redux
/*     if (active) {
      productCategories.forEach(function (element, index) {
        document.getElementById(`NavbarMini${index}`).style.backgroundColor = "#ed2839"
      }); 
      active.style.backgroundColor = "#d01121"
    } */

    const links = productCategories.map(function (value, index) {
        return (
          <li id={`NavbarMini${index}`} key={`NavbarMini${index}`}><Link to={`/products/category/${index}`} className="NavBarLink" onClick={() => dispatch(resetSearch())}>{value}</Link></li>
        )
    })

    return (
      <nav className="NavBarMini"> 
        <ul className="NavBarMiniItems">
          {links}
        </ul>
      </nav>
    );
}