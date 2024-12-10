const router = require('express').Router();
const paintingController = require('../controllers/paintingController');
const auth = require('../middleware/authenticate');
const validate = require('../middleware/validate');

router.post('/', auth.isAuthenticated, paintingController.createPainting);
router.get('/', paintingController.getAll);
router.get('/:id', paintingController.getById);
router.get('/tag/:tag', paintingController.getByTag);
router.get('/artist/:artist', paintingController.getByArtist);
router.put('/:id', auth.isAuthenticated, paintingController.updatePainting);
router.delete('/:id', auth.isAuthenticated, paintingController.deletePainting);

module.exports = router;
