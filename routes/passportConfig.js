const { compare } = require('../javascript/encryption')
const db = require('../db')
var Strategy   = require('passport-local').Strategy;

module.exports = function(passport) {
  //Local strategy to verify credentials

  passport.use(new Strategy(
    async function(username, password, done) {
      try {
        // find a customer with that username
        const customer = await db.query("SELECT * FROM customers WHERE username = $1", [username]);
        // if no customer found, return
        if (customer.rows.length === 0) {
          return done(null, false, {message: 'No customer found.'});
        }
        // unhash passwords and check if they match, if not, incorrect password
        if ((compare(password, {salt: customer.rows[0].salt, hashedpassword: customer.rows[0].supersecretword})) === false) {
          return done(null, false, {message: 'Sorry, your password was incorrect'})
        }
        // otherwise return user
        return done(null, {id: customer.rows[0].customer_id, username: customer.rows[0].username, firstName: customer.rows[0].first_name, lastName: customer.rows[0].last_name, email: customer.rows[0].email}, {message: `Welcome ${customer.rows[0].username}`})
      } catch(error) {
        console.log(error)
      }
    }
  ));

    // Serialise / Unserialise users in and out of the session

// used to serialize the user for the session
  passport.serializeUser(function(customer, done) {
		done(null, customer.id);
  });

  // used to deserialize the user - check this
  passport.deserializeUser(async function(customer, done) {
    try {
      const result = await db.query("SELECT * FROM customers WHERE customer_id = $1", [customer])
      if (result.rows == 0) {
        throw('Error when selecting user on session deserialise')
      }
      done(null, {id: result.rows[0].customer_id, username: result.rows[0].username, firstName: result.rows[0].first_name, lastName: result.rows[0].last_name, email: result.rows[0].email})
    } catch(error) {
      console.log(error)
    }
  }); 
}

