const router = require('express').Router();
const passport = require('passport')

// router.use('/painting', require('./paintingRoute'));
// router.use('/sculpture', require('./sculptureRoute'));
// router.use('/store', require('./storeRoute'));
// router.use('/user', require('./userRoute'));

router.get('/login', passport.authenticate('github'), (req, res) => {})

router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        return next(err)
    })
    res.redirect('/')
})

module.exports = router;
