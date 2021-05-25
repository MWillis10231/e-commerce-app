import React, { useEffect, useState } from 'react';
import ProductsListItem from './ProductsListItem';

export default function ProductListContainer(props) {
    let content
    // expect props.products
    if (props.products) {
        content = props.products.map(function (product, index) {
            return (
              <ProductsListItem
                data={product}
                key={index}
                number={index + 1}
              />
            );
          });
    } else {
        content = <div className="ProductListItemContainer">"None"</div>
    }

    // use currentpage and displaypage props to tell if we are on the page, if so display
    const [visible, setVisible] = useState("none")
    
    useEffect(() => {
      if (props.displayPage === props.currentPage) {
        setVisible("flex")
      } else {
        setVisible("none")
      }
    }, [props.currentPage, props.displayPage])


    return (
        <div className="ProductListContainer" style={{display: visible}}>
            {content}
        </div>
    )
}