const express = require('express')
const httpStatus = require('../utils/httpStatus')

apiRoutes = () => 
{
  const router = express.Router()

  router.get('/posts', posts)

  return router
}

async function posts(req, res) 
{
  res.status(httpStatus.OK).send('Posts')
}

module.exports = apiRoutes