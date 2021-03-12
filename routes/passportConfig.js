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
          return done(null, false, {message: 'No user found.'});
        }
        // unhash passwords and check if they match, if not, incorrect password
        if ((compare(password, {salt: customer.rows[0].salt, hashedpassword: customer.rows[0].supersecretword})) === false) {
          return done(null, false, {message: 'Sorry, your password was incorrect'})
        }
        // otherwise return user
        return done(null, customer.rows[0].username, {message: `Welcome ${customer.rows[0].username}`})
      } catch(error) {
        console.log(error)
      }
    }
  ));

    // Serialise / Unserialise users in and out of the session

// used to serialize the user for the session
  passport.serializeUser(function(user, done) {
		done(null, user.id);
  });

  // used to deserialize the user - check this
  passport.deserializeUser(function(id, done) {
		db.query("SELECT * from USERS where id = $1", [+id,function(err,rows){	
			done(err, rows[0]);
		}]);
  }); 

}

