const jwt = require('jsonwebtoken')
require('dotenv').config()

export default function AdminAuth(req, res, next) {
  try {
    const token = req.header('x-auth-token').split(',')[1]
    if (!token) {
      return res.status(401).send('Access denied. No token provided.')
    }
    const decoded = jwt.verify(token, process.env.jwtSecret)
    if (!['admin', 'owner'].includes(decoded.role)) {
      return res.status(401).send('Access denied. No token provided.')
    }
    req.user = decoded
    next()
  } catch (ex) {
    res.status(400).send('Invalid token.')
  }
}

export function clientAuth(req, res, next) {
  try {
    const token = req.header('x-auth-token').split(',')[1]
    if (!token) {
      return res.status(401).send('Access denied. No token provided.')
    }
    const decoded = jwt.verify(token, process.env.jwtSecret)
    req.user = decoded
    next()
  } catch (ex) {
    return res.status(400).send('Invalid token.')
  }
}
