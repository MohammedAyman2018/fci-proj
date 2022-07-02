import { getDeviceType, productProjection, storeProjection } from '../utils'
require('dotenv').config()
const { User } = require('../Users/model')
const { Order } = require('../Orders/model')
const { Product } = require('../Product/model')
const { Store, validate } = require('./model')

/**
 * @description Get All Stores
 * @returns { Array } Stores
 */
exports.getAllStores = async (req, res) => {
  const query = req.query.approved
    ? { approved: Boolean(req.query.approved) }
    : {}
  await Store.find(query)
    .populate('workOn')
    .populate('location')
    .then((stores) => res.status(200).json(stores))
    .catch((err) => res.status(400).json({ msg: err.message }))
}

exports.getStoreForEditAdmin = async (req, res) => {
  try {
    const store = await Store.findOne({ title: req.params.storeName })
    return res.status(200).json(store)
  } catch (error) {
    res.status(500).json({ msg: err.message, err })
  }
}

/**
 * @desc Get a store
 * @route GET /api/stores/me
 * @access Private
 */
exports.getStore = async (req, res) => {
  try {
    const store = await Store.findOne(
      { title: req.params.storeName },
      storeProjection
    )
      .populate('workOn')
      .populate('location')

    const query = getDeviceType(req, res)
    const products = await Product.find(
      { ...query, storeName: req.params.storeName },
      req.get('admin') ? {} : productProjection
    ).populate('category')

    return res.status(200).json({ store, products })
  } catch (error) {
    return res.status(500).json({ msg: error.message, error })
  }
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
    if (error) {
      return res.status(400).send({ msg: error.details[0].message })
    }
    let store = await Store.findOne({ title: req.body.title })
    if (store) {
      return res.status(400).json({ msg: 'هناك متجر بهذا الاسم بالفعل.' })
    }
    const user = await User.findById(req.user.id)
    store = new Store({
      ...req.body,
      contacts: { phone: user.phone },
      owner: req.user.id,
    })
    store
      .save()
      .then((result) => res.status(200).json(result))
      .catch((err) => res.status(500).json(err))
  } catch (err) {
    res.status(400).json({ msg: err.message })
  }
}

/**
 * @param { String } userId
 * @description Updates Store
 */
exports.updateStore = async (req, res) => {
  try {
    const store = req.body
    if (req.body._id) delete req.body._id
    if (req.body.createdAt) delete req.body.createdAt
    await Store.updateOne({ title: req.query.storeName }, req.body)
    if (req.body.title) {
      await Order.updateMany(
        { storeName: req.query.storeName },
        { storeName: req.body.title }
      )
      await Product.updateMany(
        { storeName: req.query.storeName },
        { storeName: req.body.title }
      )
      await User.updateMany(
        { storeName: req.query.storeName },
        { storeName: req.body.title }
      )
    }
    return res.status(200).json(store)
  } catch (error) {
    res.status(400).json({ msg: error.message })
  }
}

/**
 * @param { String } userid
 * @description Deletes Store
 */
exports.deleteStore = async (req, res) => {
  try {
    await Store.findOneAndDelete({ _id: req.params.id })
    await Order.deleteMany({ storeName: req.query.storeName })
    await Product.deleteMany({ storeName: req.query.storeName })
    await User.deleteMany({ storeName: req.query.storeName })
    res.status(200).json({ msg: 'Deleted Successfully' })
  } catch (err) {
    res.status(400).json({ msg: err.message })
  }
}

export const rateStore = async (req, res) => {
  try {
    const store = await Store.findById(req.params.id)
    if (req.body.rate > 5) req.body.rate = 5
    if (store) {
      let userRatedBefore = store.rating.find(
        (rate) => rate.userId === req.body.userId
      )
      if (userRatedBefore) {
        userRatedBefore.rate = req.body.rate
        userRatedBefore.comment = req.body.comment
      } else {
        userRatedBefore = req.body
        store.rating.push(userRatedBefore)
      }
      store.actualRating = calcRating(store.rating)
      await store.save()
      res.status(200).json({ rate: store.actualRating })
    }
  } catch (error) {
    res.status(400).json({ msg: error.message })
  }
}

function calcRating(rating) {
  let sd = 0
  rating.forEach((el) => {
    sd += el.rate
  })
  return sd / rating.length
}
