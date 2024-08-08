const MidtransController = require('../controllers/MidtransController');

const router = require('express').Router()

//get token
router.post('/get-token', MidtransController.getToken)
router.put('/user-update', MidtransController.userUpdate)

module.exports = router;