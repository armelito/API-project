const express = require('express')

clientRoutes = () => 
{
  const router = express.Router()

  router.get('/', home)

  return router
}

async function home(req, res) 
{
  res.send('Home')
}

module.exports = clientRoutes