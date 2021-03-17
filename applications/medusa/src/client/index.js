import { unstable_createRoot as createRoot } from 'react-dom';
import { loadableReady } from '@loadable/component';
import App from './App';

const root = createRoot(document.getElementById('root'), { hydrate: true });

loadableReady().then(() => {
  root.render(<App />);
});

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextRoot = require('./App').default;
    root.render(<NextRoot />);
  });
}
