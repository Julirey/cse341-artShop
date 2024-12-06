const router = require('express').Router();
const userController = require('../controllers/userController');
const passport = require('passport');
const auth = require('../middleware/authenticate');

router.post('/', auth.isAuthenticated, userController.createUser);

router.get('/', userController.getAll);

router.get('/login', passport.authenticate('github'), () => {
  // #swagger.ignore = true
});

router.get('/logout', (req, res, next) => {
  // #swagger.ignore = true
  req.logout((err) => {
    if (err) return next(err);
  });
  res.redirect('/');
});

router.get('/:id', userController.getById);

module.exports = router;
