const { Coupon, validate } = require('./model')

export const getAllCoupons = async (_req, res) => {
  try {
    const coupons = await Coupon.find()
    res.status(200).json(coupons)
  } catch (err) {
    res.status(400).json({ msg: err.message })
  }
}

export const addCoupon = async (req, res) => {
  try {
    const { error } = validate(req.body)
    if (error) {
      return res.status(400).send({ msg: error.details[0].message })
    }
    const coupon = await Coupon.create(req.body)
    res.status(200).json(coupon)
  } catch (err) {
    res.status(400).json({ msg: err.message })
  }
}

export const getOneCoupon = async (req, res) => {
  try {
    const code = req.params.id
    const coupon = await Coupon.findOne({ code })
    res.status(200).json(coupon)
  } catch (err) {
    res.status(400).json({ msg: err.message })
  }
}

export const editCoupon = async (req, res) => {
  delete req.body._id
  delete req.body.createdAt
  const coupon = await Coupon.updateOne({ _id: req.params.id }, req.body)
  return res.status(200).json(coupon)
}

export const deleteCoupon = async (req, res) => {
  try {
    await Coupon.findOneAndDelete({ _id: req.params.id })
    res.status(200).json({ msg: 'Deleted Successfully' })
  } catch (err) {
    res.status(400).json({ msg: err.message })
  }
}
