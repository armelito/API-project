const logger = require('../config/logger')
const { Customer } = require('../models/Customer')

class CustomerService
{
  post = async (object) =>
  {
    try
    {
      let customer = new Customer({ ...object })
      customer = await customer.save()

      const message = `Register a customer`
      const metadata = { action: `Register a customer`, payload: customer }
      logger.info({ message, metadata })

      return customer
    }

    catch(error)
    {
      const message = error.message
      const metadata = { action: `Register a customer`, payload: object }
      logger.error({ message, metadata })

      throw error
    }
  }

  getAll = async () =>
  {
    try
    {
      const customers = await Customer.find().sort('name')

      const message = `Get customers`
      const metadata = { action: `Get customers`, payload: customers }
      logger.info({ message, metadata })

      return customers
    }

    catch(error)
    {
      const message = error.message
      const metadata = { action: `Get customers`, payload: customers }
      logger.info({ message, metadata })
    }
  }

  get = async (id) =>
  {
    try
    {
      const customer = await Customer.findById(id)

      const message = `Get customer`
      const metadata = { action: `Get customer`, payload: customer }
      logger.info({ message, metadata })

      return customer
    }

    catch(error)
    {
      const message = error.message
      const metadata = { action: `Get customer`, payload: id }
      logger.info({ message, metadata })
    }
  }

  put = async (id, object) =>
  {
    try
    {
      const customer = await Customer.findByIdAndUpdate(id, object, { new: true })

      const message = `Update a customer`
      const metadata = { action: `Update a customer`, payload: customer }
      logger.info({ message, metadata })

      return customer
    }

    catch(error)
    {
      const message = error.message
      const metadata = { action: `Update a customer`, payload: object }
      logger.error({ message, metadata })

      throw error
    }
  }

  del = async (id) =>
  {
    try
    {
      const customer = await Customer.findByIdAndRemove(id)

      const message = `Remove a customer`
      const metadata = { action: `Remove a customer`, payload: customer }
      logger.info({ message, metadata })

      return customer
    }

    catch(error)
    {
      const message = error.message
      const metadata = { action: `Remove a customer`, payload: id }
      logger.error({ message, metadata })

      throw error
    }
  }
}

module.exports = CustomerService
