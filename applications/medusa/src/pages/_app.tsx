import { ChakraProvider } from '@chakra-ui/react'
import { CacheProvider } from '@emotion/react'
import theme from '../client/theme'
import { Suspense, useEffect, useMemo, useRef } from 'react'
import { getEnvironment } from '@//:modules/relay/environment'
import { ReactRelayContext } from 'react-relay'
import { I18nProvider } from '@lingui/react'
import { setupI18n } from '@lingui/core'
import NextApp from 'next/app'
import fetchQuery, { addToOperationResponseCache, getOperationResponseCacheKey } from '@//:modules/relay/fetchQuery'
import Root from '../client/domain/Root/Root'
import 'swiper/swiper.min.css'
import '../client/components/PostsInfiniteScroll/css/scrollbar.min.css'
import setupSecurityToken from './security'
import createCache from '@emotion/cache'
import NextQueryParamProvider from './NextQueryParamProvider'
import { CookiesProvider } from 'react-cookie'
import ErrorBoundary from '@//:modules/operations/ErrorBoundary'
import { FlashProvider } from '@//:modules/flash'
import Cookies from 'universal-cookie'
import { useRouter } from 'next/router'
import { initializeLocaleData } from '@//:modules/locale'

const IS_SERVER = typeof window === typeof undefined

let securityTokenCache = ''

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

    if (responseSetCookie != null) {
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

export default function App ({
  Component,
  environment,
  pageProps,
  componentProps,
  requestProps,
  securityToken,
  i18n,
  translationProps
}): JSX.Element {
  if (!IS_SERVER) {
    securityTokenCache = securityToken
  }

  // For initial request and transitions to pages that export `getServerSideProps`,
  // `RelayApp.getInitialProps` isn't invoked on the client and props are sent over the wire.
  // So we always create an environment (or use a previously created and cached one) on the client.
  environment = useMemo(() => (IS_SERVER ? environment : getEnvironment(clientFetch(securityTokenCache))), [])

  const router = useRouter()
  const locale: string = router.locale ?? router.defaultLocale

  // Set up localization - either grab the value from the server or memoize a new instance for the client
  i18n = useMemo(() => {
    const targetI18n = IS_SERVER ? i18n : setupI18n()
    initializeLocaleData(locale, targetI18n)
    return targetI18n
  }, [])

  const firstRender = useRef(true)
  // Load localization data into lingui
  if (translationProps != null && firstRender.current) {
    i18n.load(locale, translationProps)
    i18n.activate(locale)
    firstRender.current = false
  }

  // listen for the locale changes
  useEffect(() => {
    if (translationProps != null) {
      i18n.load(locale, translationProps)
      i18n.activate(locale)
    }
  }, [locale, translationProps])

  const emotionCache = useMemo(() => createCache({ key: 'od' }), [])

  if (!IS_SERVER) {
    useMemo(() => {
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
    }, [requestProps, componentProps])
  }

  return (
    <NextQueryParamProvider>
      <CacheProvider value={emotionCache}>
        <I18nProvider i18n={i18n}>
          <ChakraProvider theme={theme}>
            <FlashProvider>
              <CookiesProvider>
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
            </FlashProvider>
          </ChakraProvider>
        </I18nProvider>
      </CacheProvider>
    </NextQueryParamProvider>
  )
}

//
App.getInitialProps = async function (app) {
  let securityToken
  let environment = null
  let i18n
  let fetchFn

  if (IS_SERVER) {
    securityToken = setupSecurityToken(app.ctx)
    fetchFn = serverFetch(app.ctx.req, app.ctx.res)
    environment = getEnvironment(fetchFn)
    i18n = setupI18n()
    app.ctx.cookies = new Cookies(app.ctx.req.headers.cookie)
  } else {
    securityToken = securityTokenCache
    fetchFn = clientFetch(securityToken)
    app.ctx.cookies = new Cookies()
  }

  const componentProps = {}
  const requestProps = {}
  let translationProps = {}
  let queries = {}

  if (Root.getRelayPreloadProps != null) {
    queries = { ...queries, ...Root.getRelayPreloadProps(app.ctx).queries }
  }

  if (Root.getTranslationProps != null) {
    translationProps = { ...translationProps, ...await Root.getTranslationProps(app.ctx) }
  }

  // Component represents a page with relay preloading enabled
  if (app.Component.getRelayPreloadProps != null) {
    queries = { ...queries, ...app.Component.getRelayPreloadProps(app.ctx).queries }
  }

  if (app.Component.getTranslationProps != null) {
    translationProps = { ...translationProps, ...await app.Component.getTranslationProps(app.ctx) }
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
    translationProps
  }
}

function addPreloadedQueryResultsToCache (requestProps): void {
  Object.entries(requestProps.preloadedQueryResults ?? {}).forEach(
    ([cacheKey, response]) => {
      addToOperationResponseCache(cacheKey, response)
    }
  )
}
