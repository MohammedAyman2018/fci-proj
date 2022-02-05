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
    default: 'بانتظار المراجعة'
  },
  items: {
    type: [{
      name: { type: String, required: true },
      amount: { type: Number, required: true },
      price: { type: Number, required: true },
      img: { type: String, required: true },
    }]
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

const User = mongoose.model('users', Schema)

function validate(user) {
  const userSchema = Joi.object({
    storeName: Joi.string()
  })

  return userSchema.validate(user, { abortEarly: false })
};

module.exports.userSchema = Schema
module.exports.User = User
module.exports.validate = validate
