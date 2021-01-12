import { unstable_createRoot as createRoot } from 'react-dom';
import { loadableReady } from '@loadable/component';
import Client from './Client';

const root = createRoot(document.getElementById('root'));

loadableReady().then(() => {
  root.render(<Client />);
});

if (module.hot) {
  module.hot.accept('./Client', () => {
    const NextRoot = require('./Client').default;
    root.render(<NextRoot />);
  });
}
