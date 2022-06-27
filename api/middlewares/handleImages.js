const path = require('path')
const cloudinary = require('cloudinary').v2
const multer = require('multer')
const sharp = require('sharp')
require('dotenv').config()

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
})

const storage = multer.diskStorage({
  destination(_req, _file, cb) {
    cb(null, path.join(__dirname, '../uploads'))
  },
  filename(_req, file, cb) {
    cb(null, file.originalname + '-' + Date.now() + '.jpg')
  }
})

const upload = multer({ storage })

async function uploadImage(req, res) {
  const compressedImage = path.join(__dirname, '../', 'uploads', `compresed-${req.file.originalname}-${new Date().getTime()}.jpeg`)
  await sharp(req.file.path).jpeg({ quality: 30 }).toFile(compressedImage, async (err, _info) =>{
    if (err) { return res.status(500).json(err) }
    await cloudinary.uploader.upload(compressedImage,
      { resource_type: 'auto', folder: 'fci' },
      function (error, result) {
        if (error) { return res.status(500).json(error) }
        return res.status(200).json([{ url: result.secure_url }])
      })
  })
}

module.exports.cloudinary = cloudinary
module.exports.uploadImage = uploadImage
module.exports.multer = upload
