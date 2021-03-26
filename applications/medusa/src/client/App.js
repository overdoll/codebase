/**
 * @flow
 */
import RouterRenderer from '@//:modules/routing/RouteRenderer';
import RoutingContext from '@//:modules/routing/RoutingContext';
import createRouter from '@//:modules/routing/createRouter';
import routes from './routes';
import { createBrowserHistory } from 'history';
import RelayEnvironment from '@//:modules/relay/RelayEnvironment';
import i18next from './utilities/i18next';
import type { Node } from 'react';
import Bootstrap from './Bootstrap';
import { QueryParamProvider } from 'use-query-params';
import CompatibilityRoute from '@//:modules/routing/CompatibilityRoute';

const router = createRouter(routes, createBrowserHistory(), RelayEnvironment);

export default function App(): Node {
  return (
    <Bootstrap environment={RelayEnvironment} i18next={i18next}>
      <RoutingContext.Provider value={router.context}>
        <QueryParamProvider ReactRouterRoute={CompatibilityRoute}>
          <RouterRenderer />
        </QueryParamProvider>
      </RoutingContext.Provider>
    </Bootstrap>
  );
}
