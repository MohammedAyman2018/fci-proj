const { Router } = require('express')
const { default: auth, clientAuth } = require('../middlewares/auth')

const {
  addStore,
  getAllStores,
  deleteStore,
  getStore,
  checkIfValidated,
  validateStore,
  updateStore
} = require('./controller')

const router = Router()

router.get('/stores/', auth, getAllStores)
router.get('/stores/one/:id', auth, getStore)
router.patch('/stores/:id', clientAuth, updateStore)
router.delete('/stores/:id', auth, deleteStore)
router.post('/stores/', clientAuth, addStore)

router.get('/stores/check-if-validate', clientAuth, checkIfValidated)
router.post('/stores/validate/:storeId', auth, validateStore)
module.exports = router
