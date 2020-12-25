import { Suspense } from 'react';
import {
  RelayEnvironmentProvider,
  graphql,
  useLazyLoadQuery,
} from 'react-relay/hooks';
import './index.css';
import RelayEnvironment from './RelayEnvironment';
import routes from './routes';
import RoutingContext from './routing/RoutingContext';
import createRouter from './routing/createRouter';
import RouterRenderer from './routing/RouteRenderer';
import TestComponent from './TestComponent';

// Uses the custom router setup to define a router instance that we can pass through context
//const router = createRouter(routes);

const App = () => {
  return (
    <RelayEnvironmentProvider environment={RelayEnvironment}>
      <Suspense fallback={<div />}>
        <TestComponent />
      </Suspense>
    </RelayEnvironmentProvider>
  );
};

export default App;
