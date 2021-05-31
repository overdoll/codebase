/**
 * @flow
 */
import { createMemoryHistory } from 'history'
import type { ComponentType } from 'react'
import type { Route, RouterInstance } from '@//:modules/routing/router'
import { createClientRouter } from '@//:modules/routing/router'
import Bootstrap from '../../client/Bootstrap'
import i18n from './i18nTesting'
import RouterRenderer from '@//:modules/routing/RouteRenderer'
import type { IEnvironment } from 'relay-runtime/store/RelayStoreTypes'
import createCache from '@emotion/cache'

type WithProviders = {
  environment: IEnvironment,
  Component: ComponentType,
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

  const cache = createCache({ key: 'od' })

  return [
    props => {
      return (
        <Bootstrap
          emotionCache={cache}
          routerContext={router.context}
          environment={environment}
          i18next={i18n}
        >
          {routes.length > 0
            ? <RouterRenderer />
            : <Component {...props} />}
        </Bootstrap>
      )
    },
    router
  ]
}
