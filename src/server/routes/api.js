const express = require('express')
const router = express.Router()
const moviesRoutes = require('./movies/movies')
const categoriesRoutes = require('./movies/categories')

router.get('/', home)
router.use('/movies', moviesRoutes)
router.use('/categories', categoriesRoutes)

async function home(req, res)
{
  res.send('API home page')
}

module.exports = router
