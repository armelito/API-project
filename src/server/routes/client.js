const express = require('express')
const router = express.Router()

router.get('/', home)

async function home(req, res)
{
  res.send('Client home page')
}

module.exports = router
