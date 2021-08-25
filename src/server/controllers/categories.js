const CategoryService = require('../services/category')
const { validate } = require('../models/Category')
const httpStatus = require('../utils/httpStatus')

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
        description: req.body.description
      }

      const categoryServiceInstance = new CategoryService()

      const category = await categoryServiceInstance.post(object)

      return res.status(httpStatus.OK).send(category)
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
    const categoryServiceInstance = new CategoryService()

    const categories = await categoryServiceInstance.getAll()

    if(categories.length === 0) return res.status(httpStatus.OK).send('There is no categories')

    return res.status(httpStatus.OK).send(categories)
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
    const categoryServiceInstance = new CategoryService()

    const category = await categoryServiceInstance.get(req.params.id)

    if(!category) return res.status(httpStatus.NOT_FOUND).send('Category not found')

    return res.status(httpStatus.OK).send(category)
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
        description: req.body.description
      }

      const categoryServiceInstance = new CategoryService()

      const category = await categoryServiceInstance.put(req.params.id, object, { new: true })

      if(!category) return res.status(httpStatus.NOT_FOUND).send('Category not found')

      return res.status(httpStatus.OK).send(category)
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
    const categoryServiceInstance = new CategoryService()

    const category = await categoryServiceInstance.del(req.params.id)

    if(!category) return res.status(httpStatus.NOT_FOUND).send('Category not found')

    return res.status(httpStatus.OK).send(category)
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
