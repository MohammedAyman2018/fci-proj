const { Router } = require('express')
const { default: auth, clientAuth } = require('../middlewares/auth')

const {
  getAllCategories,
  addCategory,
  getOneCategory,
  editCategory,
  deleteCategory
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


module.exports = router
