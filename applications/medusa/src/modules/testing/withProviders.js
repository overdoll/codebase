/**
 * @flow
 */
import { createMemoryHistory } from 'history'
import type { ComponentType } from 'react'
import type { RouterInstance } from '@//:modules/routing/router'
import { createClientRouter } from '@//:modules/routing/router'
import Bootstrap from '../../client/Bootstrap'
import i18n from 'i18next'
import type { IEnvironment } from 'relay-runtime/store/RelayStoreTypes'
import createCache from '@emotion/cache'

type WithProviders = {
  environment: IEnvironment,
  Component: ComponentType,
};

// i18n specifically used for testing - no translations are provided here
i18n.init({
  lng: 'en',
  fallbackLng: 'en',
  ns: ['translations'],
  defaultNS: 'translations',
  debug: false,
  interpolation: {
    escapeValue: false
  },
  resources: { en: {} }
})

export default function withProviders ({
  environment,
  Component = () => null
}: WithProviders): [ComponentType<Node>, RouterInstance] {
  const router = createClientRouter(
    [],
    createMemoryHistory({
      initialEntries: ['/'],
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
          <Component {...props} />
        </Bootstrap>
      )
    },
    router
  ]
}
