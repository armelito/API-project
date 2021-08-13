const MovieService = require('../services/movieServices')
const httpStatus = require("../utils/httpStatus")

createMovie = async (req, res) =>
{
  try
  {
    const movieObject =
    {
      title: req.body.title,
      description: req.body.description,
      duration: req.body.duration,
      genre: req.body.genre,
      createdBy: req.body.createdBy
    }

    const movieServiceInstance = new MovieService()

    const { newMovie } = await movieServiceInstance.register(movieObject)

    return res.status(httpStatus.OK).send({ newMovie })
  }

  catch(error)
  {
    !error.status ? error.status = httpStatus.INTERNAL_SERVER_ERROR : error.status

    return res.status(error.status).send(error.message)
  }
}

getMovies = async (req, res) =>
{
  try
  {
    const movieServiceInstance = new MovieService()

    const movies = await movieServiceInstance.get()

    return res.status(httpStatus.OK).send(movies)
  }

  catch(error)
  {
    !error.status ? error.status = httpStatus.INTERNAL_SERVER_ERROR : error.status

    return res.status(error.status).send(error.message)
  }
}


module.exports =
{
  createMovie,
  getMovies
}
