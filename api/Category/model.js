const mongoose = require('mongoose')

const Joi = require('joi')

const Schema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  restaurant: {
    ref: 'restaurants',
    required: true,
    type: mongoose.Schema.Types.ObjectId
  }
},
{ timestamps: true })

const Category = mongoose.model('categories', Schema)

function validate (category) {
  const categorySchema = Joi.object({
    title: Joi.string().required(),
    restaurant: Joi.string().required()
  })

  return categorySchema.validate(category, { abortEarly: false })
};

module.exports.categorySchema = Schema
module.exports.Category = Category
module.exports.validate = validate
