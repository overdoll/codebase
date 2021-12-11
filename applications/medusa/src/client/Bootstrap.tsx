import { RelayEnvironmentProvider } from 'react-relay/hooks'
import type { FlashOverride } from '@//:modules/flash'
import { FlashProvider } from '@//:modules/flash'
import RoutingContext from '@//:modules/routing/RoutingContext'
import { QueryParamProvider } from 'use-query-params'
import RouterRenderer from '@//:modules/routing/RouteRenderer'
import type { Router } from '@//:modules/routing/router'
import type { IEnvironment } from 'relay-runtime'
import { Route, Router as ReactRouter } from 'react-router-dom'
import { RuntimeProvider } from '@//:modules/runtime'
import { Cookies, CookiesProvider } from 'react-cookie'
import { CacheProvider } from '@emotion/react'
import { I18nextProvider } from 'react-i18next'
import { HelmetProvider } from 'react-helmet-async'
import { ChakraProvider } from '@chakra-ui/react'
import theme from './theme'
import { EmotionCache } from '@emotion/css'
import { i18n } from 'i18next'

interface Props {
  environment: IEnvironment
  i18next: i18n
  emotionCache: EmotionCache
  helmetContext?: {}
  cookies?: Cookies
  routerContext: Router
  flash?: FlashOverride
  runtimeContext?: {}
  children?: JSX.Element
}

/**
 * Default Providers
 * Used for bootstrapping client app, as well as the server app, and tests
 *
 * Bootstrap must ALWAYS stay isomorphic since it is used both on the client and server
 */
const Bootstrap = ({
  flash,
  runtimeContext,
  cookies,
  routerContext,
  emotionCache,
  i18next,
  environment,
  helmetContext = {},
  children
}: Props): JSX.Element => (
  <CacheProvider value={emotionCache}>
    <I18nextProvider i18n={i18next}>
      <HelmetProvider context={helmetContext}>
        <ChakraProvider theme={theme}>
          <RuntimeProvider initial={runtimeContext}>
            <FlashProvider override={flash}>
              <CookiesProvider cookies={cookies}>
                <RelayEnvironmentProvider environment={environment}>
                  <ReactRouter history={routerContext.history}>
                    <QueryParamProvider
                      ReactRouterRoute={Route}
                    >
                      <RoutingContext.Provider value={routerContext}>
                        {children ?? <RouterRenderer />}
                      </RoutingContext.Provider>
                    </QueryParamProvider>
                  </ReactRouter>
                </RelayEnvironmentProvider>
              </CookiesProvider>
            </FlashProvider>
          </RuntimeProvider>
        </ChakraProvider>
      </HelmetProvider>
    </I18nextProvider>
  </CacheProvider>
)

export default Bootstrap
