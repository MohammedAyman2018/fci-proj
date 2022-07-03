const { ContactUs } = require('./model')

export const getByUser = async (req, res) => {
  try {
    const contacts = await ContactUs.find({ userId: req.params.id })
    return res.status(200).json(contacts)
  } catch (error) {
    res.status(400).json({ msg: error.message })
  }
}

export const getComplains = async (req, res) => {
  try {
    if (req.user.role === 'admin') {
      const contacts = await ContactUs.find({})
      return res.status(200).json(contacts)
    } else res.status(403).json({ msg: 'Access Denied' })
  } catch (error) {
    res.status(400).json({ msg: error.message })
  }
}

export const addComplain = async (req, res) => {
  const { name, msgType, phone, msg } = req.body
  try {
    await ContactUs.create({ name, msgType, phone, msg, userId: req.user.id })
    return res
      .status(200)
      .json({ msg: 'تم استقبال رسالتك سيتم التواصل معك على البريد' })
  } catch (error) {
    res.status(400).json({ msg: error.message })
  }
}

export const changeComplainState = async (req, res) => {
  const { state } = req.body
  try {
    const complain = await ContactUs.findById(req.params.id)
    complain.state = state
    await complain.save()
    return res
      .status(200)
      .json({ msg: 'تم استقبال رسالتك سيتم التواصل معك على البريد' })
  } catch (error) {
    res.status(400).json({ msg: error.message })
  }
}
