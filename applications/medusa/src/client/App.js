/**
 * @flow
 */
import { createBrowserHistory } from 'history'
import type { Node } from 'react'
import { createClientRouter } from '@//:modules/routing/router'
import routes from './routes'
import RelayEnvironment from './bootstrap/relay/RelayEnvironment'
import i18next from './bootstrap/i18next'
import Bootstrap from './Bootstrap'
import { registerUpdateListener } from './bootstrap/update'
import createCache from '@emotion/cache'
import { EMOTION_CACHE_KEY } from '@//:modules/constants/emotion'
import OverlayScrollbars from 'overlayscrollbars'

const router = createClientRouter(
  routes,
  createBrowserHistory(),
  RelayEnvironment
)

registerUpdateListener(router)

const nonce = document
  .querySelector('meta[name="nonce"]')
  ?.getAttribute('content')

const cache = createCache({ key: EMOTION_CACHE_KEY, nonce })

window.__webpack_nonce__ = nonce

OverlayScrollbars(document.body, {
  className: 'os-theme-light',
  sizeAutoCapable: false,
  nativeScrollbarsOverlaid: {
    initialize: true
  },
  scrollbars: {
    autoHide: 'move',
    autoHideDelay: 50
  }
})

export default function App (): Node {
  return (
    <Bootstrap
      routerContext={router.context}
      emotionCache={cache}
      environment={RelayEnvironment}
      i18next={i18next}
    />
  )
}
