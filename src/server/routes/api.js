const express = require('express')
const router = express.Router()
const moviesRoutes = require('./api/movies')

router.get('/', home)
router.use('/movies', moviesRoutes)

async function home(req, res)
{
  res.send('API home page')
}

module.exports = router
