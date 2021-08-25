const logger = require('../config/logger')
const { Rental } = require('../models/Rental')

class RentalService
{
  post = async (object, movie) =>
  {
    try
    {
      let rental = new Rental({ ...object })
      rental = await rental.save()

      movie.numberInStock--
      movie.save()

      const message = `Register a rental`
      const metadata = { action: `Register a rental`, payload: rental }
      logger.info({ message, metadata })

      return rental
    }

    catch(error)
    {
      const message = error.message
      const metadata = { action: `Register a rental`, payload: object }
      logger.error({ message, metadata })

      throw error
    }
  }

  getAll = async () =>
  {
    try
    {
      const rentals = await Rental.find().sort('-dateOut')

      const message = `Get rentals`
      const metadata = { action: `Get rentals`, payload: rentals }
      logger.info({ message, metadata })

      return rentals
    }

    catch(error)
    {
      const message = error.message
      const metadata = { action: `Get rentals`, payload: rentals }
      logger.info({ message, metadata })
    }
  }

  get = async (id) =>
  {
    try
    {
      const rental = await Rental.findById(id)

      const message = `Get rental`
      const metadata = { action: `Get rental`, payload: rental }
      logger.info({ message, metadata })

      return customer
    }

    catch(error)
    {
      const message = error.message
      const metadata = { action: `Get rental`, payload: id }
      logger.info({ message, metadata })
    }
  }

  put = async (id, object) =>
  {
    try
    {
      const rental = await Rental.findByIdAndUpdate(id, object, { new: true })

      const message = `Update a rental`
      const metadata = { action: `Update a rental`, payload: rental }
      logger.info({ message, metadata })

      return rental
    }

    catch(error)
    {
      const message = error.message
      const metadata = { action: `Update a rental`, payload: { id, object } }
      logger.error({ message, metadata })

      throw error
    }
  }

  del = async (id) =>
  {
    try
    {
      const rental = await Rental.findByIdAndRemove(id)

      const message = `Remove a rental`
      const metadata = { action: `Remove a rental`, payload: rental }
      logger.info({ message, metadata })

      return rental
    }

    catch(error)
    {
      const message = error.message
      const metadata = { action: `Remove a rental`, payload: id }
      logger.error({ message, metadata })

      throw error
    }
  }
}

module.exports = RentalService
