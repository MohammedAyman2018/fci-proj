const mongoose = require('mongoose')

const Joi = require('joi')

const Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  subCategory: {
    type: [{
      name: String
    }],
    default: []
  },
  storeName: {
    required: true,
    type: String
  }
},
  { timestamps: true })

const Category = mongoose.model('categories', Schema)

function validate(category) {
  const categorySchema = Joi.object({
    name: Joi.string().required(),
    subCategory: Joi.array(),
    storeName: Joi.string().required()
  })

  return categorySchema.validate(category, { abortEarly: false })
};

module.exports.categorySchema = Schema
module.exports.Category = Category
module.exports.validate = validate
