const UAParser = require('ua-parser-js')

uaParser = (req, res, next) =>
{
  const ua = UAParser(req.headers['user-agent'])
  res.locals.isDesktop = ua.device.type === undefined
  res.locals.isPhone = ua.device.type === 'mobile'
  res.locals.isTablet = ua.device.type === 'tablet'

  next()
}

module.exports = uaParser
