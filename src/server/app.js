const express = require("express")
const bodyParser = require("body-parser")
const cors = require('cors')
const errorMiddleware = require('./middlewares/error')
const routes = require('./routes')

const app = express()
const environment = process.env.NODE_ENV

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/', routes())
app.use(errorMiddleware)

if (environment !== "production") 
{
  require('dotenv').config()

  const morgan = require("morgan")
  app.use(morgan('dev'))
}

module.exports = app