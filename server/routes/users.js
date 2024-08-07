const UserController = require('../controllers/UsersController');
const authentication = require('../middlewares/authentication')
const authorizationProfile = require('../middlewares/authorizationProfile');

const router = require('express').Router()

//users endpoints login
router.post('/login', UserController.login);

//users endpoints register
router.post('/register', UserController.register);

//users endpoints edit own profile
router.put('/edit-profile/:id', authentication, authorizationProfile, UserController.editProfile);


module.exports = router;