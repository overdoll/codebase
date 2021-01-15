import RouterRenderer from '@//:modules/routing/RouteRenderer';
import { RelayEnvironmentProvider } from 'react-relay/hooks';
import RoutingContext from '@//:modules/routing/RoutingContext';
import { I18nextProvider } from 'react-i18next';
import { ThemeProvider } from 'theme-ui';
import theme from './theme';
import i18next from './utilities/i18next';
import { NotificationProvider } from '@//:modules/focus';
import createRouter from '@//:modules/routing/createRouter';
import routes from './routes';
import { createBrowserHistory } from 'history';
import RelayEnvironment from './relay/RelayEnvironment';

const router = createRouter(routes, createBrowserHistory(), RelayEnvironment);

// Uses the custom router setup to define a router instance that we can pass through context
// Global configuration - contexts and other parts should ideally function on both the server-side and client-side
export default function App() {
  return (
    <I18nextProvider i18n={i18next}>
      <ThemeProvider theme={theme}>
        <RelayEnvironmentProvider environment={RelayEnvironment}>
          <RoutingContext.Provider value={router.context}>
            <NotificationProvider>
              <RouterRenderer />
            </NotificationProvider>
          </RoutingContext.Provider>
        </RelayEnvironmentProvider>
      </ThemeProvider>
    </I18nextProvider>
  );
}
