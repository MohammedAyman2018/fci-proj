const mongoose = require('mongoose')
const Joi = require('joi')

const Schema = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
      required: true,
    },
    logo: String,
    views: { type: Number, default: 0 },
    rating: {
      type: [
        {
          userId: { ref: 'users', type: mongoose.Types.ObjectId },
          comment: String,
          rate: Number,
        },
      ],
      default: [],
    },
    actualRating: { type: Number, default: 0 },
    desc: String,
    location: {
      type: mongoose.Types.ObjectId,
      ref: 'locations',
      required: true,
    },
    contacts: {
      type: {
        tel: String,
        whats: String,
        phone: String,
        telegram: String,
        email: String,
      },
      default: {
        tel: '',
        whats: '',
        phone: '',
        telegram: '',
        email: '',
      },
    },
    workOn: {
      type: [
        {
          ref: 'categories',
          type: mongoose.Types.ObjectId,
        },
      ],
      validate: {
        validator(arr) {
          return arr.length >= 1
        },
        message: 'يجب اختيار فئة',
      },

      required: true,
    },
    social: {
      type: {
        insta: String,
        twitter: String,
        fb: String,
        yt: String,
        snap: String,
        tiktok: String,
      },
      default: {
        insta: '',
        twitter: '',
        fb: '',
        yt: '',
        snap: '',
        tiktok: '',
      },
    },
    otherLinks: {
      type: {
        link: String,
        android: String,
        apple: String,
      },
      default: {
        link: '',
        android: '',
        apple: '',
      },
    },
    approved: {
      type: Boolean,
      default: false,
    },
    rejectMessage: {
      type: String,
    },
    reviewed: {
      type: Boolean,
      default: false,
    },
    files: {
      type: [String],
      required: true,
    },
    owner: {
      type: mongoose.Types.ObjectId,
      ref: 'users',
      required: true,
    },
  },
  { timestamps: true }
)

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
      email: Joi.string(),
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
      apple: Joi.string(),
    },
    files: Joi.array(),
    owner: Joi.string(),
    rating: {
      userId: Joi.string(),
      msg: Joi.string(),
      rate: Joi.number(),
    },
    views: Joi.number(),
    actualRating: Joi.number(),
  })

  return storeSchema.validate(store, { abortEarly: false })
}

module.exports.storeSchema = Schema
module.exports.Store = Store
module.exports.validate = validate
