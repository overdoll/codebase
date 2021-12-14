/**
 * @flow
 */
import { createBrowserHistory } from 'history'
import type { Node } from 'react'
import { createClientRouter } from '@//:modules/routing/router'
import routes from './routes'
import environment from './bootstrap/relay'
import i18next from './bootstrap/i18next'
import Bootstrap from './Bootstrap'
import { registerUpdateListener } from './bootstrap/update'
import createCache from '@emotion/cache'
import { EMOTION_CACHE_KEY } from '@//:modules/constants/emotion'
import OverlayScrollbars from 'overlayscrollbars'

const router = createClientRouter(
  routes,
  createBrowserHistory(),
  environment
)

registerUpdateListener(router)

const nonce = document
  .querySelector('meta[name="nonce"]')
  ?.getAttribute('content')

const cache = createCache({ key: EMOTION_CACHE_KEY, nonce })

window.__webpack_nonce__ = nonce

// TODO removing custom scrollbars for now due to these issues
// 1. not appearing in modals
// 2. modals still show the scrollbar when it should be hidden
// 3. it overlaps the nav bar when it should really be below it
/*
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

 */

export default function App (): Node {
  return (
    <Bootstrap
      routerContext={router.context}
      emotionCache={cache}
      environment={environment}
      i18next={i18next}
    />
  )
}
