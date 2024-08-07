const SavedRecipeController = require('../controllers/SavedRecipesController');
const authorization = require('../middlewares/authorization');

const router = require('express').Router()

router.get('/', SavedRecipeController.getAllSavedRecipes)

router.post('/:recipeId', SavedRecipeController.addToSavedRecipes)

router.delete('/:id', authorization, SavedRecipeController.deleteSavedRecipes)

module.exports = router;