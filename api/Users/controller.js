const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { Product } = require('../Product/model')
const { User, validate } = require('./model')
require('dotenv').config()

/**
 * @description Get All Users
 * @returns { Array } Users
 */

exports.getAllUsers = async (_req, res) => {
  await User.find()
    .select('-password')
    .then((users) => res.status(200).json(users))
    .catch((err) => res.status(400).json({ msg: err.message }))
}

/**
 * @desc Get a user
 * @route GET /api/users/me
 * @access Private
 */
exports.getOneUser = (req, res) => {
  User.findById(req.params.id, { password: 0 })
    .then((user) => res.status(200).json(user))
    .catch((err) => res.status(500).json({ msg: err.message, err }))
}

/**
 * @desc Get a user
 * @route GET /api/users/me
 * @access Private
 */
exports.getUser = (req, res) => {
  User.findById(req.user.id, { password: 0 })
    .then((user) => res.status(200).json({ user }))
    .catch((err) => res.status(500).json({ msg: err.message, err }))
}

/**
 * PATH: POST /users/fav/:userid
 * @param { String } productId
 * @field productId
 */
exports.addProductToFav = async (req, res) => {
  const { productId } = req.body
  await User.findOne({ _id: req.user.id })
    .then(async (user) => {
      const idx = user.fav.indexOf(productId)
      const product = await Product.findById(productId)
      if (!product) return
      if (idx === -1) {
        await user.fav.push(productId)
        product.inFav++
        await product.save()
        await user
          .save()
          .then((result) => res.status(201).json(result))
          .catch((err) => res.status(400).json({ msg: err.message, err }))
      } else {
        await user.fav.splice(idx, 1)
        product.inFav--
        await product.save()
        await user
          .save()
          .then((result) => res.status(200).json(result))
          .catch((err) => res.status(400).json({ msg: err.message, err }))
      }
    })
    .catch((err) => res.status(500).json({ msg: err.message, err }))
}

/**
 * @desc  Create a User
 * @route POST /api/users
 * @access Public
 */
exports.addUser = async (req, res) => {
  try {
    const { error } = validate(req.body)
    if (error) {
      return res.status(400).send({ msg: error.details[0].message })
    }
    let user = await User.findOne({ email: req.body.email })
    if (user) {
      return res.status(400).json({ msg: '???????? ???????? ???????? ???????????? ????????????.' })
    }

    user = new User(req.body)

    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)
    await user.save().then((result) => res.status(200).json(result))
  } catch (err) {
    res.status(400).json({ msg: err.message })
  }
}

/**
 * @desc  Login
 * @route POST /api/users/auth
 * @access Public
 */
exports.authenticate = async (req, res) => {
  const { email, password } = req.body
  // Simple validation
  if (!email || !password) {
    return res.status(400).json({ msg: 'Please fill all feilds' })
  }

  // Check for existing user
  await User.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(400).json({ msg: 'Email or password is wrong.' })
    }

    // Validate password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch) {
        return res.status(400).json({ msg: 'Email or password is wrong.' })
      }

      jwt.sign(
        { id: user._id, role: user.role, storeName: user.storeName },
        process.env.jwtSecret,
        // { expiresIn: 36000 },
        (err, token) => {
          if (err) {
            throw err
          }
          res.json({ token: `${user.role},${token}`, user })
        }
      )
    })
  })
}

/**
 * @param { String } userId
 * @description Updates User
 */
exports.updateUser = async (req, res) => {
  const user = req.body

  if (user.password) {
    const userInDB = await User.findById(req.params.id)
    await bcrypt
      .compare(user.oldPassword, userInDB.password)
      .then(async (isMatch) => {
        if (!isMatch) {
          return res.json({ msg: 'Please validate your inputs' })
        }

        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(user.password, salt)
      })
  }
  delete req.body._id
  delete req.body.vgt_id
  delete req.body.__v
  delete req.body.fav
  delete req.body.oldPassword
  delete req.body.orders
  delete req.body.createdAt
  try {
    await User.updateOne({ _id: req.params.id }, req.body)
    return res.json(user)
  } catch (error) {
    return res.json(error)
  }
}

/**
 * @param { String } userid
 * @description Deletes User
 */
exports.deleteUser = async (req, res) => {
  try {
    await User.findOneAndDelete({ _id: req.params.id })
    res.status(200).json({ msg: 'Deleted Successfully' })
  } catch (err) {
    res.status(400).json({ msg: err.message })
  }
}

exports.getUserFav = async (req, res) => {
  try {
    const user = await User.findById(req.user.id, { password: 0 }).populate({
      path: 'fav',
      populate: {
        path: 'category',
      },
    })
    res.status(200).json(user.fav)
  } catch (err) {
    res.status(400).json({ msg: err.message })
  }
}

exports.getUserOrders = async (req, res) => {
  try {
    const user = await User.findById(req.user.id, { password: 0 }).populate(
      'orders'
    )
    res.status(200).json(user.orders)
  } catch (err) {
    res.status(400).json({ msg: err.message })
  }
}
