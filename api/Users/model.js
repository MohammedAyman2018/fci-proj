const mongoose = require('mongoose')

const Joi = require('joi')

const Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  phone: {
    type: String,
    unique: true,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  address: {
    type: String
  },
  dob: Date,
  password: {
    type: String,
    required: true
  },
  fav: {
    type: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'dishes' }
    ],
    default: []
  },
  orders: {
    type: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'orders' }
    ],
    default: []
  },
  role: {
    type: String,
    required: true,
    default: 'client'
  },
  storeName: String
},
  { timestamps: true })

const User = mongoose.model('users', Schema)

function validate(user) {
  const userSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    role: Joi.string(),
    country: Joi.string().required(),
    address: Joi.string(),
    dob: Joi.date(),
    phone: Joi.string().required(),
    password: Joi.string().required(),
    storeName: Joi.string()
  })

  return userSchema.validate(user, { abortEarly: false })
};

module.exports.userSchema = Schema
module.exports.User = User
module.exports.validate = validate
