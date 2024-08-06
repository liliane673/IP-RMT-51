const SavedRecipeController = require('../controllers/SavedRecipesController');

const router = require('express').Router()

router.get('/', SavedRecipeController.getAllSavedRecipes)

router.post('/:recipeId', SavedRecipeController.addToSavedRecipes)

module.exports = router;