const Router = require('express-promise-router')
const db = require('../db')
const router = new Router()
const passport = require('passport')

module.exports = router

router.post('/login', 
    passport.authenticate('local', 
    {
                            successRedirect: '/account/',
                            failureRedirect: '/account/fail',
                            failureFlash: true 
                        })
);

router.get('/', (req, res) => {
    res.status(200).send(req.user);
    console.log(req.isAuthenticated())
});

router.get('/fail', (req, res) => {
    res.status(404).send('User not found')
});

router.get('/logout', (req, res) => {
    console.log(req.session)
    req.isAuthenticated()
    req.logout();
    res.send('You have been logged out');
    req.isAuthenticated()
    console.log(req.session)
})