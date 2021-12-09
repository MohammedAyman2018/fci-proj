const path = require('path')
const cloudinary = require('cloudinary').v2
const multer = require('multer')
require('dotenv').config()

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
})

const storage = multer.diskStorage({
  destination (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads'))
  },
  filename (req, file, cb) {
    cb(null, file.originalname + '-' + Date.now() + '.jpg')
  }
})

const upload = multer({ storage })

async function uploadImage (req, res) {
  await cloudinary.uploader.upload(req.file.path,
    { resource_type: 'auto', folder: 'phill burger' },
    function (error, result) {
      if (error) { return res.status(400).json(error) }
      return res.status(200).json(result.secure_url)
    })
}

module.exports.cloudinary = cloudinary
module.exports.uploadImage = uploadImage
module.exports.multer = upload
