const Router = require('express-promise-router')
const db = require('../db')

const router = new Router()

module.exports = router

// Implement filter by certain conditions?

// GET ALL orders from a customer

router.get('/:customerId', async (req, res) => {
    const { customerId } = req.params
    const results = await db.query('SELECT * FROM orders WHERE customer_id = $1', [customerId])
    res.send(results)
})

// GET a customer's single order by its id

router.get('/:customerId/:orderId', async (req, res) => {
    const { customerId } = req.params
    const { orderId } = req.params
    const { rows } = await db.query('SELECT * FROM orders WHERE customer_id = $1 AND order_id = $2', [customerId, orderId])
    res.send(rows[0])
})
