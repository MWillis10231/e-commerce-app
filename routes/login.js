const Router = require('express-promise-router')
const db = require('../db')
const router = new Router()
const passport = require('passport')

module.exports = router

router.post('/', 
    passport.authenticate('local',
                        { 
                            successRedirect: '/success',
                            failureRedirect: '/',
                            failureFlash: true 
                        })
);

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

