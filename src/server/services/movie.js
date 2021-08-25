const logger = require('../config/logger')
const { Movie } = require('../models/Movie')

class MovieService
{
  post = async (object) =>
  {
    try
    {
      const movie = await Movie.create({ ...object })

      const message = `Register a movie`
      const metadata = { action: `Register a movie`, payload: movie }
      logger.info({ message, metadata })

      return { movie }
    }

    catch(error)
    {
      const message = error.message
      const metadata = { action: `Register a movie`, payload: object }
      logger.error({ message, metadata })

      throw error
    }
  }

  getAll = async () =>
  {
    try
    {
      const movies = await Movie.find().sort('name')

      const message = `Get movies`
      const metadata = { action: `Get movies`, payload: movies }
      logger.info({ message, metadata })

      return movies
    }

    catch(error)
    {
      const message = error.message
      const metadata = { action: `Get movies`, payload: movies }
      logger.info({ message, metadata })
    }
  }

  get = async (id) =>
  {
    try
    {
      const movie = await Movie.findById(id)

      const message = `Get movie`
      const metadata = { action: `Get movie`, payload: movie }
      logger.info({ message, metadata })

      return movie
    }

    catch(error)
    {
      const message = error.message
      const metadata = { action: `Get movie`, payload: id }
      logger.info({ message, metadata })
    }
  }

  put = async (id, object) =>
  {
    try
    {
      const movie = await Movie.findByIdAndUpdate(id, object, { new: true })

      const message = `Update a movie`
      const metadata = { action: `Update a movie`, payload: movie }
      logger.info({ message, metadata })

      return movie
    }

    catch(error)
    {
      const message = error.message
      const metadata = { action: `Update a movie`, payload: object }
      logger.error({ message, metadata })

      throw error
    }
  }

  del = async (id) =>
  {
    try
    {
      const movie = await Movie.findByIdAndRemove(id)

      const message = `Remove a movie`
      const metadata = { action: `Remove a movie`, payload: movie }
      logger.info({ message, metadata })

      return movie
    }

    catch(error)
    {
      const message = error.message
      const metadata = { action: `Remove a movie`, payload: id }
      logger.error({ message, metadata })

      throw error
    }
  }
}

module.exports = MovieService
