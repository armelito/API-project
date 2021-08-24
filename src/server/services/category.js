const logger = require('../config/logger')
const { Category } = require('../models/Category')

class CategoryService
{
  post = async (object) =>
  {
    try
    {
      const category = await Category.create({ ...object })

      const message = `Register a Category`
      const metadata = { action: `Register a category`, payload: category }
      logger.info({ message, metadata })

      return { category }
    }

    catch(error)
    {
      const message = error.message
      const metadata = { action: `Register a category`, payload: object }
      logger.error({ message, metadata })

      throw error
    }
  }

  getAll = async () =>
  {
    try
    {
      const categories = await Category.find().sort('name')

      const message = `Get categories`
      const metadata = { action: `Get categories`, payload: categories }
      logger.info({ message, metadata })

      return categories
    }

    catch(error)
    {
      const message = error.message
      const metadata = { action: `Get ${document}`, payload: categories }
      logger.info({ message, metadata })
    }
  }

  get = async (id) =>
  {
    try
    {
      const category = Category.findById(id)

      const message = `Get categories`
      const metadata = { action: `Get categories`, payload: category }
      logger.info({ message, metadata })

      return category
    }

    catch(error)
    {
      const message = error.message
      const metadata = { action: `Get ${document}`, payload: category }
      logger.info({ message, metadata })
    }
  }

  put = async (id, object) =>
  {
    try
    {
      const category = Category.findByIdAndUpdate(id, object, { new: true })

      const message = `Get categories`
      const metadata = { action: `Get categories`, payload: category }
      logger.info({ message, metadata })

      return category
    }

    catch(error)
    {
      const message = error.message
      const metadata = { action: `Get ${document}`, payload: category }
      logger.info({ message, metadata })
    }
  }

  del = async (id) =>
  {
    try
    {
      const category = Category.findByIdAndRemove(id)

      const message = `Get categories`
      const metadata = { action: `Get categories`, payload: category }
      logger.info({ message, metadata })

      return category
    }

    catch(error)
    {
      const message = error.message
      const metadata = { action: `Get ${document}`, payload: category }
      logger.info({ message, metadata })
    }
  }
}

module.exports = CategoryService
