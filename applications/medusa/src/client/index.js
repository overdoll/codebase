import { unstable_createRoot as createRoot } from 'react-dom'
import { loadableReady } from '@loadable/component'
import App from './App'

// create the root, and hydrate from our server
const root = createRoot(document.getElementById('root'), { hydrate: true })

loadableReady().then(() => {
  root.render(<App />)
})

if (module.hot) {
  module.hot.accept('./App', () => {
    // eslint-disable-next-line global-require
    const NextRoot = require('./App').default
    root.render(<NextRoot />)
  })
}
