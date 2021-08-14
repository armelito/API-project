const express = require('express')
const router = express.Router()
const { register, get } = require('../../controllers/moviesController')

router.get('/', get)
router.post('/', register)

router.get('/categories', get)
router.post('/categories', register)

module.exports = router
