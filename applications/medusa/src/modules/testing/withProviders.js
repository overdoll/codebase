/**
 * @flow
 */
import { createMemoryHistory } from 'history';

import type { ComponentType } from 'react';
import { Suspense } from 'react';
import createRouter from '@//:modules/routing/createRouter';
import JSResource from '@//:modules/utilities/JSResource';
import RoutingContext from '@//:modules/routing/RoutingContext';
import RelayEnvironment from '@//:modules/relay/RelayEnvironment';
import ErrorBoundary from '@//:modules/utilities/ErrorBoundary';
import Providers from '../../client/Providers';
import type { Route } from '../../client/routes';

type WithProviders = {
  environment: typeof RelayEnvironment,
  Component: ComponentType<any>,
  initialEntries: string[],
  routes: Route,
};

export default function withProviders({
  environment = RelayEnvironment,
  Component,
  initialEntries = ['/'],
  routes,
}: WithProviders): any {
  const defaultRoutes = [
    {
      path: '/',
      exact: true,
      component: JSResource(
        'Component',
        () => new Promise(resolve => resolve(Component)),
      ),
    },
  ];

  const testRoutes = routes || defaultRoutes;

  const router = createRouter(
    testRoutes,
    createMemoryHistory({
      initialEntries,
      initialIndex: 0,
    }),
    environment,
  );

  // eslint-disable-next-line react/display-name
  return props => {
    return (
      <Providers environment={environment}>
        <RoutingContext.Provider value={router.context}>
          <ErrorBoundary>
            <Suspense fallback={'Loading fallback...'}>
              <Component {...props} />
            </Suspense>
          </ErrorBoundary>
        </RoutingContext.Provider>
      </Providers>
    );
  };
}
