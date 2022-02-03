const { Router } = require('express')
const { default: auth, clientAuth } = require('../middlewares/auth')

const {
  getAllProducts,
  addProduct,
  getOneProduct,
  editProduct,
  deleteProduct,
  searchProductsName,
  getProductsByCategory
} = require('./controller')

const router = Router()

router
  .route('/products')
  .get(auth, getAllProducts)
  .post(auth, addProduct)

router
  .route('/products/:id')
  .get(clientAuth, getOneProduct)
  .patch(auth, editProduct)
  .delete(auth, deleteProduct)

router.get('/products/filter/category', getProductsByCategory)
router.get('/products/filter/name', searchProductsName)

module.exports = router
