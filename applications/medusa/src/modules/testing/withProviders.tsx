import { createMemoryHistory } from 'history'
import type { ComponentType } from 'react'
import { createClientRouter, Route, RouterInstance } from '../routing/router'
import Bootstrap from '../../client/Bootstrap'
import createCache from '@emotion/cache'
import { EMOTION_CACHE_KEY } from '../constants/emotion'
import { IEnvironment } from 'relay-runtime'
import { i18n } from '@lingui/core'

interface WithProviders {
  environment: IEnvironment
  Component: ComponentType
  routes: Route[]
}

export default function withProviders ({
  environment,
  Component = () => null,
  routes = []
}: WithProviders): [((props) => JSX.Element), RouterInstance] {
  const router = createClientRouter(
    routes,
    createMemoryHistory({
      initialEntries: ['/'],
      initialIndex: 0
    }),
    environment
  )

  const cache = createCache({ key: EMOTION_CACHE_KEY })

  return [
    props => {
      return (
        <Bootstrap
          emotionCache={cache}
          router={router.context}
          environment={environment}
          i18n={i18n}
        >
          <Component {...props} />
        </Bootstrap>
      )
    },
    router
  ]
}
