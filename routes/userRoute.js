const router = require('express').Router();
const userController = require('../controllers/userController');
const passport = require('passport');
const auth = require('../middleware/authenticate');
const validation = require('../middleware/validate');

router.post('/', auth.isAuthenticated, validation.createUser, userController.createUser);
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
router.put('/:id', auth.isAuthenticated, validation.updateUser, userController.updateUser);
router.delete('/:id', auth.isAuthenticated, userController.deleteUser);

module.exports = router;
