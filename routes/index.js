const customers = require('./customer')
const products = require('./products')
const cart = require('./cart')
const orders = require('./orders')
const account = require('./account')
var swaggerJSDoc = require('swagger-jsdoc');

var swaggerDefinition = {
    info: {
      title: 'Node Swagger API',
      version: '1.0.0',
      description: 'Demonstrating how to describe a RESTful API with Swagger',
    },
    host: 'localhost:3000',
    basePath: '/',
  };
  
  // options for the swagger docs
  var options = {
    // import swaggerDefinitions
    swaggerDefinition: swaggerDefinition,
    // path to the API docs
    apis: ['./routes/*.js'],
  };
  
  // initialize swagger-jsdoc
  const swaggerSpec = swaggerJSDoc(options);

module.exports = app => {
  app.get('/', (req, res) => {
    var options = {
        root: __dirname,
    }
    var filename = 'index.html'
    console.log(req.session)
    res.sendFile(filename, options, function(error) {
        if (error) {
            console.log(error)
        } else {
            console.log('Sent:', filename)
        }
    })})
    app.use('/customers', customers)
    app.use('/products', products)
    app.use('/cart', cart)
    app.use('/orders', orders)
    app.use('/account', account)
    app.get('/swagger.json', function(req, res) {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
      });
}


// More Router ideas => orders / companies / products / orders_products
// GET / POST / PUT / DELETE => companies / products (some of these will have to be ADMIN commands => i.e. not the gets)
// orders / orders_products => this is where we can get post and get from non-admin 
// maybe we want put and delete on admin commands for these too?