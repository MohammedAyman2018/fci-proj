const { Router } = require('express')
const router = Router()
const { ContactUs } = require('./model')
router.post('/contactUs', async (req, res) => {
  const { name, msgType, phone, msg } = req.body
  try {
    await ContactUs.create({ name, msgType, phone, msg })
    return res
      .status(200)
      .json({ msg: 'تم استقبال رسالتك سيتم التواصل معك على البريد' })
  } catch (error) {
    res.status(400).json({ msg: error.message })
  }
})

module.exports = router
