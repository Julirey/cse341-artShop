const router = require('express').Router();
const sculptureController = require('../controllers/sculptureController');
const auth = require('../middleware/authenticate');
const validate = require('../middleware/validate');

// Route to create sculpture entry
router.post(
  '/',
  auth.isAuthenticated,
  validate.validateSculpture,
  sculptureController.createSculpture
);

// Route to get data of all sculptures
router.get('/', sculptureController.getAll);

// Route to get data of a sculpture by id
router.get('/:id', sculptureController.getById);

// Route to get sculptures by artist
router.get('/artist/:artist', sculptureController.getByArtist);

// Route to get sculptures by material
router.get('/material/:material', sculptureController.getByMaterial);

// Route to update sculpture entry
router.put(
  '/:id',
  auth.isAuthenticated,
  validate.validateSculpture,
  sculptureController.updateSculpture
);

// Route to delete sculpture entry
router.delete('/:id', auth.isAuthenticated, sculptureController.deleteSculpture);

module.exports = router;
