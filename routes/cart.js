const Router = require('express-promise-router')
const db = require('../db')
const { v4: uuidv4 } = require('uuid');

const router = new Router()

// Secure routes
function requireLogin(req, res, next) {
    //console.log(req.isAuthenticated())
    if (req.isAuthenticated()) {
      next();
    } else {
      res.status(403).json({error: "User is not logged in"});
    }
  }

module.exports = router

// CREATE A CART 
router.put('/', async (req, res) => {
    // user clicks on a product > add to cart 
    // if no cart, create it and the empty items array
    if (!req.session.cart) {
        req.session.cart = {cartId: uuidv4()};
        req.session.cart.items = [];
        console.log(req.session.cart)
    }

    // Get the quantity and product Id from the request body
    let { productId } = req.body
    let { quantity } = req.body

    // get the price from the server
    const results = await db.query('SELECT price FROM products WHERE product_id = $1', [productId])
    const price = results.rows[0].price
    console.log(results)
    console.log(price)

    //! if there is no request body we need to throw an error
    if (!req.body) {
        throw('Bad request')
    }

    // assign a new product the id & quantity and make sure the values are both actually numbers
    let newProduct = {id: parseInt(productId), quantity: parseInt(quantity), unitPrice: price, totalPrice: price * quantity}

    // check if there is an existing product in the cart with that id
    const findIndex = req.session.cart.items.findIndex(item => item.id === newProduct.id)
    //console.log(findIndex);

    // if there is, update the quantity and total price
    if (findIndex !== -1) {
        req.session.cart.items[findIndex].quantity = parseInt(req.session.cart.items[findIndex].quantity) + parseInt(newProduct.quantity)
        req.session.cart.items[findIndex].totalPrice = price * req.session.cart.items[findIndex].quantity
        // if the quantity goes to zero, remove the item
        if (req.session.cart.items[findIndex].quantity === 0) {
            req.session.cart.items.splice([findIndex], 1);
            res.status(200).send('Removed the item')
        } else {
            res.status(200).send('Updated the quantity!')
        }
    } else {
        // otherwise push to the array
        req.session.cart.items.push(newProduct);
        res.status(201).send('Added the product!')
    }    
    console.log(req.session)
    console.log(req.session.cart.items)
})

router.get('/', (req, res) => {
    console.log(req.session)
    console.log(req.session.cart)
    // user wants to look at what's in their cart
    if (req.session.cart !== undefined) {
        if (req.session.cart.items.length) {
            const cart = req.session.cart.items
            const id = req.session.cart.cartId
            res.status(200).json({id: id, items: cart})
        } else {
            const id = req.session.cart.cartId
            res.status(200).json({id: id, items: 'empty'})
        }
    } else {
        res.status(404).json({id: 'none', items: 'no cart'})
    }
})

router.post('/:cartid/checkout', requireLogin, async (req, res) => {
    // User checkout
    if (req.session.items === [] || req.session.cart == undefined) {
    // Then check if there's anything in the cart!
        res.send('Please put something in your cart!')
    } else {
        // Check payment??!?!?
        try {
            const customerId = req.session.passport.user
            const dateNow = new Date();
            //create a unique orderId using customerId + ms of order
            const orderId = uuidv4();
            // insert a new order with this information
            await db.query('INSERT INTO orders(order_id, customer_id, date_ordered) values($1, $2, $3)', [orderId, customerId, dateNow])
            // update orders_products with each product & quantity relevant to the order
            req.session.cart.items.forEach(item => {
                const productId = item.id;
                const { quantity } = item;
                db.query('INSERT INTO orders_products(order_id, product_id, quantity) values($1, $2, $3)', [orderId, productId, quantity])
                });
            res.status(201).json({id: orderId, items: req.session.cart.items, success: true})
        } catch(error) {
            console.log(error)
            res.status(400).json({id: orderId, items: req.session.cart.items, success: false})
        }
    }
})

router.delete('/:cartid/delete', async (req, res) => {
    // deletes a cart by its ID
    if (req.session.cart) {
        //console.log(req.session.cart)
        delete req.session.cart 
        //console.log(req.session.cart)
        res.status(200).json({cart: 'deleted'});
    } else {
        res.status(404).json({cart: 'none found'});
    }
})
