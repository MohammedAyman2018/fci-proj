const { Product, validate } = require('./model')

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({ storeName: req.query.storeName })
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
    const products = await Product.find({ category: req.query.categoryId })
    res.status(200).json({ products })
  } catch (err) {
    res.status(400).json({ msg: err.message })
  }
}

export const searchProductsName = async (req, res) => {
  try {
    const text = req.query.text.replace(/-/g, ' ')
    const products = await Product.find({
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
    if (product) {
      let userRatedBefore = product.rating.find(rate => rate.userId === req.body.userId)
      if (userRatedBefore) {
        userRatedBefore.rate = req.body.rate
      } else {
        userRatedBefore = req.body
      }
      product.rating.push(userRatedBefore)
      await product.save()
      const rateSum = product.rating.reduce((a, b) => a + b, 0)
      res.status(200).json({ rate: rateSum / product.rating.length })
    }
  } catch (error) {
    res.status(400).json({ msg: err.message })
  }
}
