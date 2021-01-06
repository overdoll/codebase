import App from './client/App';
import React from 'react';
import { unstable_createRoot as createRoot } from 'react-dom';
import { createBrowserHistory } from 'history';
import createRouter from './client/routing/createRouter';
import routes from './client/routes';
import RelayEnvironment from './client/RelayEnvironment';
import { RelayEnvironmentProvider } from 'react-relay/hooks';
import RoutingContext from './client/routing/RoutingContext';

const router = createRouter(routes, createBrowserHistory(), RelayEnvironment);

createRoot(document.getElementById('root')).render(
  <RelayEnvironmentProvider environment={RelayEnvironment}>
    <RoutingContext.Provider value={router.context}>
      <App />
    </RoutingContext.Provider>
  </RelayEnvironmentProvider>,
);

if (module.hot) {
  module.hot.accept('./client/App', () => {
    const NextRoot = require('./client/App').default;
    createRoot(document.getElementById('root')).render(
      <RelayEnvironmentProvider environment={RelayEnvironment}>
        <RoutingContext.Provider value={router.context}>
          <NextRoot />
        </RoutingContext.Provider>
      </RelayEnvironmentProvider>,
    );
  });
}
