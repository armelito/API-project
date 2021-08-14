
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const movieSchema = new Schema(
  {
    title:
    {
      required: true,
      type: String
    },
    description:
    {
      required: true,
      type: String
    },
    duration:
    {
      required: true,
      type: Number
    },
    categories:
    {
      required: true,
      type: String
    },
    createdBy:
    {
      required: true,
      type: String
    }
  },
  { timestamps: true, minimize: false }
)

movieSchema.set('toJSON', { virtuals: true })

module.exports = mongoose.model('Movie', movieSchema)
