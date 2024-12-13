const router = require('express').Router();

router.use('/painting', require('./paintingRoute'));
// router.use('/sculpture', require('./sculptureRoute'));
router.use('/store', require('./storeRoute'));
router.use('/user', require('./userRoute'));

module.exports = router;
