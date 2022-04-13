import { Response } from 'express'
import { serialize } from 'cookie'
import { randomBytes } from 'crypto'
import gcm from '../../utilities/gcm'

// Security middleware
// Handles issuing a security cookie + header
// The actual cookie is validated by downstream service "puppy"
export default (req: any, res: Response, next): void => {
  const secret = req.cookies['od.security']

  const alreadyInitialized = false
  let token = ''

  req.security = function () {
    if (token !== '') {
      return token
    }

    // use cached token if secret has not changed
    if (secret == null && !alreadyInitialized) {
      return generateAndSetSecurityCookie(req, res)
    }

    return decryptToken(secret)
  }

  // generate & set cookie
  if (!alreadyInitialized && secret == null) {
    token = generateAndSetSecurityCookie(req, res)
  }

  if (secret != null) {
    token = decryptToken(secret)
  }

  req.headers['X-overdoll-Security'] = token

  next()
}

const decryptToken = (value: string): string => {
  return gcm.decrypt(value, process.env.SECURITY_SECRET)
}

const generateAndSetSecurityCookie = (req: any, res: any): string => {
  const rnd = randomBytes(64).toString('hex')

  const encrypted = gcm.encrypt(rnd, process.env.SECURITY_SECRET)

  const data = serialize('od.security', encrypted, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    path: '/'
  })

  if (req.headers.cookie === undefined) {
    req.headers.cookie = data
  } else {
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    req.headers.cookie += ';' + data
  }

  const prev = res.getHeader('set-cookie') ?? []
  const header = Array.isArray(prev)
    ? prev.concat(data)
    : [prev, data]

  res.setHeader('set-cookie', header)

  return rnd
}
