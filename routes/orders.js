const Router = require('express-promise-router')
const db = require('../db')

const router = new Router()

module.exports = router

// Implement filter by certain conditions?

// GET ALL orders from a customer

router.get('/:customerId', async (req, res) => {
    const { customerId } = req.params
    const results = await db.query('SELECT * FROM orders WHERE customer_id = $1', [customerId])
    res.send(results.rows)
})

// GET a customer's single order by its id

router.get('/:customerId/:orderId', async (req, res) => {
    const { customerId } = req.params
    const { orderId } = req.params
    // check if the customer id & order id match
    const result = await db.query('SELECT * FROM orders WHERE customer_id = $1 AND order_id = $2', [customerId, orderId])
    if (result.rows != 0) {
        const { rows } = await db.query('SELECT products.product_id AS product_id, products.name AS product_name, companies.name AS company_name, products.description AS product_description, orders_products.quantity AS quantity FROM products, orders, orders_products, companies WHERE orders.order_id = orders_products.order_id AND products.product_id = orders_products.product_id AND companies.company_id = products.company_id AND orders.order_id = $1 ORDER BY 1;', [orderId])
        res.send(rows)
    } else {
        res.send('No order was found')
    }
})


