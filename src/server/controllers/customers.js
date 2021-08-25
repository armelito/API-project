const CustomerService = require('../services/customer')
const { validate } = require('../models/Customer')
const httpStatus = require("../utils/httpStatus")

post = async (req, res) =>
{
  try
  {
    const { error } = validate(req.body)

    if(error) return res.status(httpStatus.BAD_REQUEST).send(error.details[0].message)

    else
    {
      const object =
      {
        name: req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone
      }

      const customerServiceInstance = new CustomerService()

      const customer = await customerServiceInstance.post(object)

      return res.status(httpStatus.OK).send(customer)
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
    const customerServiceInstance = new CustomerService()

    const customers = await customerServiceInstance.getAll()

    if(customers.length === 0) return res.status(httpStatus.OK).send('There is no customers')

    return res.status(httpStatus.OK).send(customers)
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
    const customerServiceInstance = new CustomerService()

    const customer = await customerServiceInstance.get(req.params.id)

    if(!customer) return res.status(httpStatus.NOT_FOUND).send('Customer not found')

    return res.status(httpStatus.OK).send(customer)
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
      const object =
      {
        name: req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone
      }

      const customerServiceInstance = new CustomerService()

      const customer = await customerServiceInstance.put(req.params.id, object, { new: true })

      if(!customer) return res.status(httpStatus.NOT_FOUND).send('Customer not found')

      return res.status(httpStatus.OK).send(customer)
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
    const customerServiceInstance = new CustomerService()

    const customer = await customerServiceInstance.del(req.params.id)

    if(!customer) return res.status(httpStatus.NOT_FOUND).send('Customer not found')

    return res.status(httpStatus.OK).send(customer)
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
