const customers = require('./customer')
const products = require('./products')
const cart = require('./cart')
const orders = require('./orders')

module.exports = app => {
    app.get('/', (req, res) => {
        res.send('Hello World! This works!')
      })
    app.use('/customers', customers)
    app.use('/products', products)
    app.use('/cart', cart)
    app.use('/orders', orders)
}


// More Router ideas => orders / companies / products / orders_products
// GET / POST / PUT / DELETE => companies / products (some of these will have to be ADMIN commands => i.e. not the gets)
// orders / orders_products => this is where we can get post and get from non-admin 
// maybe we want put and delete on admin commands for these too?