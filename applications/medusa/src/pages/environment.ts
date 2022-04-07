import { Environment, Network, RecordSource, Store } from 'relay-runtime'
import parseCookies from '../server/app/render/Domain/parseCookies'
import axios from 'axios'
import SafeJSONParse from '@//:modules/operations/SafeJSONParse'

export function createServerEnvironment (req, res): any {
  return new Environment({
    // We could execute the schema locally, but we want same request patterns on the server as it was
    // on the client, and puppy sets up some special stuff that needs to be proxied before graphql calls can actually happen
    // essentially, we want to replicate the same conditions on the client as on the server
    // eventually, the graphql gateway is gonna be moved to it's own service so its helpful to be ready for that here
    network: Network.create(async function (params, variables) {
      const headers = {
        // add CSRF token since its added by client
        'Content-Type': 'application/json',
        //  'Csrf-Token': req.csrfToken(),
        cookie: ''
      }

      Object.entries(
        req.headers ?? {}
      ).forEach(([key, value]) => {
        headers[key] = value
      })

      // on the server, we need to pass the _csrf cookie as a real cookie or else it bugs out

      const setCookie = res
        .getHeader('set-cookie')

      if (setCookie != null) {
        setCookie
          .forEach((setCookie) => {
            parseCookies(setCookie)
              .forEach((ck) => {
                if (ck.cookieName === '_csrf') {
                  const actualCookie = '_csrf=' + ck.cookieValue
                  if (headers.cookie === undefined) {
                    headers.cookie = actualCookie
                  } else {
                    headers.cookie += ';' + actualCookie
                  }
                }
              })
          })
      }

      const response = await axios.post(
        process.env.SERVER_GRAPHQL_ENDPOINT as string,
        {
          operationName: params.name,
          queryId: params.id,
          variables
        },
        {
          // forward all headers coming from client
          headers
        }
      )

      const json = response.data

      const responseSetCookie = response.headers['set-cookie']

      if (responseSetCookie != null) {
        responseSetCookie
          .forEach((setCookie) => {
            parseCookies(setCookie)
              .forEach(({
                cookieName,
                cookieValue,
                options
              }) => {
                res.cookie(cookieName, cookieValue, options)
              })
          })
      }

      // GraphQL returns exceptions (for example, a missing required variable) in the "errors"
      // property of the response. If any exceptions occurred when processing the request,
      // throw an error to indicate to the developer what went wrong.
      if (Array.isArray(json.errors)) {
        throw new Error(JSON.stringify(json.errors))
      }

      return json
    }),
    store: new Store(new RecordSource()),
    isServer: true
  })
}

/**
 * Relay fetch function - uses axios. Passes CSRF token from the document as well
 */
async function fetchRelay (params, variables): Promise<any> {
  // call an async function to refresh the update timer

  // Get CSRF token
  const csrfToken = document
    .querySelector('meta[name="csrf-token"]')
    ?.getAttribute('content')

  const response = await axios.post(
    '/api/graphql',
    {
      operationName: params.name,
      queryId: params.id,
      variables
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'CSRF-Token': csrfToken
      }
    }
  )

  const json = response.data

  // GraphQL returns exceptions (for example, a missing required variable) in the "errors"
  // property of the response. If any exceptions occurred when processing the request,
  // throw an error to indicate to the developer what went wrong.
  if (Array.isArray(json.errors)) {
    const error = new Error(JSON.stringify(json.errors))
    console.log(error)
    throw error
  }

  // Otherwise, return the full payload.
  return json
}

export function createClientEnvironment (): any {
  // Get hydrated data from store
  const data = SafeJSONParse(
    document.getElementById('__od_relay_store__')?.textContent ?? '{}'
  )

  return new Environment({
    network: Network.create(fetchRelay),
    store: new Store(new RecordSource(data), {
      // This property tells Relay to not immediately clear its cache when the user
      // navigates around the app. Relay will hold onto the specified number of
      // query results, allowing the user to return to recently visited pages
      // and reusing cached data if its available/fresh.
      gcReleaseBufferSize: 10
    })
  })
}
