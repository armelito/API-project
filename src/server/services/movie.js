const { Movie } = require('../models/Movie')
const CRUDOperations = require('../utils/CrudOperations')
class MovieService
{
  post = async (object) =>
  {
    const operation = new CRUDOperations()
    return await operation.POST(Movie, object, 'Post a movie', 'Post a movie')
  }

  getAll = async () =>
  {
    const operation = new CRUDOperations()
    return await operation.GETALL(Movie, 'Get all movies', 'Get all movies')
  }

  get = async (id) =>
  {
    const operation = new CRUDOperations()
    return await operation.GET(Movie, id, `Get the movie with the given id: ${id}`, 'Get a movie')
  }

  put = async (id, object) =>
  {
    const operation = new CRUDOperations()
    return await operation.PUT(Movie, id, object, `Update the movie with the given id: ${id}`, 'Update a movie')
  }

  del = async (id) =>
  {
    const operation = new CRUDOperations()
    return await operation.DELETE(Movie, id, `Delete the movie with the given id: ${id}`, 'Delete a movie')
  }
}

module.exports = MovieService
