import { ChakraProvider } from '@chakra-ui/react'
import { CacheProvider } from '@emotion/react'
import theme from '../client/theme'
import { Suspense, useEffect, useMemo } from 'react'
import { getEnvironment } from '@//:modules/relay/environment'
import { ReactRelayContext } from 'react-relay'
import { I18nProvider } from '@lingui/react'
import { i18n as clientI18n, setupI18n } from '@lingui/core'
import NextApp from 'next/app'
import fetchQuery, {
  addToOperationResponseCache,
  getOperationResponseCacheKey,
  resetOperationResponseCache
} from '@//:modules/relay/fetchQuery'
import Root from '../client/domain/Root/Root'
import 'swiper/swiper.min.css'
import '../client/components/PostsInfiniteScroll/css/scrollbar.min.css'
import setupSecurityToken from './security'
import * as plurals from 'make-plural'
import createCache from '@emotion/cache'
import NextQueryParamProvider from './NextQueryParamProvider'
import { Cookies, CookiesProvider } from 'react-cookie'
import ErrorBoundary from '@//:modules/operations/ErrorBoundary'

const IS_SERVER = typeof window === typeof undefined

const clientFetch = (securityToken) => {
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

const serverFetch = (req, res) => {
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

    return await fetch(
      process.env.SERVER_GRAPHQL_ENDPOINT as string,
      {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
      }
    )
      .then(async response => {
        const responseData = await response.json()
        const responseSetCookie = res.getHeader('set-cookie')

        if (responseSetCookie != null) {
          responseSetCookie
            .forEach((setCookie) => {
              console.log(setCookie)
              const cookieSetHeader = res.getHeader('set-cookie')

              if (cookieSetHeader != null) {
                res.setHeader('set-cookie', [...cookieSetHeader, setCookie])
              } else {
                res.setHeader('set-cookie', [data])
              }
            })
        }

        return responseData
      })
  }
}

export default function App ({
  Component,
  environment,
  pageProps,
  componentProps,
  requestProps,
  securityToken,
  i18n,
  cookies
}): JSX.Element {
  // For initial request and transitions to pages that export `getServerSideProps`,
  // `RelayApp.getInitialProps` isn't invoked on the client and props are sent over the wire.
  // So we always create an environment (or use a previously created and cached one) on the client.

  environment = useMemo(() => (IS_SERVER ? environment : getEnvironment(clientFetch(securityToken))), [])
  i18n = useMemo(() => {
    if (IS_SERVER) return i18n
    clientI18n.activate('en', { plurals: plurals.en })
    return clientI18n
  }, [])
  const emotionCache = useMemo(() => createCache({ key: 'od' }), [])

  useEffect(() => {
    if (IS_SERVER) {
      throw new Error('useEffect unexpectedly invoked on server')
    }

    addPreloadedQueryResultsToCache(requestProps)

    // Adjusting preloaded queries to be consumable in the `usePreloadedQuery`.
    // `preloadedQuery` is the return value of the `loadQuery` function. But
    // we cannot use these results directly in the Next.js (as these are not serializable)
    // for that we're creating a `SerializedPreloadedQuery` object, and adjusting it to look
    // like the result of the `loadQuery` with the correct environment
    Object.entries(componentProps.queryRefs ?? {}).forEach(
      ([_, preloadedQuery]) => {
        if (preloadedQuery.kind === 'SerializedPreloadedQuery') {
          preloadedQuery.kind = 'PreloadedQuery'
          preloadedQuery.environment = environment
        }
      }
    )

    return resetOperationResponseCache
  }, [requestProps, componentProps])

  return (
    <NextQueryParamProvider>
      <CacheProvider value={emotionCache}>
        <I18nProvider i18n={i18n}>
          <ChakraProvider theme={theme}>
            <CookiesProvider cookies={IS_SERVER ? new Cookies(cookies) : undefined}>
              <ReactRelayContext.Provider value={{ environment }}>
                <ErrorBoundary>
                  <Suspense fallback={null}>
                    <Root {...componentProps}>
                      <Component {...pageProps} {...componentProps} />
                    </Root>
                  </Suspense>
                </ErrorBoundary>
              </ReactRelayContext.Provider>
            </CookiesProvider>
          </ChakraProvider>
        </I18nProvider>
      </CacheProvider>
    </NextQueryParamProvider>
  )
}

//
App.getInitialProps = async function (app) {
  const securityToken = setupSecurityToken(app.ctx)

  let environment = null
  let fetchFn
  let i18n

  if (IS_SERVER) {
    fetchFn = serverFetch(app.ctx.req, app.ctx.res)
    environment = getEnvironment(fetchFn)
    const serverI18n = setupI18n()
    serverI18n.activate('en', { plurals: plurals.en })
    i18n = serverI18n
  } else {
    fetchFn = clientFetch(securityToken)
    i18n = clientI18n
  }

  const componentProps = {}
  const requestProps = {}
  let queries = {}

  // root is a separate one - we also run this
  if (Root.getRelayPreloadProps != null) {
    queries = { ...queries, ...Root.getRelayPreloadProps(app.ctx).queries }
  }

  // Component represents a page with relay preloading enabled
  if (app.Component.getRelayPreloadProps != null) {
    queries = { ...queries, ...app.Component.getRelayPreloadProps(app.ctx).queries }
  }

  // preload query results on the server and flush them with requestProps
  requestProps.preloadedQueryResults = Object.fromEntries(
    await Promise.all(
      Object.values(queries).map(async ({
        params,
        variables
      }) => {
        return await new Promise(async (resolve) => {
          resolve([
            getOperationResponseCacheKey(params, variables),
            await fetchQuery(fetchFn)(params, variables)
          ])
        })
      })
    )
  )

  if (!IS_SERVER) {
    addPreloadedQueryResultsToCache(requestProps)
  }

  componentProps.queryRefs = Object.fromEntries(
    Object.entries(queries).map(([name, {
      params,
      variables
    }]) => {
      return [
        name,
        {
          kind: 'SerializedPreloadedQuery',
          environment,
          id: getOperationResponseCacheKey(params, variables),
          isDisposed: false,
          name: params.name,
          variables
        }
      ]
    })
  )

  const rest = await NextApp.getInitialProps(app)

  return {
    ...rest,
    environment,
    i18n,
    componentProps,
    requestProps,
    securityToken,
    cookies: app.ctx.req?.cookies
  }
}

function addPreloadedQueryResultsToCache (requestProps): void {
  Object.entries(requestProps.preloadedQueryResults ?? {}).forEach(
    ([cacheKey, response]) => {
      addToOperationResponseCache(cacheKey, response)
    }
  )
}
