const mongoose = require('mongoose')

const Joi = require('joi')

const Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  lat: {
    type: String,
    required: true
  },
  lng: {
    type: String,
    required: true
  }
},
  { timestamps: true })

const Location = mongoose.model('locations', Schema)

function validate(location) {
  const locationSchema = Joi.object({
    name: Joi.string().required(),
    lat: Joi.string().required(),
    lng: Joi.string().required(),
  })

  return locationSchema.validate(location, { abortEarly: false })
};

module.exports.locationSchema = Schema
module.exports.Location = Location
module.exports.validate = validate
