const MovieService = require('../services/movieServices')
const Movie = require('../models/Movie')
const Categorie = require('../models/Categorie')
const httpStatus = require("../utils/httpStatus")
const compareUrl = require('../utils/compareUrl')

register = async (req, res) =>
{
  try
  {
    let object = {}
    let document

    if(compareUrl(req, '/api/movies'))
    {
      document = Movie

      object =
      {
        title: req.body.title,
        description: req.body.description,
        duration: req.body.duration,
        categories: req.body.categories,
        createdBy: req.body.createdBy
      }
    }

    if(compareUrl(req, '/api/movies/categories'))
    {
      document = Categorie

      object =
      {
        title: req.body.title,
        description: req.body.description
      }
    }

    const movieServiceInstance = new MovieService()

    const { element } = await movieServiceInstance.register({object, document})

    return res.status(httpStatus.OK).send({ element })
  }

  catch(error)
  {
    !error.status ? error.status = httpStatus.INTERNAL_SERVER_ERROR : error.status

    return res.status(error.status).send(error.message)
  }

}

get = async (req, res) =>
{
  try
  {
    let document

    if(compareUrl(req, '/api/movies'))
      document = Movie

    if(compareUrl(req, '/api/movies/categories'))
      document = Categorie

    const movieServiceInstance = new MovieService()

    const movies = await movieServiceInstance.get(document)

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
  register,
  get
}
