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
import type { Node } from 'react';
import Providers from './Providers';

const router = createRouter(routes, createBrowserHistory(), RelayEnvironment);

export default function App(): Node {
  return (
    <Providers environment={RelayEnvironment}>
      <RoutingContext.Provider value={router.context}>
        <NotificationProvider>
          <RouterRenderer />
        </NotificationProvider>
      </RoutingContext.Provider>
    </Providers>
  );
}
