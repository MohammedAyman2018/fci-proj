const { Router } = require('express')
const { default: auth, clientAuth } = require('../middlewares/auth')

const {
  addStore,
  getAllStores,
  deleteStore,
  getStore,
  checkIfValidated,
  validateStore,
  getStoreForEditAdmin,
  updateStore,
  rateStore,
} = require('./controller')

const router = Router()

router.get('/stores/', auth, getAllStores)
router.get('/stores/one/:storeName', getStore)
router.get('/stores/one/admin/:storeName', auth, getStoreForEditAdmin)
router.get('/stores/clint/all', getAllStores)
router.patch('/stores/:id', auth, updateStore)
router.delete('/stores/:id', auth, deleteStore)
router.post('/stores/', clientAuth, addStore)

router.patch('/stores/rate/:id', clientAuth, rateStore)

router.get('/stores/check-if-validate', clientAuth, checkIfValidated)
router.post('/stores/validate/:storeId', auth, validateStore)
module.exports = router
