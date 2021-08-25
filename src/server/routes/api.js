const express = require('express')
const router = express.Router()
const moviesRoutes = require('./movies/movies')
const categoriesRoutes = require('./movies/categories')
const customersRoutes = require('./customers/customers')
const rentalsRoutes = require('./rentals/rentals')

router.get('/', home)
router.use('/movies', moviesRoutes)
router.use('/categories', categoriesRoutes)
router.use('/customers', customersRoutes)
router.use('/rentals', rentalsRoutes)

async function home(req, res)
{
  res.send('API home page')
}

module.exports = router
