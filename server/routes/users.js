const UserController = require('../controllers/UsersController');

const router = require('express').Router()

//users endpoints login
router.post('/login', UserController.login);

//users endpoints register
router.post('/register', UserController.register);



module.exports = router;