const express = require('express')
const httpStatus = require('../utils/httpStatus')

const moviesRoutes = require('./api/movies')

apiRoutes = () => 
{
  const router = express.Router()

  router.get('/', home)
  router.use('/movies', moviesRoutes())

  return router
}

async function home(req, res) 
{
  res.status(httpStatus.OK).send('API home page')
}

//async function movies(req, res) 
//{
//  res.status(httpStatus.OK).send('API home page')
//}

module.exports = apiRoutes