const RecipeController = require('../controllers/RecipesController');

const router = require('express').Router()

router.get('/', RecipeController.getAllRecipes)
router.get('/:id', RecipeController.getRecipeById)

module.exports = router;