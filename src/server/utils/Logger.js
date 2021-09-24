const logger = require('../config/logger')

function log(_message, _action, _payload)
{
  const message = _message
  const metadata = { action: _action, payload: _payload }

  logger.error({ message, metadata })
}

exports.log = log
