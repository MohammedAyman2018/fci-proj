const mongoose = require('mongoose')
const Joi = require('joi')

const Schema = new mongoose.Schema({
  code: {
    type: String,
    required: true
  },
  amount: {
    type: String,
    required: true
  },
  active: {
    type: Boolean,
    default: true
  },
  usedBy: {
    type: Number,
    default: 0
  }
},
  { timestamps: true })

const Coupon = mongoose.model('coupons', Schema)

function validate(coupon) {
  const couponSchema = Joi.object({
    code: Joi.string().required(),
    amount: Joi.number().required(),
    active: Joi.boolean().required(),
    usedBy: Joi.number().required(),
  })

  return couponSchema.validate(coupon, { abortEarly: false })
};

module.exports.couponSchema = Schema
module.exports.Coupon = Coupon
module.exports.validate = validate
