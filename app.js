const express = require('express')
const mountRouters = require('./routes')
const passport = require('passport')
const passportConfig = require('./routes/passportConfig')
const session = require('express-session');
//const pgSession = require('connect-pg-simple')(session);
//const db = require('./db')
const flash = require('connect-flash');
const cors = require('cors')

const app = express()
const port = 5000

// Config

// Authentication strategy
passportConfig(passport);


// Middleware
app.use(require('morgan')('combined'));
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(session({
/*     store: new pgSession({
    pool : db,
    tableName : 'session'
  }), */
  secret: process.env.COOKIE_SECRET, 
  resave: false, 
  saveUninitialized: false 
}));
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}))


// Initialise passport and restore authentication state from the session (if any)
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Set-up the Routes
mountRouters(app);

// Start the app
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})