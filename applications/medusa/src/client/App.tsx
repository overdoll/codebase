import { createBrowserHistory } from 'history'
import { createClientRouter } from '@//:modules/routing/router'
import routes from './routes'
import environment from './bootstrap/relay'
import i18next from './bootstrap/i18next'
import Bootstrap from './Bootstrap'
import { registerUpdateListener } from './bootstrap/update'
import createCache from '@emotion/cache'
import { EMOTION_CACHE_KEY } from '@//:modules/constants/emotion'

declare global {
  interface Window {
    __webpack_nonce__: string
  }
}

const router = createClientRouter(
  routes,
  createBrowserHistory(),
  environment
)

registerUpdateListener(router)

const nonce = document
  .querySelector('meta[name="nonce"]')
  ?.getAttribute('content') as string

const cache = createCache({
  key: EMOTION_CACHE_KEY,
  nonce
})

window.__webpack_nonce__ = nonce

export default function App (): JSX.Element {
  return (
    <Bootstrap
      routerContext={router.context}
      emotionCache={cache}
      environment={environment}
      i18next={i18next}
    />
  )
}
