const authentication = require('../middlewares/authentication')
const errorHandler = require('../middlewares/errorHandler');
const { route } = require('./users');
require('dotenv').config()

const router = require('express').Router()

//user endpoints
router.use('/', require('./users.js'))
router.use('/pub', require('./pub.js'))

//authentication 
router.use(authentication)

//recipes endpoints
router.use('/recipes', require('./recipes.js'))

//saved-recipes endpoints
router.use('/my-saved-recipes', require('./saved-recipes.js'))

//openAi endpoints
router.use('/recipe-recommendation', require('./openAi.js'))

//midtrans endpoints
router.use('/connection-midtrans', require('./midtrans.js'))


router.use(errorHandler);

module.exports = router;