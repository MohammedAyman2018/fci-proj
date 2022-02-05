const { Router } = require('express')
const { default: auth, clientAuth } = require('../middlewares/auth')

const {
  getAllOrders,
  addOrder,
  getOneOrder,
  editOrder,
  deleteOrder
} = require('./controller')

const router = Router()

router
  .route('/orders')
  .get(auth, getAllOrders)
  .post(clientAuth, addOrder)

router
  .route('/orders/:id')
  .get(clientAuth, getOneOrder)
  .patch(auth, editOrder)
  .delete(auth, deleteOrder)

module.exports = router
