import Flash from './Domain/Flash'

/**
 * Expose `flash()` function on requests.
 *
 * @return {Function}
 * @api public
 */
export default function (req, res, next) {
  if (req.flash) {
    return next()
  }
  req.flash = new Flash(req, {})
  return next()
}
