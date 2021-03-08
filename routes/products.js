const Router = require('express-promise-router')
const db = require('../db')

const router = new Router()

module.exports = router

// GET ALL products

router.get('/', async (req, res) => {
    const results = await db.query('SELECT * FROM products')
    res.send(results)
})

// GET a single product by its id

router.get('/:id', async (req, res) => {
    const { id } = req.params
    const { rows } = await db.query('SELECT * FROM products WHERE product_id = $1', [id])
    res.send(rows[0])
})

// GET ALL prodcuts by category

router.get('/:category', async (req, res) => {
    const { category } = req.params
    const results = await db.query('SELECT * FROM products WHERE category = $1', [category])
})

