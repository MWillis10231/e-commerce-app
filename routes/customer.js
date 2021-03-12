const Router = require('express-promise-router')
const db = require('../db')
const { generateSalt, hash, compare } = require('../javascript/encryption')

const router = new Router()

module.exports = router

// Basic routes follow = will need some error handling etc. if they work
// we also need to write IF EXISTS into all of our POSTGRES queries right?
// Check passwords => do they know them, prompt?
// Handle edge-cases

// In reality we'd probably hide the errors and not log them to the console for database security

// GET ALL customers

router.get('/', async (req, res) => {
    try {
        const results = await db.query('SELECT * FROM customers')
        res.send(results.rows)
    } catch(error) {
        console.log(error)
        res.send('Sorry there was an error with your request')
    }

})

// GET a customer by their id

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const results = await db.query('SELECT * FROM customers WHERE customer_id = $1', [id])
        if (results.rows[0]) {
            res.send(results.rows[0])
        } else {
            res.send('This person could not be found. Sorry!')
        }
        
    } catch (error) {
        console.log(error)
        res.send('This person could not be found. Sorry!')
    }
})

// POST register a new customer > through sign-up 
// Needs a way of having a password that's hashed using passport.js

router.post('/register/', async (req, res) => {
    try {
        const { firstName } = req.query
        const { lastName } = req.query
        const { countryId } = req.query
        const { username } = req.query
        const { password } = req.query
        const { email } = req.query

        const secret = hash(password, generateSalt(14));
        const salt = secret.salt
        const hashed = secret.hashedpassword

        const values = [firstName, lastName, countryId, username, hashed, salt, email]
        const newQuery = "INSERT INTO customers (first_name, last_name, country_id, username, supersecretword, salt, email) VALUES ($1, $2, $3, $4, $5, $6, $7)"
        const result = await db.query(newQuery, values)
        res.send(result)
    } catch (error) {
        console.log(error)
        res.send('There was an error')
    }
})

// PUT update a customer's info by their id

router.put('/:id/', async (req, res) => {
    try {
        const { id } = req.params
        const { firstName } = req.query
        const { lastName } = req.query
        const { countryId } = req.query
        const values = [id, firstName, lastName, countryId]
        const newQuery = "UPDATE customers SET first_name = $2, last_name = $3, country_id = $4 WHERE customer_id = $1"
        const result = await db.query(newQuery, values)
        res.send(result);
    } catch (error) {
        console.log(error)
        res.send('There was an error')
    }
})

// DELETE a customer by their id 
//we need to check if ADMIN

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params
        await db.query('DELETE FROM customers WHERE customer_id = $1', [id])
        res.send(`Deleted the customer with the id: ${id}`)
    } catch(error) {
        console.log(error)
        res.send('There was an error')
    }
})