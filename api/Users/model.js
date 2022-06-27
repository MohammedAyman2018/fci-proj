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
    enum: ['مصر', 'السعودية'],
    default: 'مصر'
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
      { type: mongoose.Schema.Types.ObjectId, ref: 'products' }
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
  storeName: String,
  intersts: {
    type: [
      {
        ref: 'categories',
        type: mongoose.Types.ObjectId,
        required: true,
      }
    ],
    default: []
  }
},
  { timestamps: true })

const User = mongoose.model('users', Schema)

function validate(user) {
  const userSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    role: Joi.string(),
    country: Joi.string(),
    address: Joi.string(),
    dob: Joi.date(),
    phone: Joi.string().required(),
    password: Joi.string().required(),
    storeName: Joi.string(),
    intersts: Joi.array(),
  })

  return userSchema.validate(user, { abortEarly: false })
};

module.exports.userSchema = Schema
module.exports.User = User
module.exports.validate = validate
