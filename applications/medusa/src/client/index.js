import App from './App';
import { unstable_createRoot as createRoot } from 'react-dom';
import { createBrowserHistory } from 'history';
import createRouter from '@//:modules/routing/createRouter';
import routes from './routes';
import RelayEnvironment from './RelayEnvironment';
import { RelayEnvironmentProvider } from 'react-relay/hooks';
import RoutingContext from '@//:modules/routing/RoutingContext';

const router = createRouter(routes, createBrowserHistory(), RelayEnvironment);

createRoot(document.getElementById('root')).render(
  <RelayEnvironmentProvider environment={RelayEnvironment}>
    <RoutingContext.Provider value={router.context}>
      <App />
    </RoutingContext.Provider>
  </RelayEnvironmentProvider>,
);

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextRoot = require('./App').default;
    createRoot(document.getElementById('root')).render(
      <RelayEnvironmentProvider environment={RelayEnvironment}>
        <RoutingContext.Provider value={router.context}>
          <NextRoot />
        </RoutingContext.Provider>
      </RelayEnvironmentProvider>,
    );
  });
}
