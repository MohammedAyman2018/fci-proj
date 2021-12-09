const { Router } = require('express')
const { default: auth, clientAuth } = require('../middlewares/auth')

const {
  getAllCategories,
  addCategory,
  getOneCategory,
  editCategory,
  getCategoriesForRestaurant,
  deleteCategory
} = require('./controller')

const router = Router()

router
  .route('/categories')
  .get(auth, getAllCategories)
  .post(auth, addCategory)

router
  .route('/categories/:id')
  .get(clientAuth, getOneCategory)
  .patch(auth, editCategory)
  .delete(auth, deleteCategory)

router.get('/categories/filter/:restaurantId', auth, getCategoriesForRestaurant)
module.exports = router
