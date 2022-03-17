const mongoose = require('mongoose')
const Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  msg: {
    type: String,
    required: true
  },
},
  { timestamps: true })
const ContactUs = mongoose.model('contactusform', Schema)

module.exports.ContactUs = ContactUs
