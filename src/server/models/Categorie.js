
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categorieSchema = new Schema(
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
    }
  }
)

categorieSchema.set('toJSON', { virtuals: true })

module.exports = mongoose.model('Categorie', categorieSchema)
