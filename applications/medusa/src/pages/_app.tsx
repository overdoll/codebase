import { ChakraProvider } from '@chakra-ui/react'
import { CacheProvider } from '@emotion/react'
import theme from '../modules/theme'
import { useMemo, useRef } from 'react'
import { I18nProvider } from '@lingui/react'
import { setupI18n } from '@lingui/core'
import NextApp from 'next/app'
import Root from '../domain/app'
import 'swiper/css'
import 'swiper/css/scrollbar'
import getSecurityTokenFromCookie from '@//:modules/next/getSecurityTokenFromCookie'
import createCache from '@emotion/cache'
import NextQueryParamProvider from '@//:modules/next/NextQueryParamProvider'
import { CookiesProvider } from 'react-cookie'
import { FlashProvider } from '@//:modules/flash'
import Cookies from 'universal-cookie'
import { useRouter } from 'next/router'
import { initializeLocaleData } from '@//:modules/locale'
import { CustomAppProps, GetRelayPreloadPropsReturn, RequestProps } from '@//:types/app'
import dateFnsLocale from 'date-fns/locale/en-US'
import { ReactRelayContainer } from '@//:modules/relay/container'
import fetchQuery from '@//:modules/relay/fetchQuery'
import { clientFetch, serverFetch } from '@//:modules/next/fetch'
import { createEnvironment } from '@//:modules/relay/environment'
import CanUseDOM from '@//:modules/operations/CanUseDOM'
import { HydrateProvider } from '@//:modules/hydrate'

let securityTokenCache = ''

const App = ({
  Component,
  pageProps,
  requestProps,
  securityToken,
  environment
}: CustomAppProps): JSX.Element => {
  if (CanUseDOM) {
    securityTokenCache = securityToken
  }
  // For initial request and transitions to pages that export `getServerSideProps`,
  // `RelayApp.getInitialProps` isn't invoked on the client and props are sent over the wire.
  // So we always create an environment (or use a previously created and cached one) on the client.

  const router = useRouter()
  const locale: string = router.locale as string ?? router.defaultLocale as string

  // Set up localization - either grab the value from the server or memoize a new instance for the client
  const i18n = useMemo(() => {
    const targetI18n = setupI18n()
    initializeLocaleData(locale, targetI18n)
    return targetI18n
  }, [])

  const firstRender = useRef(true)
  // Load localization data into lingui
  if (firstRender.current) {
    // @ts-expect-error
    i18n.load(locale, { dateFns: dateFnsLocale })
    i18n.activate(locale)
    firstRender.current = false
  }

  const getLayout = Component.getLayout ?? ((page) => page)

  const emotionCache = useMemo(() => createCache({
    key: 'od'
  }), [])

  environment = useMemo(() => CanUseDOM ? createEnvironment(clientFetch(securityTokenCache)) : environment, [])

  return (
    <HydrateProvider>
      <NextQueryParamProvider>
        <CacheProvider value={emotionCache}>
          <I18nProvider i18n={i18n}>
            <ChakraProvider theme={theme}>
              <FlashProvider>
                <CookiesProvider>
                  <ReactRelayContainer
                    environment={environment}
                    requestProps={requestProps}
                  >
                    {(requestProps) => (
                      <Root {...requestProps} {...pageProps}>
                        {getLayout(<Component {...requestProps} {...pageProps} />)}
                      </Root>
                    )}
                  </ReactRelayContainer>
                </CookiesProvider>
              </FlashProvider>
            </ChakraProvider>
          </I18nProvider>
        </CacheProvider>
      </NextQueryParamProvider>
    </HydrateProvider>
  )
}

export default App

const componentsToLoad = [Root]

App.getInitialProps = async function (app) {
  componentsToLoad.push(app.Component)

  let securityToken
  let fetchFn
  let environment

  if (app.ctx.locale == null) {
    app.ctx.locale = 'en'
  }

  if (!CanUseDOM) {
    securityToken = getSecurityTokenFromCookie(app.ctx)
    fetchFn = serverFetch(app.ctx.req, app.ctx.res)
    environment = createEnvironment(fetchFn)
    app.ctx.cookies = new Cookies(app.ctx.req.headers.cookie)
  } else {
    securityToken = securityTokenCache
    fetchFn = clientFetch(securityToken)
    app.ctx.cookies = new Cookies()
  }

  const requestProps: RequestProps = {}
  let queries: GetRelayPreloadPropsReturn = {}

  for (let i = 0; i < componentsToLoad.length; i++) {
    const component = componentsToLoad[i]

    if (component?.getRelayPreloadProps != null) {
      queries = { ...queries, ...component.getRelayPreloadProps(app.ctx).queries }
    }
  }

  // preload results on the server & client
  requestProps.preloadedQueryResults = Object.fromEntries(
    // @ts-expect-error
    await Promise.all(
      Object.entries(queries).map(async ([name, {
        params,
        variables
      }]) => {
        return await new Promise((resolve) => {
          fetchQuery(fetchFn)(params, variables).then(response => {
            resolve([
              name,
              {
                params,
                variables,
                response
              }
            ])
          })
        })
      })
    )
  )

  const rest = await NextApp.getInitialProps(app)

  return {
    ...rest,
    requestProps,
    securityToken,
    environment
  }
}
