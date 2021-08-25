const MovieService = require('../services/movie')
const CategoryService = require('../services/category')

const { validate } = require('../models/Movie')

const httpStatus = require("../utils/httpStatus")

post = async (req, res) =>
{
  try
  {
    const { error } = validate(req.body)

    if(error) return res.status(httpStatus.BAD_REQUEST).send(error.details[0].message)

    else
    {
      const categoryServiceInstance = new CategoryService()
      const category = await categoryServiceInstance.get(req.body.categoryId)

      if(!category) return res.status(httpStatus.BAD_REQUEST).send('Category invalide')

      else
      {
        const object =
        {
          title: req.body.title,
          description: req.body.description,
          duration: req.body.duration,
          category:
          {
            _id: category._id,
            name: category.name,
            description: category.description
          },
          numberInStock: req.body.numberInStock,
          dailyRentalRate: req.body.dailyRentalRate
        }

        const movieServiceInstance = new MovieService()

        const { movie } = await movieServiceInstance.post(object)

        return res.status(httpStatus.OK).send({ movie })
      }
    }
  }

  catch(error)
  {
    !error.status ? error.status = httpStatus.INTERNAL_SERVER_ERROR : error.status

    return res.status(error.status).send(error.message)
  }
}

getAll = async (req, res) =>
{
  try
  {
    const movieServiceInstance = new MovieService()

    const movies = await movieServiceInstance.getAll()

    if(movies.length === 0) return res.status(httpStatus.OK).send('There is no movies')

    return res.status(httpStatus.OK).send(movies)
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
    const movieServiceInstance = new MovieService()

    const movie = await movieServiceInstance.get(req.params.id)

    if(!movie) return res.status(httpStatus.NOT_FOUND).send('Movie not found')

    return res.status(httpStatus.OK).send(movie)
  }

  catch(error)
  {
    !error.status ? error.status = httpStatus.INTERNAL_SERVER_ERROR : error.status

    return res.status(error.status).send(error.message)
  }
}

put = async (req, res) =>
{
  try
  {
    const { error } = validate(req.body)

    if(error) return res.status(httpStatus.BAD_REQUEST).send(error.details[0].message)

    else
    {
      const categoryServiceInstance = new CategoryService()
      const category = await categoryServiceInstance.get(req.body.categoryId)

      if(!category) return res.status(httpStatus.BAD_REQUEST).send('Category invalide')

      else
      {
        const object =
        {
          title: req.body.title,
          description: req.body.description,
          duration: req.body.duration,
          category:
          {
            _id: category._id,
            name: category.name
          },
          numberInStock: req.body.numberInStock,
          dailyRentalRate: req.body.dailyRentalRate
        }

        const movieServiceInstance = new MovieService()

        const movie = await movieServiceInstance.put(req.params.id, object)

        if(!movie) return res.status(httpStatus.NOT_FOUND).send('Movie not found')

        else
        {
          return res.status(httpStatus.OK).send(movie)
        }
      }
    }
  }

  catch(error)
  {
    !error.status ? error.status = httpStatus.INTERNAL_SERVER_ERROR : error.status

    return res.status(error.status).send(error.message)
  }
}

del = async (req, res) =>
{
  try
  {
    const movieServiceInstance = new MovieService()

    const movie = await movieServiceInstance.del(req.params.id)

    if(!movie) return res.status(httpStatus.NOT_FOUND).send('Movie not found')

    return res.status(httpStatus.OK).send(movie)
  }

  catch(error)
  {
    !error.status ? error.status = httpStatus.INTERNAL_SERVER_ERROR : error.status

    return res.status(error.status).send(error.message)
  }
}


module.exports =
{
  post,
  getAll,
  get,
  put,
  del
}
