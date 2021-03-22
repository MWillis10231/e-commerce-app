const Router = require('express-promise-router')
const db = require('../db')

const router = new Router()

module.exports = router


// GET all the products by a category

router.get('/category/:categoryId', async (req, res) => {
    const { categoryId } = req.params
    const results = await db.query('SELECT products.product_id, products.name, products.stock_amount, companies.name AS company, products.description, products.price, products.category, products.score, products.ratings, products.creator, products.year FROM products, companies WHERE products.company_id = companies.company_id AND category = $1', [categoryId])
    if (results.rows != 0) {
        res.send(results.rows)
    } else {
        res.send('No specific products found!')
    }
})

// GET ALL products

router.get('/', async (req, res) => {
    const results = await db.query('SELECT products.product_id, products.name, products.stock_amount, companies.name AS company, products.description, products.price, products.category, products.score, products.ratings, products.creator, products.year FROM products, companies WHERE products.company_id = companies.company_id ORDER BY stock_amount;')
    res.send(results.rows)
}) 

// GET a single product by its id

router.get('/:id', async (req, res) => {
    const { id } = req.params
    const results = await db.query('SELECT products.product_id, products.name, products.stock_amount, companies.name AS company, products.description, products.price, products.category, products.score, products.ratings, products.creator, products.year FROM products, companies WHERE products.company_id = companies.company_id AND product_id = $1', [id])
    if (results.rows != 0) {
        res.send(results.rows[0])
    } else {
        res.send('No product found!')
    }
})

