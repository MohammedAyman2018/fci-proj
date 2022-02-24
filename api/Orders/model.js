const mongoose = require('mongoose')

const Joi = require('joi')

const Schema = new mongoose.Schema({
  state: {
    enum: [
      'جاري التوصيل',
      'قيد التنفيذ',
      'تم التنفيذ',
      'بانتظار المراجعة',
      'تم التوصيل',
      'تم الشحن',
      'ملغي',
      'مسترجع',
      'قيد الاسترجاع',
    ],
    type: String,
    default: 'بانتظار المراجعة'
  },
  items: {
    type: [{
      name: { type: String, required: true },
      amount: { type: Number, required: true },
      price: { type: Number, required: true },
      img: { type: String, required: true },
    }],
    required: true
  },
  user: {
    name: { type: String, required: true },
    tel: { type: String, required: true },
    address: { type: String, required: true },
    payment: { type: String, required: true },
  },
  storeName: String
},
  { timestamps: true })

const Order = mongoose.model('orders', Schema)

function validate(order) {
  const orderSchema = Joi.object({
    state: Joi.string(),
    items: Joi.array(),
    user: {
      name: Joi.string(),
      tel: Joi.string(),
      address: Joi.string(),
      payment: Joi.string(),
    },
    storeName: Joi.string()
  })

  return orderSchema.validate(order, { abortEarly: false })
};

module.exports.orderSchema = Schema
module.exports.Order = Order
module.exports.validate = validate
