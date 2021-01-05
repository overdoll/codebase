import { Suspense } from 'react';
import { RelayEnvironmentProvider } from 'react-relay/hooks';
import './index.css';
import RelayEnvironment from './RelayEnvironment';
import routes from './routes';
import RoutingContext from './routing/RoutingContext';
import createRouter from './routing/createRouter';
import RouterRenderer from './routing/RouteRenderer';

// Uses the custom router setup to define a router instance that we can pass through context

const App = () => {
  return <RouterRenderer />;
};

export default App;
