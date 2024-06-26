import gcm from '../utilities/gcm'

const fetchToMethod = async (url, kind, data, headers): Promise<any> => {
  // if (kind === 'query') {
  //   delete data.operationName
  //   const params = Object.keys(data).map(function (key) {
  //     return key + '=' + encodeURIComponent(JSON.stringify(data[key]))
  //   }).join('&')
  //
  //   return await fetch(`${url as string}?${params}`, {
  //     method: 'GET',
  //     headers
  //   })
  // }

  return await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(data)
  })
}

const addExtraHeaders = (headers): void => {
  headers['apollographql-client-name'] = 'web'
  headers['apollographql-client-version'] = process.env.NEXT_BUILD_ID
}

export const clientFetch = (securityToken) => {
  return async (data, kind) => {
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-overdoll-Security': securityToken
    }

    addExtraHeaders(headers)

    const response = await fetchToMethod('/api/graphql', kind, data, headers)

    const result = await response.json()

    // throw errors for mutations if array of errors is detected in the response
    if (Array.isArray(result.errors) && kind === 'mutation') {
      const error = new Error(JSON.stringify(result.errors))
      console.error('Mutation Error ::', error)
      throw error
    }

    // throw errors for queries if array of errors is detected in the response
    if (Array.isArray(result.errors) && kind === 'query') {
      const error = new Error(JSON.stringify(result.errors))
      console.error('Query Error ::', error)
      // we filter out the viewer if there is a query error, so it doesn't mess with the internal store
      if (result?.data?.viewer === null) {
        const {
          data: queryData,
          ...restResult
        } = result
        const {
          viewer,
          ...restData
        } = queryData
        return { data: { ...restData }, ...restResult }
      }
    }

    return result
  }
}

// used for fetching inside of Next.js middleware
// note that we have to manually assign security cookies in case they are not present
export const serverMiddlewareFetch = (req) => {
  return async (data) => {
    const headers: any = { cookie: '' }

    req.headers.forEach((value, key) => {
      headers[key] = value
    })

    const existingSecurity = req.cookies.get('od.security')

    let token: string

    if (existingSecurity != null) {
      token = await gcm.decrypt(existingSecurity, process.env.SECURITY_SECRET, true)
    } else {
      const bytes = new Uint8Array(32)
      crypto.getRandomValues(bytes)
      token = Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('')

      const encrypted = await gcm.encrypt(token, process.env.SECURITY_SECRET, true)

      if (headers.cookie === '') {
        headers.cookie = `od.security=${encrypted}`
      } else {
        headers.cookie = `${headers.cookie as string}; od.security=${encrypted}`
      }
    }

    headers.accept = 'application/json'
    headers['Content-Type'] = 'application/json'
    headers['X-overdoll-Security'] = token
    addExtraHeaders(headers)

    const response = await fetchToMethod(process.env.SERVER_GRAPHQL_ENDPOINT as string, 'query', data, headers)

    return response.json()
  }
}

export const serverFetch = (req, res) => {
  return async (data, kind) => {
    const headers: any = {}

    Object.entries(
      req.headers ?? {}
    ).forEach(([key, value]) => {
      headers[key] = value
    })

    headers.accept = 'application/json'
    headers['Content-Type'] = 'application/json'

    addExtraHeaders(headers)

    const response = await fetchToMethod(process.env.SERVER_GRAPHQL_ENDPOINT as string, kind, data, headers)

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

    // we filter out the viewer if there a query error so it doesn't mess with the internal store
    if (Array.isArray(responseData.errors)) {
      if (responseData?.data?.viewer === null) {
        const {
          data: queryData,
          ...restResult
        } = responseData
        const {
          viewer,
          ...restData
        } = queryData
        return { data: { ...restData }, ...restResult }
      }
    }

    return responseData
  }
}
