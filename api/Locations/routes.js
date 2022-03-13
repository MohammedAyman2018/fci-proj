const { Router } = require('express')
const { default: auth, clientAuth } = require('../middlewares/auth')

const {
  addLocation,
  getOneLocation,
  editLocation,
  deleteLocation,
  getAllLocations
} = require('./controller')

const router = Router()

router
  .route('/locations')
  .get(getAllLocations)
  .post(auth, addLocation)

router
  .route('/locations/:id')
  .get(clientAuth, getOneLocation)
  .patch(auth, editLocation)
  .delete(auth, deleteLocation)


module.exports = router
