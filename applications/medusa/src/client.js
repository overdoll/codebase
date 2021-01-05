import App from './App';
import React from 'react';
import { unstable_createRoot as createRoot } from 'react-dom';
import { createBrowserHistory } from 'history';
import createRouter from './routing/createRouter';
import routes from './routes';
import RelayEnvironment from './RelayEnvironment';
import { RelayEnvironmentProvider } from 'react-relay/hooks';

const router = createRouter(routes, createBrowserHistory());

createRoot(document.getElementById('root')).render(
  <RelayEnvironmentProvider environment={RelayEnvironment}>
    <RoutingContext.Provider value={router.context}>
      <App />
    </RoutingContext.Provider>
  </RelayEnvironmentProvider>,
);

// if (module.hot) {
//   module.hot.accept('./App', () => {
//     const NextRoot = require('./App').default;
//     createRoot(document.getElementById('root')).render(<NextRoot />);
//   });
// }
