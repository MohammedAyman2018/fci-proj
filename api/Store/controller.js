
require('dotenv').config()
const { User } = require('../Users/model')
const { Order } = require('../Orders/model')
const { Product } = require('../Product/model')
const { Category } = require('../Category/model')
const { Store, validate } = require('./model')

/**
 * @description Get All Stores
 * @returns { Array } Stores
 */
exports.getAllStores = async (req, res) => {
  const query = req.query.approved ? { approved: Boolean(req.query.approved) } : {}
  await Store.find(query)
    .then(stores => res.status(200).json(stores))
    .catch(err => res.status(400).json({ msg: err.message }))
}

/**
 * @desc Get a store
 * @route GET /api/stores/me
 * @access Private
*/
exports.getStore = (req, res) => {
  Store.findOne({ title: req.params.storeName }, {
    contacts: 1,
    createdAt: 1,
    desc: 1,
    location: 1,
    otherLinks: 1,
    social: 1,
    workOn: 1,
  })
    .then(store => res.status(200).json(store))
    .catch(err => res.status(500).json({ msg: err.message, err }))
}

exports.validateStore = async (req, res) => {
  try {
    const store = await Store.findById(req.params.storeId)
    store.reviewed = true
    store.rejectMessage = req.body.message
    store.approved = req.body.approved
    if (req.body.approved) {
      const user = await User.findById(store.owner)
      user.role = 'owner'
      user.storeName = store.title
      await user.save()
    }
    await store.save()
    return res.status(200).json({ msg: 'تم تفعيل المتجر' })
  } catch (error) {
    res.status(500).json({ msg: error.message, error })
  }
}


exports.checkIfValidated = async (req, res) => {
  try {
    const store = await Store.findOne({ owner: req.user.id })
    if (store) {
      return res.status(200).json(store)
    }
    res.status(200).json(null)
  } catch (error) {
    res.status(400).json({ msg: err.message })
  }
}

/**
  * @desc  Create a Store
  * @route POST /api/stores
  * @access Public
*/
exports.addStore = async (req, res) => {
  try {
    const { error } = validate(req.body)
    if (error) { return res.status(400).send({ msg: error.details[0].message }) }
    let store = await Store.findOne({ title: req.body.title })
    if (store) { return res.status(400).json({ msg: 'هناك متجر بهذا الاسم بالفعل.' }) }

    store = new Store({ ...req.body, owner: req.user.id })
    await store.save().then(result => res.status(200).json(result))
  } catch (err) {
    res.status(400).json({ msg: err.message })
  }
}

/**
 * @param { String } userId
 * @description Updates Store
 */
exports.updateStore = async (req, res) => {
  const store = req.body
  delete req.body._id
  delete req.body.createdAt
  await Store.updateOne({ _id: req.params.id }, req.body)
  res.status(200).json(store)
}

/**
 * @param { String } userid
 * @description Deletes Store
 */
exports.deleteStore = async (req, res) => {
  try {
    await Store.findOneAndDelete({ _id: req.params.id })
    await Order.deleteMany({ storeName: req.params.storeName })
    await Product.deleteMany({ storeName: req.params.storeName })
    await Category.deleteMany({ storeName: req.params.storeName })
    await User.deleteMany({ storeName: req.params.storeName })
    res.status(200).json({ msg: 'Deleted Successfully' })
  } catch (err) {
    res.status(400).json({ msg: err.message })
  }
}
