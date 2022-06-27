const { Router } = require('express')
const { Category } = require('./Category/model')
const { User } = require('./Users/model')
const { Product } = require('./Product/model')
const { getDeviceType, productProjection } = require('./utils')
const { clientAuth } = require('./middlewares/auth')

const router = Router()

router.get('/home', async (req, res) => {
  try {
    const query = getDeviceType(req, res)
    const mostViewedProducts = await Product.find(query, productProjection)
      .sort({ views: -1 })
      .limit(10)
      .populate('category')
    const mostOrderedProducts = await Product.find(query, productProjection)
      .sort({ ordered: -1 })
      .limit(10)
      .populate('category')
    const mostRatedProducts = await Product.find(query, productProjection)
      .sort({ actualRating: -1 })
      .limit(10)
      .populate('category')
    const mostLovedProducts = await Product.find(query, productProjection)
      .sort({ inFav: -1 })
      .limit(10)
      .populate('category')
    const categories = await Category.find().limit(10)

    // TODO: Show Offers
    res.status(200).json({
      mostViewedProducts,
      mostOrderedProducts,
      mostRatedProducts,
      categories,
      mostLovedProducts,
    })
  } catch (error) {
    res.status(400).json({ msg: error })
  }
})

router.get('/home/recommended', clientAuth, async (req, res) => {
  const currentUser = await User.findById(req.user.id)
  if (currentUser) {
    const recommendedToU = await User.find({ intersts: { $in: currentUser.intersts } }, { orders: 1 })
    .populate({
      path: 'orders',
      select: { 'items._id': 1 },
      populate: {
        path: 'items._id',
        model: 'products',
        select: productProjection
      }
   })

   const items = []

   for (let i = 0; i < recommendedToU.length; i++) {
       const orders = recommendedToU[i].orders
       for (let j = 0; j< orders.length; j++) {
       const order = orders[j]
       items.push(...order.items)
     }
    }
   const result = items.map(x => x._id)
    return res.json(result)
  }
})
module.exports = router
