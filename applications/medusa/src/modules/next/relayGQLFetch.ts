import gcm from '../utilities/gcm'

export const clientFetch = (securityToken) => {
  return async (data) => {
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

    return await response.json()
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

    const existingSecurity = req.cookies['od.security']

    let token: string

    if (existingSecurity != null) {
      token = await gcm.decrypt(existingSecurity, process.env.SECURITY_SECRET, true)
    } else {
      token = crypto.getRandomValues(new Uint8Array(64)).toString()
      const encrypted = await gcm.encrypt(token, process.env.SECURITY_SECRET, true)

      if (headers.cookie === '') {
        headers.cookie = `od.security=${encrypted}`
      } else {
        headers.cookie = `${headers.cookie}';od.security=${encrypted}`
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
