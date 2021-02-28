/**
 * @flow
 */
import RouterRenderer from '@//:modules/routing/RouteRenderer';
import RoutingContext from '@//:modules/routing/RoutingContext';
import { NotificationProvider } from '@//:modules/focus';
import createRouter from '@//:modules/routing/createRouter';
import routes from './routes';
import { createBrowserHistory } from 'history';
import RelayEnvironment from '@//:modules/relay/RelayEnvironment';
import i18next from './utilities/i18next';
import type { Node } from 'react';
import Bootstrap from './Bootstrap';

const router = createRouter(routes, createBrowserHistory(), RelayEnvironment);

export default function App(): Node {
  return (
    <Bootstrap environment={RelayEnvironment} i18next={i18next}>
      <RoutingContext.Provider value={router.context}>
        <NotificationProvider>
          <RouterRenderer />
        </NotificationProvider>
      </RoutingContext.Provider>
    </Bootstrap>
  );
}
