const Router = require('express-promise-router')
const db = require('../db')

const router = new Router()

module.exports = router

// Basic routes follow = will need some error handling etc. if they work
// we also need to write IF EXISTS into all of our POSTGRES queries right?

// GET a customer by their id

router.get('/:id', async (req, res) => {
    const { id } = req.params
    const { rows } = await db.query('SELECT * FROM customers WHERE customer_id = $1', [id])
    res.send(rows[0])
})

// POST add a new customer

router.post('/:id', async (req, res) => {
    const { id } = req.params
    const firstName = req.params.first_name
    const lastName = req.params.last_name
    const country = req.params.country
    const countryId = await db.query('SELECT country_id FROM countries WHERE country = $1', [country])
    // we need to send that we've updated the database / anything else? 
    // does this result need to be a const?
    const result = await db.query('INSERT INTO customers (customer_id, first_name, last_name, country_id) values ($1, $2, $3, $4)', [id, firstName, lastName, countryId])
    res.send(`Added the customer ${firstName} ${lastName} with the id ${id} who lives in ${country} which has a country ID of ${countryId}`)
})

// PUT update a customer's info by their id

router.post('/:id', async (req, res) => {
    const { id } = req.params
    const firstName = req.params.first_name
    const lastName = req.params.last_name
    const country = req.params.country
    const countryId = await db.query('SELECT country_id FROM countries WHERE country = $1', [country])
    // we need to send that we've updated the database / anything else? 
    // does this result need to be a const?
    const result = await db.query('UPDATE customers SET first_name = $2, last_name = $3, country_id = $4) values WHERE customer_id = $1', [id, firstName, lastName, countryId])
    res.send(`Updated the customer ${firstName} ${lastName} with the id ${id} who lives in ${country} which has a country ID of ${countryId}`)
})

// DELETE a customer by their id (do we need to check if ADMIN or something?)

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    await db.query('DELETE FROM customers WHERE customer_id = $1', [id])
    res.send(`Deleted the customer with the id: ${id}`)
})