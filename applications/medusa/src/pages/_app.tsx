import { ChakraProvider } from '@chakra-ui/react'
import { CacheProvider } from '@emotion/react'
import theme from '../modules/theme'
import React, { useEffect, useMemo, useRef } from 'react'
import { I18nProvider } from '@lingui/react'
import { i18n as i18nGlobal } from '@lingui/core'
import NextApp from 'next/app'
import Root from '../domain/app'
import 'swiper/css'
import getOrCreateSecurityToken from '@//:modules/next/getOrCreateSecurityToken'
import createCache from '@emotion/cache'
import NextQueryParamProvider from '@//:modules/next/NextQueryParamProvider'
import { CookiesProvider } from 'react-cookie'
import { FlashProvider } from '@//:modules/flash'
import Cookies from 'universal-cookie'
import { useRouter } from 'next/router'
import { initializeLocaleData } from '@//:modules/locale'
import { CustomAppProps, CustomPageAppProps, GetRelayPreloadPropsReturn, RequestProps } from '@//:types/app'
import dateFnsLocale from 'date-fns/locale/en-US'
import { ReactRelayContainer } from '@//:modules/relay/container'
import { clientFetch, serverFetch } from '@//:modules/next/relayGQLFetch'
import { createEnvironment } from '@//:modules/relay/environment'
import CanUseDOM from '@//:modules/operations/CanUseDOM'
import { HydrateProvider } from '@//:modules/hydrate'
import prepass from 'react-ssr-prepass'
import { RouterContext } from 'next/dist/shared/lib/router-context'
import { EMOTION_CACHE_KEY } from '@//:modules/constants/emotion'
import Head from 'next/head'
import * as Fathom from 'fathom-client'
import '@fontsource/inter/400.css'
import '@fontsource/inter/600.css'
import '@fontsource/source-code-pro/400.css'
import { ConfigurationProvider } from '@//:modules/configuration'

let securityTokenCache = ''
let globalRelayEnvironment
let appHeadersCache

const MyApp = ({
  Component,
  pageProps,
  requestProps,
  securityToken,
  environment,
  relayStore,
  translationProps,
  appHeaders,
  cookies
}: CustomPageAppProps): JSX.Element => {
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
    initializeLocaleData(locale, i18nGlobal)
    return i18nGlobal
  }, [])

  // load everytime translation props changes
  useMemo(() => {
    i18nGlobal._load(locale, translationProps)
  }, [translationProps])

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
    key: EMOTION_CACHE_KEY
  }), [])

  environment = useMemo(() => CanUseDOM ? createEnvironment(clientFetch(securityTokenCache), relayStore) : environment, [])

  // fathom setup for tracking users
  useEffect(() => {
    const trackingCode: string = process.env.NEXT_PUBLIC_FATHOM_TRACKING_CODE as string

    if (trackingCode !== '') {
      Fathom.load(trackingCode, {
        includedDomains: [process.env.NEXT_PUBLIC_FATHOM_DOMAIN as string]
      })
    }

    function onRouteChangeComplete (): void {
      if (trackingCode !== '') {
        Fathom.trackPageview()
      }
    }

    // Record a pageview when route changes
    router.events.on('routeChangeComplete', onRouteChangeComplete)

    // Unassign event listener
    return () => {
      router.events.off('routeChangeComplete', onRouteChangeComplete)
    }
  }, [])

  // cache for later
  if (CanUseDOM) {
    globalRelayEnvironment = environment
    appHeadersCache = appHeaders
  }

  return (
    <>
      <Head>
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover'
        />
      </Head>
      <HydrateProvider>
        <NextQueryParamProvider>
          <CacheProvider value={emotionCache}>
            <I18nProvider i18n={i18n}>
              <ConfigurationProvider headers={appHeaders}>
                <ChakraProvider theme={theme}>
                  <FlashProvider>
                    <CookiesProvider cookies={cookies != null ? new Cookies(cookies) : undefined}>
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
              </ConfigurationProvider>
            </I18nProvider>
          </CacheProvider>
        </NextQueryParamProvider>
      </HydrateProvider>
    </>
  )
}

const componentsToLoad = [Root]

MyApp.getInitialProps = async function (app): Promise<CustomAppProps> {
  const initialProps = await NextApp.getInitialProps(app)

  let securityToken
  let environment
  let relayStore
  let appHeaders = {
    Accept: []
  }

  if (app.ctx.locale == null) {
    app.ctx.locale = 'en'
  }

  if (!CanUseDOM) {
    if (app.ctx.req != null) {
      securityToken = await getOrCreateSecurityToken(app.ctx)
    }

    if (app.ctx.req.headers.accept != null) {
      appHeaders.Accept = app.ctx.req.headers.accept.split(',')
    }

    environment = createEnvironment(serverFetch(app.ctx.req, app.ctx.res), null)
    app.ctx.cookies = new Cookies(app.ctx.req.headers.cookie)
  } else {
    securityToken = securityTokenCache
    environment = globalRelayEnvironment
    appHeaders = appHeadersCache
    app.ctx.cookies = new Cookies()
  }

  const requestProps: RequestProps = {
    preloadedQueryResults: {}
  }

  const componentLoadTargets = [...componentsToLoad, app.Component]

  let queries: GetRelayPreloadPropsReturn = {}
  let translationProps = {}

  for (const component of componentLoadTargets) {
    if (component == null) {
      continue
    }

    if (component?.getRelayPreloadProps != null) {
      queries = { ...queries, ...component.getRelayPreloadProps(app.ctx).queries }
    }

    // load translation props
    if (component.getTranslationProps != null) {
      let data: { translations: any } | null = null

      try {
        data = (await component.getTranslationProps(app.ctx))
      } catch (e) {
        data = null
        console.error(e)
      }

      if (data != null) {
        translationProps = { ...translationProps, ...data.translations.messages }
      }
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
          environment
            .getNetwork()
            .execute(params, variables, { fetchPolicy: 'store-or-network' })
            .toPromise()
            .then(response => {
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

  // pass down specific cookies into the cookie provider
  const chosenCookies = {
    postSeed: app.ctx.cookies.get('postSeed')
  }

  const props: CustomAppProps = {
    ...initialProps,
    requestProps,
    securityToken,
    environment,
    relayStore,
    translationProps,
    appHeaders,
    cookies: chosenCookies
  }

  // do a prepass to collect all queries and wait for them to complete
  // TODO: when Next.js supports suspense with data fetching, we can get rid of this
  if (!CanUseDOM) {
    if (app.Component?.getMiddleware != null) {
      const result = app.Component.getMiddleware(app.ctx, requestProps.preloadedQueryResults)

      if (result.redirect != null) {
        app.ctx.res.writeHead(result.redirect.permanent === true ? 308 : 307, { Location: result.redirect.destination })
        app.ctx.res.end()
        return props
      }

      if (result.notFound === true) {
        app.ctx.res.statusCode = 404
      }
    }

    await prepass(
      <RouterContext.Provider
        value={
          app.router
        }
      >
        <MyApp {...props} {...app} Component={app.Component} />
      </RouterContext.Provider>
    )

    props.relayStore = environment.getStore().getSource()
  }

  return props
}

export default MyApp
