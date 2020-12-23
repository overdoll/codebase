import React from 'react';
import { RelayEnvironmentProvider } from 'react-relay/hooks';
import './index.css';
import RelayEnvironment from './RelayEnvironment';
import routes from './routes';
import RoutingContext from './routing/RoutingContext';
import createRouter from './routing/createRouter';
import RouterRenderer from './routing/RouteRenderer';
import { Box, Heading, Button } from 'rebass';

// Uses the custom router setup to define a router instanace that we can pass through context
const router = createRouter(routes);

const App = () => {
  return (
    <RelayEnvironmentProvider environment={RelayEnvironment}>
      <RoutingContext.Provider value={router.context}>
        <Box>
          <Heading>Hello</Heading>
          <Button>Rebass</Button>
        </Box>
        <RouterRenderer />
      </RoutingContext.Provider>
    </RelayEnvironmentProvider>
  );
};

export default App;
