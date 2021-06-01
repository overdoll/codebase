/**
 * @flow
 */
import { createBrowserHistory } from 'history'
import type { Node } from 'react'
import { createClientRouter } from '@//:modules/routing/router'
import routes from './routes'
import RelayEnvironment from './utilities/relay/RelayEnvironment'
import i18next from './utilities/i18next'
import Bootstrap from './Bootstrap'
import { registerUpdateListener } from './utilities/update'
import createCache from '@emotion/cache'
import { EMOTION_CACHE_KEY } from '@//:modules/constants/emotion'

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
