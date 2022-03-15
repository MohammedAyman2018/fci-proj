export function getDeviceType(req, res) {
  const clientType = req.get('device')
  if (!clientType) return res.status(400).json({ msg: 'Provide Clint Type' })
  let query
  if (clientType === 'app') query = { 'visible.app': true }
  else if (clientType === 'web') query = { 'visible.store': true }
  return query
}
