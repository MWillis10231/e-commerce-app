const Router = require('express-promise-router')
const db = require('../db')

const router = new Router()

module.exports = router

// CREATE A CART 
// Can we store what was in the cart in a local variable? then load that into this?
// Should be possible and is a good idea imo
// Do all these need to be async? If not accessing database probably not

router.put('/', async (req, res) => {
    // user clicks on a product > add to cart 
    // if no cart, create it and the empty items array
    if (!req.session.cart) {
        req.session.cart = {cartId: 1};
        req.session.items = [];
    }

    // test
    let newProduct = {id: 1, quantity: 2}

    // check if there is an existing product in the cart with that id
    const findIndex = req.session.items.findIndex(item => item.productId === newProduct.productId)
    console.log(findIndex);

    // if there is, update the quantity
    if (findIndex !== -1) {
        req.session.items[findIndex].quantity = req.session.items[findIndex].quantity + newProduct.quantity
        res.send('Updated the quantity!')
    } else {
        // otherwise push to the array
        req.session.items.push(newProduct);
        res.send('Added the product!')
    }    
    console.log(req.session)
})

router.get('/', (req, res) => {
    // user wants to look at what's in their cart
    if (req.session.cart !== undefined) {
        if (typeof req.session.items !== undefined) {
            res.send(req.session.items)
        } else {
            res.send('Add something to your cart!')
        }
    } else {
        res.send('No cart found!')
    }
})

router.post('/:cartid/checkout', async (req, res) => {
    // User checkout
    // First, check if logged in. 
    if (req.session.passport == undefined) {
        // redirect them to /register/?
        res.send('Please register or log in')
    } else if (req.session.items === [] || req.session.cart == undefined) {
    // Then check if there's anything in the cart!
        res.send('Please put something in your cart!')
    } else {
        // Check payment??!?!?
        try {
            const queryResult = await db.query('SELECT customer_id FROM customers WHERE username = $1', [req.session.passport.user])
            const customerId = queryResult.rows[0].customer_id;
            const dateNow = new Date();
            const year = dateNow.getFullYear();
            const month = dateNow.getMonth();
            const day = dateNow.getDate();
            const formattedDate = `${year}-${month}-${day}`
            const hours = dateNow.getHours()
            const minutes = dateNow.getMinutes();
            const seconds = dateNow.getSeconds();
            const ms = dateNow.getMilliseconds()
            //create a unique orderId using customerId + ms of order
            const orderId = `${customerId}${year}${month}${day}${hours}${minutes}${seconds}${ms}`
            // insert a new order with this information
            await db.query('INSERT INTO orders(order_id, customer_id, date_ordered) values($1, $2, $3)', [orderId, customerId, formattedDate])
            // update orders_products with each product & quantity relevant to the order
            req.session.items.forEach(item => {
                const productId = item.id;
                const { quantity } = item;
                db.query('INSERT INTO orders_products(order_id, product_id, quantity) values($1, $2, $3)', [orderId, productId, quantity])
                });
        } catch(error) {
            console.log(error)
            res.send('There was an error, please try again later.')
        }
    }
})
