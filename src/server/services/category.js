const { Category } = require('../models/Category')
const CRUDOperations = require('../utils/CrudOperations')
class CategoryService
{
  post = async (object) =>
  {
    const operation = new CRUDOperations()
    return await operation.POST(Category, object, 'Post a category', 'Post a category')
  }

  getAll = async () =>
  {
    const operation = new CRUDOperations()
    return await operation.GETALL(Category, 'Get all categories', 'Get all categories')
  }

  get = async (id) =>
  {
    const operation = new CRUDOperations()
    return await operation.GET(Category, id, `Get the category with the given id: ${id}`, 'Get a category')
  }

  put = async (id, object) =>
  {
    const operation = new CRUDOperations()
    return await operation.PUT(Category, id, object, `Update the category with the given id: ${id}`, 'Update a category')
  }

  del = async (id) =>
  {
    const operation = new CRUDOperations()
    return await operation.DELETE(Category, id, `Delete the category with the given id: ${id}`, 'Delete a category')
  }
}

module.exports = CategoryService
