// noinspection ES6UnusedImports
import {} from 'react-dom/next'
import { createRoot } from 'react-dom'
import { loadableReady } from '@loadable/component'
import App from './App'

// create the root, and hydrate from our server
const root = createRoot(document.getElementById('root') as HTMLElement, { hydrate: true })

void loadableReady().then(() => {
  root.render(<App />)
})

if (module.hot != null) {
  module.hot.accept('./App', () => {
    // eslint-disable-next-line global-require,@typescript-eslint/no-var-requires
    const NextRoot = require('./App').default
    root.render(<NextRoot />)
  })
}
