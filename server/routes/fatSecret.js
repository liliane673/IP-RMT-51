const FatSecretController = require('../controllers/FatSecretController');

const router = require('express').Router()

//get fat secret access_token
router.post('/get-token', FatSecretController.getToken)

//get fat secret recipes
router.get('/get-recipes', FatSecretController.getRecipes)

module.exports = router;