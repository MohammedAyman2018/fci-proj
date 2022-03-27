const { Router } = require('express')
const { default: auth, clientAuth } = require('../middlewares/auth')

const {
  getAllCoupons,
  addCoupon,
  getOneCoupon,
  editCoupon,
  deleteCoupon
} = require('./controller')

const router = Router()

router
  .route('/coupons')
  .get(getAllCoupons)
  .post(auth, addCoupon)

router
  .route('/coupons/:id')
  .get(clientAuth, getOneCoupon)
  .patch(auth, editCoupon)
  .delete(auth, deleteCoupon)


module.exports = router
