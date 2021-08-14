const logger = require('../config/logger')

class MovieService
{
  register = async (options) =>
  {
    try
    {
      const body = options.object

      let element = await options.document.create({ ...body })

      const message = `Register a ${options.document}`
      const metadata = { action: `Register a ${options.document}`, payload: element }
      logger.info({ message, metadata })

      return { element }
    }

    catch(error)
    {
      const message = error.message
      const metadata = { action: `Register a ${options.document}`, payload: body }
      logger.error({ message, metadata })

      throw error
    }
  }

  get = async (document) =>
  {
    try
    {
      let elements = await document.find()

      const message = `Get ${document}`
      const metadata = { action: `Get ${document}`, payload: elements }
      logger.info({ message, metadata })

      return elements
    }

    catch(error)
    {
      const message = error.message
      const metadata = { action: `Get ${document}`, payload: movies }
      logger.info({ message, metadata })
    }
  }

}

module.exports = MovieService
