const { createLogger, transports, format } = require('winston')
require('winston-mongodb')

const logger = createLogger(
  {
    transports:
    [
      new transports.MongoDB(
        {
          db: 'mongodb://localhost/boilerplate',
          level: 'info',
          format: format.combine(format.timestamp(), format.json()),
          options: { useUnifiedTopology: true },
          collection: 'logger'
        }
      )
    ]
  }
)

module.exports = logger
