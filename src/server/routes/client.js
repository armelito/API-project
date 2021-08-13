const express = require('express')
const router = express.Router()

router.get('/', home)

async function home(req, res)
{
  res.send('API home page')
}

module.exports = router
