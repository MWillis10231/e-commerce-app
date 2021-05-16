const Router = require('express-promise-router')
const router = new Router()
const passport = require('passport')

module.exports = router

router.post('/login', 
    passport.authenticate('local', 
    {
                            successRedirect: '/api/account/',
                            failureRedirect: '/api/account/fail',
                            failureFlash: true 
                        })
);

router.get('/', (req, res) => {
    res.status(200).send(req.user);
    //console.log(req.isAuthenticated())
    //console.log(req.session)
});

router.get('/fail', (req, res) => {
    res.status(404).send('User not found')
});

router.get('/logout', (req, res) => {
    //console.log(req.isAuthenticated())
    req.logout();
    res.send('You have been logged out');
    req.isAuthenticated()
    //console.log(req.session)
    //console.log(req.isAuthenticated())
})