const { Router } = require('express')
const { Product } = require('./Product/model')
const router = Router()

router.get('/home', async (req, res) => {
  const query = getDeviceType(req, res)
  const mostViewedProducts = await Product.find({ ...query, storeName: req.query.storeName }).sort({ views: 1 }).limit(10)
  const mostOrderedProducts = await Product.find({ ...query, storeName: req.query.storeName }).sort({ ordered: 1 }).limit(10)
  const mostRatedProducts = await Product.find({ ...query, storeName: req.query.storeName }).sort({ actualRating: 1 }).limit(10)

  // TODO: Show Offers
  res.status(200).json({ mostViewedProducts, mostOrderedProducts, mostRatedProducts })
})

module.exports = router
