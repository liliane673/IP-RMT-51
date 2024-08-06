const authentication = require('../middlewares/authentication')
const errorHandler = require('../middlewares/errorHandler');
const { route } = require('./users');

const router = require('express').Router()

router.get('/', (req, res) => {
    res.send('Hello World!')
})

//user endpoints
router.use('/', require('./users'))

//authentication 
router.use(authentication)

//categories endpoints
router.use('/categories', require('./categories'))

//types endpoints
router.use('/types', require('./types'))

//recipes endpoints
router.use('/recipes', require('./recipes'))

//saved-recipes endpoints
router.use('/my-saved-recipes', require('./saved-recipes.js'))

//fat secret endpoints
router.use('/connection-fatsecret', require('./fatSecret.js'))

//openAi endpoints
router.use('/recipe-recommendation', require('./openAi.js'))


router.use(errorHandler);

module.exports = router;