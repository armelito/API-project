const logger = require('../config/logger')
const { Category } = require('../models/Category')

class CategoryService
{
  post = async (object) =>
  {
    try
    {
      let category = new Category({ ...object })
      category = await category.save()

      const message = `Register a Category`
      const metadata = { action: `Register a category`, payload: category }
      logger.info({ message, metadata })

      return category
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
      const metadata = { action: `Get categories`, payload: categories }
      logger.info({ message, metadata })
    }
  }

  get = async (id) =>
  {
    try
    {
      const category = Category.findById(id)

      const message = `Get category`
      const metadata = { action: `Get category`, payload: category }
      logger.info({ message, metadata })

      return category
    }

    catch(error)
    {
      const message = error.message
      const metadata = { action: `Get category`, payload: id }
      logger.info({ message, metadata })
    }
  }

  put = async (id, object) =>
  {
    try
    {
      const category = Category.findByIdAndUpdate(id, object, { new: true })

      const message = `Update category`
      const metadata = { action: `Update category`, payload: category }
      logger.info({ message, metadata })

      return category
    }

    catch(error)
    {
      const message = error.message
      const metadata = { action: `Update category`, payload: object }
      logger.info({ message, metadata })
    }
  }

  del = async (id) =>
  {
    try
    {
      const category = Category.findByIdAndRemove(id)

      const message = `Delete category`
      const metadata = { action: `Delete category`, payload: category }
      logger.info({ message, metadata })

      return category
    }

    catch(error)
    {
      const message = error.message
      const metadata = { action: `Delete category`, payload: id }
      logger.info({ message, metadata })
    }
  }
}

module.exports = CategoryService
