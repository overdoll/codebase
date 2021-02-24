/**
 * @flow
 */
import JSResource from '@//:modules/utilities/JSResource';

const getUserFromEnvironment = environment =>
  environment
    .getStore()
    .getSource()
    .get('client:root:authentication:user');

/**
 * Client routes for the application
 *
 * The server, when visiting the route, will initially preload the first route so we can save an API call on the first load
 *
 * We can also do some checks to make sure that a user is allowed to visit a certain route, or we can simply redirect them
 * using our "middleware" attribute, which just plugs directly into express, allowing us to perform redirects
 *
 * "Before" middleware allows us to run it before the API call, which is good for checking user permissions
 *
 * "After" middleware is good for running it after the API call, so for example if we want to redirect after a result of the specific API, i.e.
 * redirect the user once they redeem the token and they're already registered
 *
 * We also have our "accessible" property - which can be used by the client to determine if this route should be accessible
 * by the user
 *
 */

type Route = {
  component: any,
  prepare: any,
  middleware: ?any,
  exact: boolean,
  routes: Array<Route>,
  path: ?string,
};

const routes: Array<Route> = [
  {
    path: null,
    exact: false,
    middleware: [],
    component: JSResource('Root', () =>
      import(/* webpackChunkName: "Root" */ './components/routes/Root'),
    ),
    prepare: params => {
      const RootQuery = require('@//:artifacts/RootQuery.graphql');
      return {
        stateQuery: {
          query: RootQuery,
          variables: {},
          options: {
            fetchPolicy: 'store-or-network',
          },
        },
      };
    },
    routes: [
      {
        path: '/join',
        exact: true,
        prepare: () => ({}),
        component: JSResource('JoinRoot', () =>
          import(
            /* webpackChunkName: "JoinRoot" */ './components/routes/join/Join'
          ),
        ),
        // When user is logged in, we just want to redirect them since they're already "logged in"
        middleware: [
          (environment, history) => {
            const user = getUserFromEnvironment(environment);

            if (user !== undefined) {
              history.push('/profile');
              return false;
            }

            return true;
          },
        ],
        routes: [],
      },
      {
        path: '/token/:id',
        exact: true,
        component: JSResource('TokenRoot', () =>
          import(
            /* webpackChunkName: "TokenRoot" */ './components/routes/token/Token'
          ),
        ),
        prepare: params => {
          const TokenQuery = require('@//:artifacts/TokenQuery.graphql');
          return {
            tokenQuery: {
              query: TokenQuery,
              variables: { cookie: params.id },
              options: {
                fetchPolicy: 'store-or-network',
              },
            },
          };
        },
        // When user is logged in, we don't want them to be able to redeem any other tokens
        middleware: [
          (environment, history) => {
            const user = getUserFromEnvironment(environment);

            if (user !== undefined) {
              history.push('/profile');
              return false;
            }

            return true;
          },
        ],
        routes: [],
      },
      {
        path: '*',
        exact: false,
        component: JSResource('Empty', () =>
          import(
            /* webpackChunkName: "Empty" */ './components/routes/empty/Empty'
          ),
        ),
        prepare: () => ({}),
        middleware: [],
        routes: [],
      },
    ],
  },
];

export default routes;
