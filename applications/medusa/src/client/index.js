import { unstable_createRoot as createRoot } from 'react-dom'
import { loadableReady } from '@loadable/component'
import App from './App'
import OverlayScrollbars from 'overlayscrollbars'

// create the root, and hydrate from our server
const root = createRoot(document.getElementById('root'), { hydrate: true })

loadableReady().then(() => {
  root.render(<App />)
})

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

if (module.hot) {
  module.hot.accept('./App', () => {
    // eslint-disable-next-line global-require
    const NextRoot = require('./App').default
    root.render(<NextRoot />)
  })
}
