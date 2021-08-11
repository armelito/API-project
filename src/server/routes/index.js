const express = require('express')

const clientRoutes = require('./client')
const apiRoutes = require('./api')

routes = () =>
{
  const router = express.Router()

  router.use('/', clientRoutes())
  router.use('/api', apiRoutes())

  return router
}

module.exports = routes