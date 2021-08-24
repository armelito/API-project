const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Joi = require('joi')

const categorySchema = new Schema(
  {
    name:
    {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50
    },
    description:
    {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 500
    }
  }
)

function validateCategory(category)
{
  const schema = Joi.object(
    {
      name: Joi.string().min(5).required(),
      description: Joi.string().min(5).required(),
    }
  )

  return schema.validate(category)
}

categorySchema.set('toJSON', { virtuals: true })

exports.categorySchema = categorySchema
exports.Category = mongoose.model('Category', categorySchema)
exports.validate = validateCategory
