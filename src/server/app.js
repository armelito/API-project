const express = require("express")
const bodyParser = require("body-parser")
const cors = require('cors')
const path = require('path')
const methodOverride = require('method-override')
const errorMiddleware = require('./middlewares/error')
const routes = require('./routes')

const app = express()
const IS_DEVELOPMENT = process.env.NODE_ENV

app.set('views', path.join(__dirname, '../views'))
app.set('view engine', 'pug')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/', routes())
app.use(errorMiddleware)
app.use(methodOverride())
app.use(express.static(path.join(__dirname, 'public')))

app.use((req, res, next) =>
{
  const ua = UAParser(req.headers['user-agent'])
  res.locals.isDesktop = ua.device.type === undefined
  res.locals.isPhone = ua.device.type === 'mobile'
  res.locals.isTablet = ua.device.type === 'tablet'

  next()
})

if (IS_DEVELOPMENT !== "production")
{
  require('dotenv').config()

  const logger = require("morgan")
  app.use(logger('dev'))
}

require("./config/db")

module.exports = app
