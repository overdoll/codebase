import { randomBytes } from 'crypto'
import gcm from '../server/utilities/gcm'
import { serialize } from 'cookie'

export default function setupSecurityToken ({
  req: request,
  res: response
}): string {
  if (request == null || response == null) {
    return ''
  }

  const secret = request.cookies['od.security']

  let token = ''

  // generate & set cookie
  if (secret == null) {
    const rnd = randomBytes(64).toString('hex')

    const encrypted = gcm.encrypt(rnd, process.env.SECURITY_SECRET)

    const data = serialize('od.security', encrypted, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: '/'
    })

    if (request.headers.cookie === undefined) {
      request.headers.cookie = data
    } else {
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      request.headers.cookie += ';' + data
    }

    const cookieSetHeader = response.getHeader('set-cookie')

    if (cookieSetHeader != null) {
      response.setHeader('set-cookie', [...cookieSetHeader, data])
    } else {
      response.setHeader('set-cookie', [data])
    }

    token = rnd
  } else {
    token = gcm.decrypt(secret, process.env.SECURITY_SECRET)
  }

  request.headers['X-overdoll-Security'] = token

  return token
}
