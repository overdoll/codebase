import crypto from 'crypto'

export default (req, res, next) => {
  res.locals.cspNonce = crypto.randomBytes(16).toString('hex')
  next()
}
