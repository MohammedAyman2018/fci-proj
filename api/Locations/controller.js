const { Location, validate } = require('./model')

export const getAllLocations = async (_req, res) => {
  try {
    const locations = await Location.find()
    res.status(200).json(locations)
  } catch (err) {
    res.status(400).json({ msg: err.message })
  }
}

export const addLocation = async (req, res) => {
  try {
    const { error } = validate(req.body)
    if (error) { return res.status(400).send({ msg: error.details[0].message }) }
    const location = await Location.create(req.body)
    res.status(200).json(location)
  } catch (err) {
    res.status(400).json({ msg: err.message })
  }
}

export const getOneLocation = async (req, res) => {
  try {
    const location = await Location.findById(req.params.id)
    res.status(200).json(location)
  } catch (err) {
    res.status(400).json({ msg: err.message })
  }
}

export const editLocation = async (req, res) => {
  delete req.body._id
  delete req.body.createdAt
  const location = await Location.updateOne({ _id: req.params.id }, req.body)
  return res.status(200).json(location)
}

export const deleteLocation = async (req, res) => {
  try {
    await Location.findOneAndDelete({ _id: req.params.id })
    res.status(200).json({ msg: 'Deleted Successfully' })
  } catch (err) {
    res.status(400).json({ msg: err.message })
  }
}
