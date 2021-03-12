const Router = require('express-promise-router')
const db = require('../db')
const router = new Router()
const passport = require('passport')

module.exports = router

router.post('/', (req, res, next) => {
    // call passport authentication passing the "local" strategy name and a callback function
    passport.authenticate('local', function (error, user, info) {
        // this will execute in any case, even if a passport strategy will find an error
        // log everything to console
        console.log(error);
        console.log(user);
        console.log(info);
  
        if (error) {
          res.status(401).send(error);
        } else if (!user) {
          res.status(401).send(info);
        } else {
          next();
        }
  
        res.status(401).send(info);
      })(req, res);
})

router.get('/', (req, res) => {
    var options = {
        root: __dirname,
    }
    var filename = 'loginForm.html'

    res.sendFile(filename, options, function(error) {
        if (error) {
            console.log(error)
        } else {
            console.log('Sent:', filename)
        }
    });
});