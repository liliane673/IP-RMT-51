const TypeController = require('../controllers/TypesController');

const router = require('express').Router()

router.post('/', TypeController.createType)
router.get('/', TypeController.getAllTypes)
router.put('/:id', TypeController.updateTypeById)

module.exports = router;