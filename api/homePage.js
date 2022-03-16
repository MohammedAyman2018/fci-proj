const { Router } = require('express')
const { Product } = require('./Product/model')
const { getDeviceType, productProjection } = require('./utils')
const router = Router()

router.get('/home', async (req, res) => {
  try {
    const query = getDeviceType(req, res)
    if (!req.query.storeName) return res.status(400).json({ msg: 'Provide Store Name query' })
    const mostViewedProducts = await Product.find({ ...query, storeName: req.query.storeName }, productProjection).populate('category').sort({ views: 1 }).limit(10)
    const mostOrderedProducts = await Product.find({ ...query, storeName: req.query.storeName }, productProjection).populate('category').sort({ ordered: 1 }).limit(10)
    const mostRatedProducts = await Product.find({ ...query, storeName: req.query.storeName }, productProjection).populate('category').sort({ actualRating: 1 }).limit(10)

    // TODO: Show Offers
    res.status(200).json({ mostViewedProducts, mostOrderedProducts, mostRatedProducts })
  } catch (error) {
    res.status(400).json({ msg: error })
  }

})

module.exports = router
