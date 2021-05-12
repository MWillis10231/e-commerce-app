import { Link } from "react-router-dom"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { resetSearch, selectSearch } from "../features/productSlice";

export default function NavBarMini(props) {
    const dispatch = useDispatch();
    const search = useSelector(selectSearch);
    const category = search.category
    const [active, setActive] = useState(null)
    
    useEffect(() => {
      setActive(document.getElementById(`NavbarMini${category}`))
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

    if (active) {
      productCategories.forEach(function (element, index) {
        document.getElementById(`NavbarMini${index}`).style.backgroundColor = "#ed2839"
      }); 
      active.style.backgroundColor = "#d01121"
    }

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