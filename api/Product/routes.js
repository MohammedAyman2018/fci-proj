const { Router } = require('express')
const { default: auth, clientAuth } = require('../middlewares/auth')

const {
  getAllProducts,
  addProduct,
  getOneProduct,
  editProduct,
  deleteProduct,
  searchProductsName,
  getProductsByCategory,
  rateProduct
} = require('./controller')

const router = Router()

router
  .route('/products')
  .get(auth, getAllProducts)
  .post(auth, addProduct)

router
  .route('/products/:id')
  .get(getOneProduct)
  .patch(auth, editProduct)
  .delete(auth, deleteProduct)

router.get('/products/filter/category', getProductsByCategory)
router.get('/products/filter/name', searchProductsName)
router.post('/products/rate/:id', clientAuth, rateProduct)
module.exports = router
