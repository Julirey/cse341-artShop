const router = require('express').Router();
const passport = require('passport')

// router.use('/paintings', require('./paintingsRoute'));
// router.use('/sculptures', require('./sculpturesRoute'));
// router.use('/stores', require('./storesRoute'));
// router.use('/users', require('./usersRoute'));

router.get('/login', passport.authenticate('github'), (req, res) => {})

router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        return next(err)
    })
    res.redirect('/')
})

module.exports = router;
