const { Router } = require('express')
const router = Router()
const {ContactUs} = require('./model')
router.post('/contactUs', async (req, res) => {
  const { name, email, msg } = req.body
  try {
    await ContactUs.create({ name, email, msg })
    return res.status(200).json({ msg: 'تم استقبال رسالتك سيتم التواصل معك على البريد' })
  } catch (error) {
    res.status(400).json({ msg: error.message })
  }

})

module.exports = router
