import gcm from '../utilities/gcm'
import { randomBytes } from 'crypto'

export const clientFetch = (securityToken) => {
  return async (data) => await fetch(
    '/api/graphql',
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-overdoll-Security': securityToken
      },
      body: JSON.stringify(data)
    }
  )
    .then(async response => await response.json())
}

export const serverFetch = (req, res) => {
  return async (data) => {
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      cookie: ''
    }

    Object.entries(
      req.headers ?? {}
    ).forEach(([key, value]) => {
      headers[key] = value
    })

    const existingSecurity = req.cookies['od.security']

    let token: string

    if (existingSecurity != null) {
      token = gcm.decrypt(existingSecurity, process.env.SECURITY_SECRET)
    } else {
      token = randomBytes(64).toString('hex')
      const encrypted = gcm.encrypt(token, process.env.SECURITY_SECRET)
      headers.cookie = headers.cookie + ';od.security=' + encrypted
    }

    headers['X-overdoll-Security'] = token

    const response = await fetch(
      process.env.SERVER_GRAPHQL_ENDPOINT as string,
      {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
      }
    )

    const responseData = await response.json()

    const responseSetCookie = response.headers.get('set-cookie')

    if (responseSetCookie != null && res != null) {
      responseSetCookie
        .split(',')
        .forEach((setCookie) => {
          const cookieSetHeader = res.getHeader('set-cookie')
          if (cookieSetHeader != null) {
            res.setHeader('set-cookie', [...cookieSetHeader, setCookie])
          } else {
            res.setHeader('set-cookie', [setCookie])
          }
        })
    }

    return responseData
  }
}
