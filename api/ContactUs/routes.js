const { Router } = require('express')
const { default: auth, clientAuth } = require('../middlewares/auth')
const {
  changeComplainState,
  addComplain,
  getComplains,
  getByUser,
} = require('./controller')
const router = Router()

router.get('/contactUs', auth, getComplains)
router.post('/contactUs', clientAuth, addComplain)
router.patch('/contactUs/:id', auth, changeComplainState)
router.get('/contactUs/:id', clientAuth, getByUser)

module.exports = router
