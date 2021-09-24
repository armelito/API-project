const { log } = require('./Logger')

class CRUDOperations
{
  async POST(element, object, action, message)
  {
    try
    {
      let document = new element({ ...object })
      document = await document.save()

      log(message, action, document)

      return document
    }

    catch(error)
    {
      log(error.message, action, object)

      throw error
    }
  }

  async GETALL(element, action, message)
  {
    try
    {
      let document = await element.find().sort('name')

      log(message, action, document)

      return document
    }

    catch(error)
    {
      log(error.message, action, error)

      throw error
    }
  }

  async GET(element, id, action, message)
  {
    try
    {
      let document = await element.findById(id)

      log(message, action, document)

      return document
    }

    catch(error)
    {
      log(error.message, action, id)

      throw error
    }
  }

  async PUT(element, id, object, action, message)
  {
    try
    {
      let document = await element.findByIdAndUpdate(id, object, { new: true })

      log(message, action, document)

      return document
    }

    catch(error)
    {
      log(error.message, action, object)

      throw error
    }
  }

  async DELETE(element, id, action, message)
  {
    try
    {
      let document = await element.findByIdAndRemove(id)

      log(message, action, document)

      return document
    }

    catch(error)
    {
      log(error.message, action, id)

      throw error
    }
  }
}

module.exports = CRUDOperations
