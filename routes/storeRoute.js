const router = require('express').Router();
const storeController = require('../controllers/storeController');
const auth = require('../middleware/authenticate');
const validate = require('../middleware/validate');

// Route to create store entry
router.post(
  '/',
  auth.isAuthenticated,
  validate.validateStore,
  storeController.createStore
);

// Route to get data of all store orders
router.get('/', storeController.getAll);

// Route to get data of a store order by id
router.get('/:id', storeController.getById);

// Route to get store orders by type of item
router.get('/type/:type', storeController.getByType);

// Route to update store entry
router.put(
  '/:id',
  auth.isAuthenticated,
  validate.validateStore,
  storeController.updateStore
);

// Route to delete store entry
router.delete('/:id', auth.isAuthenticated, storeController.deleteStore);

module.exports = router;
