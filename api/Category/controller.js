const { Category, validate } = require('./model')

export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({}).populate({
      path: 'restaurant',
      model: 'restaurants',
      select: 'title'
    })
    res.status(200).json(categories)
  } catch (err) {
    res.status(400).json({ msg: err.message })
  }
}

export const getCategoriesForRestaurant = async (req, res) => {
  try {
    const categories = await Category.find({ restaurant: req.user.restaurantId })
    res.status(200).json(categories)
  } catch (err) {
    res.status(400).json({ msg: err.message })
  }
}

export const addCategory = async (req, res) => {
  try {
    const { error } = validate(req.body)
    if (error) { return res.status(400).send({ msg: error.details[0].message }) }
    const restarant = await Category.create(req.body)
    res.status(200).json(restarant)
  } catch (err) {
    res.status(400).json({ msg: err.message })
  }
}

export const getOneCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id)
    res.status(200).json(category)
  } catch (err) {
    res.status(400).json({ msg: err.message })
  }
}

export const editCategory = async (req, res) => {
  await Category.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true }, (err, category) => {
    if (err) { res.status(400).json({ msg: err.message }) }
    res.status(200).json(category)
  })
}

export const deleteCategory = async (req, res) => {
  try {
    await Category.findOneAndDelete({ _id: req.params.id })
    res.status(200).json({ msg: 'Deleted Successfully' })
  } catch (err) {
    res.status(400).json({ msg: err.message })
  }
}
