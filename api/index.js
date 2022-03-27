const express = require('express')
const mongoose = require('mongoose')

const mongoSanitize = require('express-mongo-sanitize')
const xss = require('xss-clean')
const logger = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
const { clientAuth } = require('./middlewares/auth')
const { multer, uploadImage } = require('./middlewares/handleImages')

require('dotenv')
// Create express instance
const app = express()

// Middleware
app.use(xss())
app.use(mongoSanitize())
app.use(helmet())
app.use(logger('dev'))
app.use(express.json({ extended: true }))
app.use(express.urlencoded({ extended: true }))
app.use(
  cors({
    origin:
      process.env.NODE_ENV !== 'production'
        ? ['https://fci-proj.herokuapp.com/', 'http://localhost:3000/']
        : ['https://fci-proj.herokuapp.com/'],
  })
)

// connect to db
async function db() {
  await mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
}
db()

/** Upload Image */
app.post('/image', clientAuth, multer.single('file'), uploadImage)

// Require API routes
const users = require('./Users/routes')
const categories = require('./Category/routes')
const stores = require('./Store/routes')
const products = require('./Product/routes')
const orders = require('./Orders/routes')
const locations = require('./Locations/routes')
const Coupon = require('./Coupon/routes')
const ContactUs = require('./ContactUs/routes')
const home = require('./homePage')
// Import API Routes
app.use(users)
app.use(categories)
app.use(stores)
app.use(products)
app.use(orders)
app.use(locations)
app.use(home)
app.use(Coupon)
app.use(ContactUs)

// Export express app
module.exports = app

// Start standalone server if directly running
if (require.main === module) {
  const port = process.env.PORT || 3001
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`API server listening on port ${port}`)
  })
}
