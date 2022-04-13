import crypto from 'crypto'
import { Request, Response } from 'express'

export default (req: Request, res: Response, next): void => {
  res.locals.cspNonce = crypto.randomBytes(16).toString('hex')
  next()
}
