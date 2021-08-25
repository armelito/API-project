const RentalService = require('../services/rental')
const MovieService = require('../services/movie')
const CustomerService = require('../services/customer')

const { validate } = require('../models/Rental')
const { Movie } = require('../models/Movie')
const { Customer } = require('../models/Customer')

const httpStatus = require("../utils/httpStatus")

post = async (req, res) =>
{
  try
  {
    const { error } = validate(req.body)

    if(error) return res.status(httpStatus.BAD_REQUEST).send(error.details[0].message)

    else
    {
      const customerServiceInstance = new CustomerService()
      const customer = await customerServiceInstance.get(req.body.customerId)

      if(!customer) return res.status(httpStatus.NOT_FOUND).send('Invalid customer')

      const movieServiceInstance = new MovieService()
      const movie = await movieServiceInstance.get(req.body.movieId)

      if(!movie) return res.status(httpStatus.NOT_FOUND).send('Invalid movie')

      if(movie.numberInStock === 0) return res.status(httpStatus.BAD_REQUEST).send('Movie not in stock')

      const object =
      {
        customer:
        {
          _id: customer._id,
          name: customer.name,
          phone: customer.phone
        },
        movie:
        {
          _id: movie._id,
          title: movie.title,
          dailyRentalRate: movie.dailyRentalRate
        }
      }

      const rentalServiceInstance = new RentalService()

      const rental = await rentalServiceInstance.post(object, movie)

      return res.status(httpStatus.OK).send(rental)
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
    const rentalServiceInstance = new RentalService()

    const rentals = await rentalServiceInstance.getAll()

    if(rentals.length === 0) return res.status(httpStatus.OK).send('There is no rentals')

    return res.status(httpStatus.OK).send(rentals)
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
    const rentalServiceInstance = new RentalService()

    const rental = await rentalServiceInstance.get(req.params.id)

    if(!rental) return res.status(httpStatus.NOT_FOUND).send('Rental not found')

    return res.status(httpStatus.OK).send(rental)
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
      const customerServiceInstance = new CustomerService()
      const customer = await customerServiceInstance.get(req.body.customerId)

      if(!customer) return res.status(httpStatus.NOT_FOUND).send('Invalid customer')

      const movieServiceInstance = new MovieService()
      const movie = await movieServiceInstance.get(req.body.movieId)

      if(!movie) return res.status(httpStatus.NOT_FOUND).send('Invalid movie')

      const object =
      {
        customer:
        {
          _id: customer._id,
          name: customer.name,
          phone: customer.phone
        },
        movie:
        {
          _id: movie._id,
          title: movie.title,
          dailyRentalRate: movie.dailyRentalRate
        }
      }

      const rentalServiceInstance = new RentalService()

      const rental = await rentalServiceInstance.put(req.params.id, object)

      if(!rental) return res.status(httpStatus.NOT_FOUND).send('Rental not found')

      return res.status(httpStatus.OK).send(rental)
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
    const rentalServiceInstance = new RentalService()

    const rental = await rentalServiceInstance.del(req.params.id)

    if(!rental) return res.status(httpStatus.NOT_FOUND).send('Rental not found')

    return res.status(httpStatus.OK).send(rental)
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
