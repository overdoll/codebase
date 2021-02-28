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
import Bootstrap from '../../client/Bootstrap';
import type { Route } from '../../client/routes';
import i18n from './i18nTesting';

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
  // TODO: make this work with RouteRenderer
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
      <Bootstrap environment={environment} i18next={i18n}>
        <RoutingContext.Provider value={router.context}>
          <ErrorBoundary>
            <Suspense fallback={'fallback'}>
              <Component {...props} />
            </Suspense>
          </ErrorBoundary>
        </RoutingContext.Provider>
      </Bootstrap>
    );
  };
}
