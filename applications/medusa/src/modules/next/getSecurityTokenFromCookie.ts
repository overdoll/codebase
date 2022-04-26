import gcm from '../utilities/gcm'

export type SetupSecurityTokenReturn = string

export default function getSecurityTokenFromCookie ({
  req: request,
  res: response
}): SetupSecurityTokenReturn {
  let securityTokenEncrypted = request.cookies['od.security']

  if (securityTokenEncrypted == null) {
    response.getHeader('set-cookie').forEach(cookie => {
      const value = cookie.split(';')
      const realValues = value[0].split('=')

      if (realValues[0] === 'od.security') {
        securityTokenEncrypted = realValues[1]
      }
    })
  }

  return gcm.decrypt(securityTokenEncrypted, process.env.SECURITY_SECRET)
}
