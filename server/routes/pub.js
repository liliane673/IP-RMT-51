const PublicController = require('../controllers/PublicController');

const router = require('express').Router()

router.get('/recipes', PublicController.getAllRecipesPublic)

module.exports = router;