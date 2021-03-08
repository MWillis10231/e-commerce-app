const customers = require('./customer')

module.exports = app => {
    app.get('/', (req, res) => {
        res.send('Hello World! This works!')
      })
    app.use('/customers', customers)
}


