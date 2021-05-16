const Router = require('express-promise-router')
const db = require('../db')
const { generateSalt, hash, compare } = require('../javascript/encryption')

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

//Swagger Definitions
/**
 * @swagger
 * definitions:
 *   Customer:
 *     properties:
 *       first_name:
 *         type: varchar
 *       last_name:
 *         type: varchar
 *       country_id:
 *         type: integer
 *       username:
 *         type: varchar
 *       email:
 *         type: varchar
 */

// GET ALL customers (we should put this behind some sort of admin thing)

/**
 * @swagger
 * /api/customers/all:
 *   get:
 *     tags:
 *       - Customers
 *     description: Returns all customers
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of customers
 *         schema:
 *           $ref: '#/definitions/Customer'
 */
router.get('/all', requireLogin, async (req, res) => {
    try {
        const results = await db.query('SELECT first_name, last_name, country_id, username, email FROM customers')
        res.send(results.rows)
    } catch(error) {
        console.log(error)
        res.send('Sorry there was an error with your request')
    }

})

// GET a customer by their id

/**
 * @swagger
 * /api/customers/id:
 *   get:
 *     tags:
 *       - Customers
 *     description: Returns a single customer
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: A single customer
 *         schema:
 *           $ref: '#/definitions/Customer'
 */

router.get('/:id', async (req, res) => {
    try {
        let currentUser = 'none'
        if (req.session.passport != undefined) {
            currentUser = req.session.passport.user
        }
        const { id } = req.params
        // Only display the user information for the customer themselves, do not show other customer info (you could show less?)
        const isCorrectCustomer = await db.query('SELECT username FROM customers WHERE customer_id = $1', [id])
        if (currentUser !== isCorrectCustomer.rows[0].username) {
            throw('Permission denied');
        }

        const results = await db.query('SELECT customers.first_name, customers.last_name, customers.username, countries.name, customers.email FROM customers, countries WHERE customers.country_id = countries.country_id AND  customer_id = $1', [id])
        if (results.rows[0]) {
            res.send(results.rows[0])
        } else {
            throw('Permission denied');
        }
        
    } catch (error) {
        if (error !== undefined) {
            console.log(error)
        }
        res.send('This person could not be found. Sorry!')
    }
})

// POST register a new customer > through sign-up 

/**
 * @swagger
 * /api/customers/register:
 *   post:
 *     tags:
 *       - Customers
 *     description: Creates a new customer
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: customer
 *         description: Customer object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Customer'
 *     responses:
 *       200:
 *         description: Successfully created
 */

router.post('/register/', async (req, res) => {
    try {
        // get the body and create consts
        const { firstName } = req.body
        const { lastName } = req.body
        const { username } = req.body
        const { password } = req.body
        const { email } = req.body

        // throw an error if no body
        if (!req.body) {
            throw('Bad request')
        }
        // throw an error if information is missing
        if (!req.body.firstName || !req.body.lastName || !req.body.username || !req.body.password || !req.body.email) {
            throw('Missing or incorrect input')
        }

        // make sure username && email are unique
        const uniqueQuery = `select * from customers where username = $1 or email = $2`;
        const uniqueValues = [username, email]
        const uniqueTest = await db.query(uniqueQuery, uniqueValues)
        if (uniqueTest.rows != 0) {
            throw('A customer with this username or email already exists')
        }

        // salt and hash the password
        const secret = hash(password, generateSalt(14));
        const salt = secret.salt
        const hashed = secret.hashedpassword

        // validate inputs?

        // if all good, insert into the database
        const values = [firstName, lastName, username, hashed, salt, email]
        const newQuery = "INSERT INTO customers (first_name, last_name, username, supersecretword, salt, email) VALUES ($1, $2, $3, $4, $5, $6)"
        await db.query(newQuery, values)
        res.status(201).send('User created')
        //LOGIN NOW
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
})

// PUT update a customer's info by their id

/**
 * @swagger
 * /api/customers/{id}:
 *   put:
 *     tags: Customers
 *     description: Updates a single customer
 *     produces: application/json
 *     parameters:
 *       - name: id
 *         description: Customer's id
 *         in: path
 *         required: true
 *         type: integer
 *         $ref: '#/definitions/Customer'
 *     responses:
 *       200:
 *         description: Successfully updated
 */

router.put('/:id/', requireLogin, async (req, res) => {
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

/**
 * @swagger
 * /api/customers/{id}:
 *   delete:
 *     tags:
 *       - Customers
 *     description: Deletes a single customer
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Customer's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully deleted
 */

router.delete('/:id', requireLogin, async (req, res) => {
    try {
        const { id } = req.params
        await db.query('DELETE FROM customers WHERE customer_id = $1', [id])
        res.send(`Deleted the customer with the id: ${id}`)
    } catch(error) {
        console.log(error)
        res.send('There was an error')
    }
})