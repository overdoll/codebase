import App from './App';
import { unstable_createRoot as createRoot } from 'react-dom';
import { createBrowserHistory } from 'history';
import createRouter from '@//:modules/routing/createRouter';
import routes from './routes';
import RelayEnvironment from './RelayEnvironment';
import { loadableReady } from '@loadable/component';
import { useSSR } from 'react-i18next';

const router = createRouter(routes, createBrowserHistory(), RelayEnvironment);

// Get translations
const translations = JSON.parse(
  document.getElementById('i18next-store').textContent,
);

// Get language
const language = document
  .querySelector('meta[name="browser-language"]')
  .getAttribute('content');

loadableReady().then(() => {
  createRoot(document.getElementById('root')).render(() => {
    useSSR(translations, language);
    return <App router={router} environment={RelayEnvironment} />;
  });
});

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextRoot = require('./App').default;
    createRoot(document.getElementById('root')).render(() => {
      useSSR(translations, language);
      return <NextRoot router={router} environment={RelayEnvironment} />;
    });
  });
}
