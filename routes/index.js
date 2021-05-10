const customers = require('./customer')
const products = require('./products')
const cart = require('./cart')
const orders = require('./orders')
const account = require('./account')
var swaggerJSDoc = require('swagger-jsdoc');

// Secure routes
function requireLogin(req, res, next) {
  //console.log(req.isAuthenticated())
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(403).json({error: "User is not logged in"});
  }
}

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
    app.use('/cart', requireLogin, cart)
    app.use('/orders', requireLogin, orders)
    app.use('/account', account)
    app.get('/swagger.json', function(req, res) {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
      });
}
