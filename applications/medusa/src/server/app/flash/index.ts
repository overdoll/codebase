import Flash from './Domain/Flash'
import { Request, Response } from 'express'

interface FlashType extends Request {
  flash?: Flash // or any other type
}

export default (req: FlashType, res: Response, next): void => {
  if (req.flash != null) {
    next()
  }
  req.flash = new Flash(req, {})
  next()
}
