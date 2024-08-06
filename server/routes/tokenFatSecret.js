const TokenController = require('../controllers/TokenController');

const router = require('express').Router()

router.post('/', TokenController.getToken)
// router.post('/:RecipeId', SavedRecipeController.addToSavedRecipes)

module.exports = router;