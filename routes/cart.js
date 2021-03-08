const Router = require('express-promise-router')
const db = require('../db')

const router = new Router()

module.exports = router

// CREATE A CART 
// Can we store what was in the cart in a local variable? then load that into this?
// Should be possible and is a good idea imo
// Do all these need to be async? If not accessing database probably not

router.post('/', async (req, res) => {
    // user clicks on a product > add to cart & no cart exists
})

router.post('/:cartid', async (req, res) => {
    // user adds a product to their cart and a cart already exists
})

router.get('/:cartid', async (req, res) => {
    // user wants to look at what's in their cart
})

router.post('/:cartid/checkout', (req, res) => {
    // User checkout
    // We need to load all the locally stored variables (or from the database) and then pass them in as an order
    // Create a new order ID with info from the user
    // Date today / now
    //Then populate a orders_products entry (or several) depending on the number of products on that order and the quantity ordered
    // Return that information visually
})
