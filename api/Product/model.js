const mongoose = require('mongoose')

const Joi = require('joi')

const Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      required: true,
      validate: {
        validator(arr) {
          return arr.length >= 1 && arr.length <= 6
        },
        message: 'تأكد من أن عدد الصور بين 1 و 6',
      },
    },
    price: {
      type: Number,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    category: {
      ref: 'categories',
      type: mongoose.Types.ObjectId,
      required: true,
    },
    amount: {
      type: {
        amountType: {
          type: String,
          enum: ['limited', 'unlimited'],
          required: true,
        },
        available: {
          type: Number,
        },
        alarm: {
          type: Boolean,
          default: false,
        },
        alarmAmount: Number,
      },
    },
    url: String,
    views: {
      type: Number,
      default: 0,
    },
    visible: {
      type: {
        store: { type: Boolean, default: true },
        app: { type: Boolean, default: true },
      },
      default: {
        store: true,
        app: true,
      },
    },
    rating: {
      type: [
        {
          userId: { ref: 'users', type: mongoose.Types.ObjectId },
          comment: String,
          rate: { type: Number, required: true },
        },
      ],
      default: [],
    },
    actualRating: { type: Number, default: 0 },
    inFav: {
      type: Number,
      default: 0,
    },
    ordered: {
      type: Number,
      default: 0,
    },
    storeName: {
      required: true,
      type: String,
    },
  },
  { timestamps: true }
)

const Product = mongoose.model('products', Schema)

function validate(product) {
  const productSchema = Joi.object({
    name: Joi.string().required(),
    images: Joi.array().min(1).max(6).required(),
    category: Joi.required(),
    price: Joi.number().required(),
    desc: Joi.string().required(),
    rating: { userId: Joi.string(), comment: Joi.string(), rate: Joi.number() },
    rate: Joi.number(),
    ordered: Joi.number(),
    amount: {
      amountType: Joi.string(),
      available: Joi.number(),
      alarm: Joi.boolean(),
      alarmAmount: Joi.number(),
    },
    url: Joi.string(),
    views: Joi.number(),
    visible: {
      store: Joi.boolean(),
      app: Joi.boolean(),
    },
    storeName: Joi.string().required(),
  })

  return productSchema.validate(product, { abortEarly: false })
}

module.exports.productSchema = Schema
module.exports.Product = Product
module.exports.validate = validate
