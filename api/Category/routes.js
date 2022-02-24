const { Router } = require('express')
const { default: auth, clientAuth } = require('../middlewares/auth')

const {
  getAllCategories,
  addCategory,
  getOneCategory,
  editCategory,
  deleteCategory,
  getAllCategoriesForAllStores
} = require('./controller')

const router = Router()

router
  .route('/categories')
  .get(getAllCategories)
  .post(auth, addCategory)

router
  .route('/categories/:id')
  .get(clientAuth, getOneCategory)
  .patch(auth, editCategory)
  .delete(auth, deleteCategory)

router.get('/categories/all/stores', getAllCategoriesForAllStores)

module.exports = router
