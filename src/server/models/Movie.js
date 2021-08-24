const mongoose = require('mongoose')
const { categorySchema } = require('./Category')
const Schema = mongoose.Schema
const Joi = require('joi')

const movieSchema = new Schema(
  {
    title:
    {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 250
    },
    description:
    {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 2000
    },
    duration:
    {
      type: Number,
      required: true,
      min: 15,
      max: 250
    },
    category:
    {
      type: categorySchema,
      required: true,
    },
    numberInStock:
    {
      type: Number,
      required: true,
      min: 0,
      max: 300
    },
    dailyRentalRate:
    {
      type: Number,
      required: true,
      min: 0,
      max: 300
    }
  },
  { timestamps: true, minimize: false }
)

function validateMovie(movie)
{
  const schema = Joi.object(
    {
      title: Joi.string().min(5).max(250).required(),
      description: Joi.string().min(5).max(2000).required(),
      duration: Joi.number().min(15).max(250).required(),
      categoryId: Joi.string().required(),
      numberInStock: Joi.number().min(0).max(300).required(),
      dailyRentalRate: Joi.number().min(0).max(300).required(),
    }
  )

  return schema.validate(movie)
}

movieSchema.set('toJSON', { virtuals: true })

exports.Movie = mongoose.model('Movie', movieSchema)
exports.validate = validateMovie
