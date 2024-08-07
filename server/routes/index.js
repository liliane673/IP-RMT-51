const authentication = require('../middlewares/authentication')
const errorHandler = require('../middlewares/errorHandler');
const { route } = require('./users');
require('dotenv').config()

const router = require('express').Router()

router.get('/', (req, res) => {
    res.send('Hello World!')
})

//user endpoints
router.use('/', require('./users'))

//authentication 
router.use(authentication)

//recipes endpoints
router.use('/recipes', require('./recipes'))

//saved-recipes endpoints
router.use('/my-saved-recipes', require('./saved-recipes.js'))

//openAi endpoints
router.use('/recipe-recommendation', require('./openAi.js'))

//midtrans endpoints
router.use('/connection-midtrans', require('./midtrans.js'))


router.use(errorHandler);

module.exports = router;