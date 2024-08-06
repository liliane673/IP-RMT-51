const router = require('express').Router()

router.get('/', (req, res) => {
    res.send('Hello World!')
})

//user endpoints
router.use('/', require('./users'))


module.exports = router;