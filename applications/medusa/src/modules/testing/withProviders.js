/**
 * @flow
 */
import { createMemoryHistory } from 'history'
import type { ComponentType } from 'react'
import type { RouterInstance } from '@//:modules/routing/router'
import { createClientRouter } from '@//:modules/routing/router'
import RoutingContext from '@//:modules/routing/RoutingContext'
import RelayEnvironment from '@//:modules/relay/RelayEnvironment'
import Bootstrap from '../../client/Bootstrap'
import i18n from './i18nTesting'
import type { Route } from '../../client/routes'
import RouterRenderer from '@//:modules/routing/RouteRenderer'
import { QueryParamProvider } from 'use-query-params'
import CompatibilityRoute from '@//:modules/routing/CompatibilityRoute'

type WithProviders = {
  environment: typeof RelayEnvironment,
  Component: ComponentType<any>,
  initialEntries: string[],
  routes: Array<Route>,
};
export default function withProviders ({
  environment,
  Component = () => null,
  initialEntries = ['/'],
  routes = []
}: WithProviders): [ComponentType<Node>, RouterInstance] {
  const router = createClientRouter(
    routes,
    createMemoryHistory({
      initialEntries,
      initialIndex: 0
    }),
    environment
  )

  // if we didn't give a list of routes, then we render the component.
  // otherwise, use the native routerenderer in order to be able to test it
  // eslint-disable-next-line react/display-name
  return [
    props => {
      return (
        <Bootstrap environment={environment} i18next={i18n}>
          <RoutingContext.Provider value={router.context}>
            <QueryParamProvider ReactRouterRoute={CompatibilityRoute}>
              {routes.length > 0
                ? <RouterRenderer />
                : <Component {...props} />}
            </QueryParamProvider>
          </RoutingContext.Provider>
        </Bootstrap>
      )
    },
    router
  ]
}
