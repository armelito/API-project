const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Joi = require('joi')

const customerSchema = new Schema(
  {
    name:
    {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50
    },
    isGold:
    {
      type: Boolean,
      default: false
    },
    phone:
    {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50
    }
  }
)

function validateCustomer(customer)
{
  const schema = Joi.object(
    {
      name: Joi.string().min(5).max(50).required(),
      phone: Joi.string().min(5).max(50).required(),
      isGold: Joi.boolean()
    }
  )

  return schema.validate(customer)
}

customerSchema.set('toJSON', { virtuals: true })

exports.Customer = mongoose.model('Customer', customerSchema)
exports.validate = validateCustomer
