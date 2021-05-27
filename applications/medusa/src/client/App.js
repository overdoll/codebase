/**
 * @flow
 */
import { createBrowserHistory } from 'history'
import type { Node } from 'react'
import { QueryParamProvider } from 'use-query-params'
import RouterRenderer from '@//:modules/routing/RouteRenderer'
import RoutingContext from '@//:modules/routing/RoutingContext'
import { createClientRouter } from '@//:modules/routing/router'
import routes from './routes'
import RelayEnvironment from './utilities/relay/RelayEnvironment'
import i18next from './utilities/i18next'
import Bootstrap from './Bootstrap'
import CompatibilityRoute from '@//:modules/routing/CompatibilityRoute'
import registerUpdateListener from './utilities/update'

const router = createClientRouter(
  routes,
  createBrowserHistory(),
  RelayEnvironment
)

registerUpdateListener(router)

export default function App (): Node {
  return (
    <Bootstrap environment={RelayEnvironment} i18next={i18next}>
      <RoutingContext.Provider value={router.context}>
        <QueryParamProvider ReactRouterRoute={CompatibilityRoute}>
          <RouterRenderer />
        </QueryParamProvider>
      </RoutingContext.Provider>
    </Bootstrap>
  )
}
