const mongoose = require('mongoose')

const Joi = require('joi')

const Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  images: {
    type: [String],
    required: true,
    validate: {
      validator(arr) {
        return arr.length >= 1 && arr.length <= 6
      },
      message: 'تأكد من أن عدد الصور بين 1 و 6'
    }
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: [{
      ref: 'categories',
      type: mongoose.Types.ObjectId
    }],
    required: true,
    validate: {
      validator(arr) {
        return arr.length >= 1
      },
      message: 'يجب اختيار فئة واحدة على الأقل'
    }
  },
  amount: {
    amountType: {
      type: String,
      enum: ['limited', 'unlimited'],
      required: true
    },
    available: {
      type: Number
    },
    alarm: {
      type: Boolean,
      default: false
    },
    alarmAmount: Number
  },
  url: String,
  views: {
    type: Number,
    default: 0
  },
  visible: {
    store: { type: Boolean, default: true },
    app: { type: Boolean, default: true }
  },

  storeName: {
    required: true,
    type: String
  }
},
  { timestamps: true })

const Product = mongoose.model('products', Schema)

function validate(product) {
  const productSchema = Joi.object({
    name: Joi.string().required(),
    images: Joi.array().min(1).max(6).required(),
    price: Joi.number().required(),
    category: Joi.array().min(1).required(),
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
    storeName: Joi.string().required()
  })

  return productSchema.validate(product, { abortEarly: false })
};

module.exports.productSchema = Schema
module.exports.Product = Product
module.exports.validate = validate
