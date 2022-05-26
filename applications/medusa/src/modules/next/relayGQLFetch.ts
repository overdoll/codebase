import gcm from '../utilities/gcm'

export const clientFetch = (securityToken) => {
  return async (data, kind) => {
    const response = await fetch(
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

    const result = await response.json()

    if (Array.isArray(result.errors) && kind === 'mutation') {
      const error = new Error(JSON.stringify(result.errors))
      console.log(error)
      throw error
    }

    return result
  }
}

// used for fetching inside of Next.js middleware
// note that we have to manually assign security cookies incase they are not present
export const serverMiddlewareFetch = (req) => {
  return async (data) => {
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      cookie: ''
    }

    req.headers.forEach((value, key) => {
      headers[key] = value
    })

    let existingSecurity = req.cookies.get('od.security')

    let token: string

    if (existingSecurity != null) {
      existingSecurity = existingSecurity.split(';')[0]
      existingSecurity = existingSecurity.split('=')[1]

      token = await gcm.decrypt(existingSecurity, process.env.SECURITY_SECRET, true)
    } else {
      const bytes = new Uint8Array(32)
      crypto.getRandomValues(bytes)
      token = Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('')

      const encrypted = await gcm.encrypt(token, process.env.SECURITY_SECRET, true)

      if (headers.cookie === '') {
        headers.cookie = `od.security=${encrypted}`
      } else {
        headers.cookie = `${headers.cookie}; od.security=${encrypted}`
      }
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

    return await response.json()
  }
}

export const serverFetch = (req, res) => {
  return async (data) => {
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }

    Object.entries(
      req.headers ?? {}
    ).forEach(([key, value]) => {
      headers[key] = value
    })

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
