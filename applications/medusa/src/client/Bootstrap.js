/**
 * @flow
 */
import type { Node } from 'react'
import { CacheProvider } from '@emotion/react'
import { I18nextProvider } from 'react-i18next'
import { RelayEnvironmentProvider } from 'react-relay/hooks'
import { ChakraProvider } from '@chakra-ui/react'
import theme from '@//:modules/theme'
import type { FlashOverride } from '@//:modules/flash'
import { FlashProvider } from '@//:modules/flash'
import type { i18next } from 'i18next'
import { HelmetProvider } from 'react-helmet-async'
import { RuntimeProvider } from '@//:modules/runtime'
import RoutingContext from '@//:modules/routing/RoutingContext'
import { QueryParamProvider } from 'use-query-params'
import CompatibilityRoute from '@//:modules/routing/CompatibilityRoute'
import RouterRenderer from '@//:modules/routing/RouteRenderer'
import type { Router } from '@//:modules/routing/router'
import type { IEnvironment } from 'relay-runtime/store/RelayStoreTypes'

type Props = {
  environment: IEnvironment,
  i18next: i18next,
  emotionCache: {},
  helmetContext?: {},
  routerContext: Router,
  flash?: FlashOverride,
  runtimeContext?: {},
  children?: Node,
};

/**
 * Default Providers
 * Used for bootstrapping client app, as well as the server app, and tests
 *
 * Bootstrap must ALWAYS stay isomorphic since it is used both on the client and server
 */
const Bootstrap = ({
  flash = null,
  runtimeContext = null,
  routerContext,
  emotionCache,
  i18next,
  environment,
  helmetContext = {},
  children
}: Props): Node => (
  <CacheProvider value={emotionCache}>
    <I18nextProvider i18n={i18next}>
      <HelmetProvider context={helmetContext}>
        <RuntimeProvider initial={runtimeContext}>
          <FlashProvider override={flash}>
            <ChakraProvider theme={theme}>
              <RelayEnvironmentProvider environment={environment}>
                <RoutingContext.Provider value={routerContext}>
                  <QueryParamProvider ReactRouterRoute={CompatibilityRoute}>
                    {children ?? <RouterRenderer />}
                  </QueryParamProvider>
                </RoutingContext.Provider>
              </RelayEnvironmentProvider>
            </ChakraProvider>
          </FlashProvider>
        </RuntimeProvider>
      </HelmetProvider>
    </I18nextProvider>
  </CacheProvider>
)

export default Bootstrap
