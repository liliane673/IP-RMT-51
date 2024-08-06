const CategoryController = require('../controllers/CategoriesController');

const router = require('express').Router()

router.post('/', CategoryController.createCategory)
router.get('/', CategoryController.getAllCategories)
router.put('/:id', CategoryController.updateCategoryById)

module.exports = router;