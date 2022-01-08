const mongoose = require('mongoose')
const Joi = require('joi')

const Schema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: true
  },
  logo: String,
  desc: String,
  // location: { lng: String, lat: String },
  location: { type: String, required: true },
  contacts: {
    tel: String,
    whats: String,
    phone: String,
    telegram: String,
    email: String
  },
  workOn: [String],
  social: {
    insta: String,
    twitter: String,
    fb: String,
    yt: String,
    snap: String,
    tiktok: String,
  },
  otherLinks: {
    link: String,
    android: String,
    apple: String
  },
  approved: {
    type: Boolean,
    default: false
  },
  rejectMessage: {
    type: String,
  },
  reviewed: {
    type: Boolean,
    default: false
  },
  files: {
    type: [String],
    required: true
  },
  owener: {
    type: mongoose.Types.ObjectId,
    ref: 'users',
    required: true
  }
},
  { timestamps: true })

const Store = mongoose.model('store', Schema)

function validate(store) {
  const storeSchema = Joi.object({
    title: Joi.string().required(),
    logo: Joi.string(),
    desc: Joi.string(),
    // location: { lng: Joi.string(), lat: Joi.string() },
    location: Joi.string().required(),
    contacts: {
      tel: Joi.string(),
      whats: Joi.string(),
      phone: Joi.string(),
      telegram: Joi.string(),
      email: Joi.string()
    },
    workOn: Joi.array(),
    social: {
      insta: Joi.string(),
      twitter: Joi.string(),
      fb: Joi.string(),
      yt: Joi.string(),
      snap: Joi.string(),
      tiktok: Joi.string(),
    },
    otherLinks: {
      link: Joi.string(),
      android: Joi.string(),
      apple: Joi.string()
    },
    files: Joi.array(),
  })

  return storeSchema.validate(store, { abortEarly: false })
};

module.exports.storeSchema = Schema
module.exports.Store = Store
module.exports.validate = validate
