import RouterRenderer from '@//:modules/routing/RouteRenderer';
import { RelayEnvironmentProvider } from 'react-relay/hooks';
import RoutingContext from '@//:modules/routing/RoutingContext';
import { ThemeProvider } from 'theme-ui';
import theme from './theme';

// Uses the custom router setup to define a router instance that we can pass through context
export default function App({ environment, router }) {
  return (
    <ThemeProvider theme={theme}>
      <RelayEnvironmentProvider environment={environment}>
        <RoutingContext.Provider value={router.context}>
          <RouterRenderer />
        </RoutingContext.Provider>
      </RelayEnvironmentProvider>
    </ThemeProvider>
  );
}
