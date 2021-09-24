const { Rental } = require('../models/Rental')
const CRUDOperations = require('../utils/CrudOperations')
class RentalService
{
  post = async (object, movie) =>
  {
    const operation = new CRUDOperations()
    const rental = operation.POST(Rental, object, 'Post a rental', 'Post a rental')

    movie.numberInStock--
    movie.save()

    return rental
  }

  getAll = async () =>
  {
    const operation = new CRUDOperations()
    return await operation.GETALL(Rental, 'Get all rentals', 'Get all rentals')
  }

  get = async (id) =>
  {
    const operation = new CRUDOperations()
    return await operation.GET(Rental, id, `Get the rental with the given id: ${id}`, 'Get a rental')
  }

  put = async (id, object) =>
  {
    const operation = new CRUDOperations()
    return await operation.PUT(Rental, id, object, `Update the rental with the given id: ${id}`, 'Update a rental')
  }

  del = async (id) =>
  {
    const operation = new CRUDOperations()
    return await operation.DELETE(Rental, id, `Delete the rental with the given id: ${id}`, 'Delete a rental')
  }
}

module.exports = RentalService
