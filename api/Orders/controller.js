const { Product } = require('../Product/model')
const { User } = require('../Users/model')
const { Order, validate } = require('./model')

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({ storeName: req.query.storeName })
    res.status(200).json(orders)
  } catch (err) {
    res.status(400).json({ msg: err.message })
  }
}


export const addOrder = async (req, res) => {
  try {
    const { error } = validate(req.body)
    if (error) { return res.status(400).send({ msg: error.details[0].message }) }
    const order = await Order.create(req.body)
    const user = await User.findById(req.user.id)
    user.orders.push(order._id)
    for (let i = 0; i < req.body.items.length; i++) {
      const item = req.body.items[i];
      const productInDb = await Product.findById(item._id)
      productInDb.ordered++
      if (productInDb.amount && productInDb.amount.amountType === 'limited') {
        productInDb.amount.available -= item.amount
      }
      await productInDb.save()
    }
    await user.save()
    return res.status(200).json(order)
  } catch (err) {
    res.status(400).json({ msg: err.message })
  }
}

export const getOneOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
    res.status(200).json(order)
  } catch (err) {
    res.status(400).json({ msg: err.message })
  }
}

export const editOrder = async (req, res) => {
  delete req.body._id
  delete req.body.createdAt
  const order = await Order.updateOne({ _id: req.params.id }, req.body)
  return res.status(200).json(order)
}

export const deleteOrder = async (req, res) => {
  try {
    await Order.findOneAndDelete({ _id: req.params.id })
    res.status(200).json({ msg: 'Deleted Successfully' })
  } catch (err) {
    res.status(400).json({ msg: err.message })
  }
}
