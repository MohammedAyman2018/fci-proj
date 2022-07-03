const mongoose = require('mongoose')
const Schema = new mongoose.Schema(
  {
    msgType: {
      type: String,
      enum: ['سؤال', 'شكوى', 'اقتراح'],
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    msg: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      enum: ['بانتظار المراجعة', 'تم الرد'],
      default: 'بانتظار المراجعة',
    },
    userId: { ref: 'users', type: mongoose.Types.ObjectId },
  },
  { timestamps: true }
)
const ContactUs = mongoose.model('contactusform', Schema)

module.exports.ContactUs = ContactUs
