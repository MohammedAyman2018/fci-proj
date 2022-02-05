const { Router } = require('express')
const { Product } = require('./Product/model')
const router = Router()

router.get('/home', async (req, res) => {
  const mostViewedProducts = await Product.find({ storeName: req.query.storeName }).sort({ views: 1 }).limit(10)
  const mostOrderedProducts = await Product.find({ storeName: req.query.storeName }).sort({ ordered: 1 }).limit(10)
  // TODO: Show Offers
  res.status(200).json({ mostViewedProducts, mostOrderedProducts })
})

module.exports = router