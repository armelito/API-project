const express = require('express')
const router = express.Router()
const { createMovie, getMovies } = require('../../controllers/moviesController')

router.get('/', getMovies)
router.post('/', createMovie)

module.exports = router
