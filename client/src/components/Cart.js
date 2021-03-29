import { useEffect, useState } from "react";
import CartProduct from './CartProduct'

export default function Cart() {
    const [cart, setCart] = useState('Loading');
    const [cartUpdated, setCartUpdated] = useState(false)

    // function to force a cart update (maybe it should update the number near cart)
    function updateCart() {
        setCartUpdated(false)
    }

    useEffect(() => {
        if (cartUpdated === false) {
            const fetchCart = async () => {
                setCart('Loading')
                // it needs to include credentials on any request that requires passport otherwise it won't show
                const cartData = await fetch('http://localhost:5000/cart/', {credentials: 'include'})
                const cartContents = await cartData.json();
                setCart(cartContents);
            }
            fetchCart();
            setCartUpdated(true)
        }
      }, [cartUpdated]);

    console.log(cart)

    let cartContents

    if (cart.items === 'no cart') {
        cartContents = 'You have no cart. Please add something to create one'
    } else if (cart.items === 'empty') {
        cartContents = 'Cart is empty. Please add something to your cart'
    } else if (Array.isArray(cart.items)) {
        cartContents = cart.items.map(function (cartItem, index) {
            console.log(cartItem)
            return (
             <CartProduct
                id={cartItem.id}
                quantity={cartItem.quantity}
                key={index}
                number={index + 1}
                updateCart={updateCart}
              /> 
            ); 
          }); 
    } else {
        cartContents = 'Something went wrong, please try again later'
    }

    return(
        <div className="Content">
            <header><h3>Cart</h3></header>
            <p>Here are the contents of your cart</p>
            {cartContents}
        </div>
    )
}