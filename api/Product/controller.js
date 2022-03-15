import { getDeviceType } from '../utils'

const { Product, validate } = require('./model')

const productProjection = {
  visible: 0,
  rating: 0,
  updatedAt: 0,
  createdAt: 0,
  desc: 0,
  'amount.alarm': 0,
  'amount.alarmAmount': 0,
  'amount._id': 0,
  views: 0,
  __v: 0,
  ordered: 0,
}
export const getAllProducts = async (req, res) => {
  try {
    const query = getDeviceType(req, res)
    const products = await Product.find({ ...query, storeName: req.query.storeName }, req.get('admin') ? {} : productProjection).populate('category')
    res.status(200).json(products)
  } catch (err) {
    res.status(400).json({ msg: err.message })
  }
}

export const getAllProductsForAllStores = async (req, res) => {
  try {
    const query = getDeviceType(req, res)
    const products = await Product.find(query, productProjection).populate('category')
    res.status(200).json(products)
  } catch (err) {
    res.status(400).json({ msg: err.message })
  }
}


export const addProduct = async (req, res) => {
  try {
    const { error } = validate(req.body)
    if (error) { return res.status(400).send({ msg: error.details[0].message }) }
    const product = await Product.create(req.body)
    res.status(200).json(product)
  } catch (err) {
    res.status(400).json({ msg: err.message })
  }
}

export const getOneProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('category')
    product.views++
    await product.save()
    res.status(200).json(product)
  } catch (err) {
    res.status(400).json({ msg: err.message })
  }
}

export const editProduct = async (req, res) => {
  delete req.body._id
  delete req.body.createdAt
  const product = await Product.updateOne({ _id: req.params.id }, req.body)
  return res.status(200).json(product)
}

export const deleteProduct = async (req, res) => {
  try {
    await Product.findOneAndDelete({ _id: req.params.id })
    res.status(200).json({ msg: 'Deleted Successfully' })
  } catch (err) {
    res.status(400).json({ msg: err.message })
  }
}

export const getProductsByCategory = async (req, res) => {
  try {
    const query = getDeviceType(req, res)
    const products = await Product.find({ ...query, category: req.query.categoryId })
    res.status(200).json({ products })
  } catch (err) {
    res.status(400).json({ msg: err.message })
  }
}

export const searchProductsName = async (req, res) => {
  try {
    const query = getDeviceType(req, res)
    const text = req.query.text.replace(/-/g, ' ')
    const products = await Product.find({
      ...query,
      $or: [
        { 'title': { $regex: text, $options: 'i' } },
        { 'desc': { $regex: text, $options: 'i' } },
      ]
    })
    res.status(200).json({ products })
  } catch (err) {
    res.status(400).json({ msg: err.message })
  }
}

export const rateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (req.body.rate > 5) req.body.rate = 5
    if (product) {
      let userRatedBefore = product.rating.find(rate => rate.userId === req.body.userId)
      if (userRatedBefore) {
        userRatedBefore.rate = req.body.rate
      } else {
        userRatedBefore = req.body
        product.rating.push(userRatedBefore)
      }
      product.actualRating = calcRating(product.rating)
      await product.save()
      res.status(200).json({ rate: product.actualRating })
    }
  } catch (error) {
    res.status(400).json({ msg: error.message })
  }
}

function calcRating(rating) {
  console.log(rating)
  let sd = 0
  rating.forEach(el => {
    sd += el.rate
  });
  return sd / rating.length
}
