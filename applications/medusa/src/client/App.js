import RouterRenderer from '@//:modules/routing/RouteRenderer';
import { RelayEnvironmentProvider } from 'react-relay/hooks';
import RoutingContext from '@//:modules/routing/RoutingContext';
import { I18nextProvider } from 'react-i18next';
import { ThemeProvider } from 'theme-ui';
import theme from './theme';
import i18next from './utilities/i18next';

// Uses the custom router setup to define a router instance that we can pass through context
export default function App({ environment, router }) {
  return (
    <I18nextProvider i18n={i18next}>
      <ThemeProvider theme={theme}>
        <RelayEnvironmentProvider environment={environment}>
          <RoutingContext.Provider value={router.context}>
            <RouterRenderer />
          </RoutingContext.Provider>
        </RelayEnvironmentProvider>
      </ThemeProvider>
    </I18nextProvider>
  );
}
