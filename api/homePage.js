const { Router } = require('express')
const { Category } = require('./Category/model')
const { Product } = require('./Product/model')
const { getDeviceType, productProjection } = require('./utils')
const router = Router()

router.get('/home', async (req, res) => {
  try {
    const query = getDeviceType(req, res)
    const mostViewedProducts = await Product.find(query, productProjection).sort({ views: -1 }).limit(10).populate('category')
    const mostOrderedProducts = await Product.find(query, productProjection).sort({ ordered: -1 }).limit(10).populate('category')
    const mostRatedProducts = await Product.find(query, productProjection).sort({ actualRating: -1 }).limit(10).populate('category')
    const categories = await Category.find().limit(10)

    // TODO: Show Offers
    res.status(200).json({ mostViewedProducts, mostOrderedProducts, mostRatedProducts, categories })
  } catch (error) {
    res.status(400).json({ msg: error })
  }

})

module.exports = router
