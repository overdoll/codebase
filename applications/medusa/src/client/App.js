/**
 * @flow
 */
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
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import type { Node } from 'react';

const router = createRouter(routes, createBrowserHistory(), RelayEnvironment);

const nonce = document
  .querySelector('meta[name="nonce"]')
  ?.getAttribute('content');

const cache = createCache({ key: 'css', nonce: nonce });

window.__webpack_nonce__ = nonce;

export default function App(): Node {
  return (
    <CacheProvider value={cache}>
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
    </CacheProvider>
  );
}
