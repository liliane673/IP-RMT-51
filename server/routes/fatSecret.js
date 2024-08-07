const FatSecretController = require('../controllers/FatSecretController');
const cron = require('node-cron');

const router = require('express').Router()

//get fat secret access_token
router.post('/get-token', FatSecretController.getToken)

//get fat secret recipes
router.get('/get-recipes', FatSecretController.getRecipes)


// cron.schedule('* * * * * *', () => {
//     console.log('running a task every s >>');
// });

module.exports = router;