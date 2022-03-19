const mongoose = require('mongoose')

const Joi = require('joi')

const Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  img: {
    type: String,
    required: true
  },
},
  { timestamps: true })

const Category = mongoose.model('categories', Schema)

function validate(category) {
  const categorySchema = Joi.object({
    name: Joi.string().required(),
    img: Joi.string().required(),
  })

  return categorySchema.validate(category, { abortEarly: false })
};

module.exports.categorySchema = Schema
module.exports.Category = Category
module.exports.validate = validate
