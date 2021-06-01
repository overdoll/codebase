/**
 * @flow
 */
import type { Node } from 'react'
import { RelayEnvironmentProvider } from 'react-relay/hooks'
import type { FlashOverride } from '@//:modules/flash'
import { FlashProvider } from '@//:modules/flash'
import type { i18next } from 'i18next'
import RoutingContext from '@//:modules/routing/RoutingContext'
import { QueryParamProvider } from 'use-query-params'
import RouterRenderer from '@//:modules/routing/RouteRenderer'
import type { Router } from '@//:modules/routing/router'
import type { IEnvironment } from 'relay-runtime/store/RelayStoreTypes'
import Display from './Display'
import { RuntimeProvider } from '@//:modules/runtime'
import Route from '@//:modules/routing/Route'

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
  <Display
    i18next={i18next}
    emotionCache={emotionCache}
    helmetContext={helmetContext}
  >
    <RuntimeProvider initial={runtimeContext}>
      <FlashProvider override={flash}>
        <RelayEnvironmentProvider environment={environment}>
          <RoutingContext.Provider value={routerContext}>
            <QueryParamProvider
              ReactRouterRoute={Route}
            >
              {children ?? <RouterRenderer />}
            </QueryParamProvider>
          </RoutingContext.Provider>
        </RelayEnvironmentProvider>
      </FlashProvider>
    </RuntimeProvider>
  </Display>
)

export default Bootstrap
