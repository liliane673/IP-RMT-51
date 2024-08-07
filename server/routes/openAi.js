const OpenAiController = require('../controllers/OpenAiController');

const router = require('express').Router()

//get recommendation
router.post('/', OpenAiController.getRecipeRecommendation)

module.exports = router;