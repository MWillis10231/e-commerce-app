const express = require('express')
const mountRouters = require('./routes')
const passport = require('passport')
const passportConfig = require('./routes/passportConfig')


const app = express()
const port = 3000

// Config

// Authentication strategy
passportConfig(passport);


// Middleware
app.use(require('morgan')('combined'));
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'herpderpsfdsafdsa', resave: false, saveUninitialized: false }));

// Initialise passport and restore authentication state from the session (if any)
app.use(passport.initialize());
app.use(passport.session());

// Set-up the Routes
mountRouters(app);

// Start the app
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})