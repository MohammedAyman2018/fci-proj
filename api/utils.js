export function getDeviceType(req, res) {
  const clientType = req.get('device')
  if (!clientType) return res.status(400).json({ msg: 'Provide Clint Type' })
  let query
  if (clientType === 'app') query = { 'visible.app': true }
  else if (clientType === 'web') query = { 'visible.store': true }
  else return res.status(400).json({ msg: 'Provide Valid Clint Type' })
  return query
}

export const productProjection = {
  visible: 0,
  rating: 0,
  updatedAt: 0,
  createdAt: 0,
  desc: 0,
  'amount.alarm': 0,
  'amount.alarmAmount': 0,
  'amount._id': 0,
  __v: 0,
}

export const storeProjection = {
  contacts: 1,
  createdAt: 1,
  desc: 1,
  location: 1,
  otherLinks: 1,
  social: 1,
  actualRating: 1,
  workOn: 1,
}
