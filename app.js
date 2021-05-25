const express = require('express')
const mountRouters = require('./routes')
const passport = require('passport')
const passportConfig = require('./routes/passportConfig')
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const db = require('./db')
const flash = require('connect-flash');
const cors = require('cors')
const path = require('path')
require('dotenv').config();
var uid = require('uid-safe')

const app = express()
// if HEROKU, else local
const port = process.env.PORT || 5000;

// Authentication strategy
passportConfig(passport);

const store = new pgSession({
  pool : db.pool(),
})


// Middleware
app.use(require('morgan')('combined'));
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(session({
  store: store,
  secret: process.env.COOKIE_SECRET, 
  genid: uid(18, function (err, string) {
    if (err) {throw err}
    return string;
  }),
  resave: false, 
  saveUninitialized: false,
})); 
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}))

// If production
if (process.env.NODE_ENV === "production") {
  // server static content
  // NPM run build
  app.use(express.static(path.join(__dirname, "client/build")))
}

// Initialise passport and restore authentication state from the session (if any)
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Set-up the Routes
mountRouters(app);

// catch-all if non-existant route
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
})

// Start the app
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

module.exports = app; // for testing