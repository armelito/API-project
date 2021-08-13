const express = require('express')
const router = express.Router()
const clientRoutes = require('./client')
const apiRoutes = require('./api')

router.use('/', clientRoutes)
router.use('/api', apiRoutes)


module.exports = router
