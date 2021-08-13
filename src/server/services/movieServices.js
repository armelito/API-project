const Movie = require('../models/Movie')
const logger = require('../config/logger')

class MovieService
{
  register = async (movieInput) =>
  {
    try
    {
      let newMovie = await Movie.create({ ...movieInput })

      const message = "Create movie"
      const metadata = { action: "register: create a movie", payload: newMovie }
      logger.info({ message, metadata })

      return { newMovie }
    }

    catch(error)
    {
      const message = error.message
      const metadata = { action: "register a movie", payload: movieInput }
      logger.error({ message, metadata })

      throw error
    }
  }

  get = async () =>
  {
    try
    {
      let movies = await Movie.find()

      const message = "Get movies"
      const metadata = { action: "get: get a movie", payload: movies }
      logger.info({ message, metadata })

      return movies
    }

    catch(error)
    {
      const message = error.message
      const metadata = { action: "get a movie", payload: movies }
      logger.info({ message, metadata })
    }
  }
}

module.exports = MovieService
