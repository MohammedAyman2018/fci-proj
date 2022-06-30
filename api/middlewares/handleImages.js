const path = require('path')
const cloudinary = require('cloudinary').v2
const multer = require('multer')
require('dotenv').config()

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
})

const storage = multer.diskStorage({
  async destination(_req, _file, cb) {
    await cb(null, path.join(__dirname, '../uploads'))
  },
  async filename(_req, _file, cb) {
    await cb(null, Date.now() + '.jpg')
  },
  // file.originalname + '-' +
})

const upload = multer({ storage })

async function uploadImage(req, _res) {
  console.log(req.file)
  await cloudinary.uploader.upload(
    req.file.path,
    { resource_type: 'auto', folder: 'fci_test' },
    function (error, result) {
      console.log({ error, result })
    }
  )
}

module.exports.cloudinary = cloudinary
module.exports.uploadImage = uploadImage
module.exports.multer = upload
