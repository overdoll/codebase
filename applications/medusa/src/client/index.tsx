import { hydrateRoot } from 'react-dom'
import App from './App'

// create the root, and hydrate from our server
const root = hydrateRoot(document.getElementById('root') as HTMLDataElement, <App />)

if (module.hot != null) {
  module.hot.accept('./App', () => {
    const NextRoot = require('./App').default
    root.render(<NextRoot />)
  })
}
