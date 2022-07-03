const { Router } = require('express')

const { Category } = require('./Category/model')
const { Order } = require('./Orders/model')
const { User } = require('./Users/model')
const { productProjection, getDeviceType } = require('./utils')
const { Store } = require('./Store/model')
const { Product } = require('./Product/model')
const { clientAuth } = require('./middlewares/auth')

const router = Router()

router.post('/dashboadrd/orders/:storeName', async (req, res) => {
  try {
    const OrderRange = await Order.find({
      storeName: req.params.storeName,
      createdAt: {
        $gte: new Date('2022-03-14').toISOString(),
        $lte: new Date('2022-03-16').toISOString(),
      },
    })
    return res.status(200).json(OrderRange)
  } catch (error) {
    res.status(400).json({ msg: error })
  }
})
router.get('/dashboadrd/:storeName', async (req, res) => {
  try {
    const store = await Store.findOne({ title: req.params.storeName }).populate(
      'workOn'
    )
    const productsPerCategoryCount = {}
    for (let i = 0; i < store.workOn.length; i++) {
      const category = store.workOn[i]
      const num = await Product.countDocuments({
        storeName: req.params.storeName,
        category: category._id,
      })
      productsPerCategoryCount[category.name] = num
    }

    const productsViews = await Product.aggregate([
      {
        $match: { storeName: req.params.storeName },
      },
      {
        $group: {
          _id: '$storeName',
          totalViews: {
            $sum: '$views',
          },
        },
      },
    ])

    const mostViewedProducts = await Product.find(
      {
        storeName: req.params.storeName,
      },
      productProjection
    )
      .sort({ views: -1 })
      .limit(5)
    const mostOrderedProducts = await Product.find(
      {
        storeName: req.params.storeName,
      },
      productProjection
    )
      .sort({ ordered: -1 })
      .limit(5)
    const highestRatedProducts = await Product.find(
      {
        storeName: req.params.storeName,
      },
      productProjection
    )
      .sort({ actualRating: -1 })
      .limit(5)

    const productsAboutToFinish = await Product.aggregate([
      {
        $match: {
          storeName: req.params.storeName,
          'amount.amountType': 'limited',
          'amount.alarm': true,
        },
      },
      {
        $redact: {
          $cond: {
            if: {
              $lt: ['$amount.alarmAmount', '$amount.available'],
            },
            then: '$$KEEP',
            else: '$$PRUNE',
          },
        },
      },
      { $project: productProjection },
    ])

    res.status(200).json({
      productsPerCategoryCount,
      productsViews,
      mostViewedProducts,
      mostOrderedProducts,
      highestRatedProducts,
      productsAboutToFinish,
    })
  } catch (error) {
    res.status(400).json({ msg: error })
  }
})

router.get('/home', async (req, res) => {
  try {
    const query = getDeviceType(req, res)
    const mostViewedProducts = await Product.find(query, productProjection)
      .sort({ views: -1, hasOffer: -1 })
      .limit(10)
      .populate('category')
    const mostOrderedProducts = await Product.find(query, productProjection)
      .sort({ ordered: -1, hasOffer: -1 })
      .limit(10)
      .populate('category')
    const mostRatedProducts = await Product.find(query, productProjection)
      .sort({ actualRating: -1, hasOffer: -1 })
      .limit(10)
      .populate('category')
    const mostLovedProducts = await Product.find(query, productProjection)
      .sort({ inFav: -1, hasOffer: -1 })
      .limit(10)
      .populate('category')
    const categories = await Category.find().limit(10)

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
    const recommendedToU = await User.find(
      { intersts: { $in: currentUser.intersts } },
      { orders: 1 }
    ).populate({
      path: 'orders',
      select: { 'items._id': 1 },
      populate: {
        path: 'items._id',
        model: 'products',
        select: productProjection,
      },
    })

    const items = []

    for (let i = 0; i < recommendedToU.length; i++) {
      const orders = recommendedToU[i].orders
      for (let j = 0; j < orders.length; j++) {
        const order = orders[j]
        items.push(...order.items)
      }
    }
    const result = items.map((x) => x._id)
    return res.json(result)
  }
})
module.exports = router
