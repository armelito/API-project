const { Customer } = require('../models/Customer')
const CRUDOperations = require('../utils/CrudOperations')
class CustomerService
{
  post = async (object) =>
  {
    const operation = new CRUDOperations()
    return await operation.POST(Customer, object, 'Post a customer', 'Post a customer')
  }

  getAll = async () =>
  {
    const operation = new CRUDOperations()
    return await operation.GETALL(Customer, 'Get all customers', 'Get all customers')
  }

  get = async (id) =>
  {
    const operation = new CRUDOperations()
    return await operation.GET(Customer, id, `Get the customer with the given id: ${id}`, 'Get a customer')
  }

  put = async (id, object) =>
  {
    const operation = new CRUDOperations()
    return await operation.PUT(Customer, id, object, `Update the customer with the given id: ${id}`, 'Update a customer')
  }

  del = async (id) =>
  {
    const operation = new CRUDOperations()
    return await operation.DELETE(Customer, id, `Delete the customer with the given id: ${id}`, 'Delete a customer')
  }
}

module.exports = CustomerService
