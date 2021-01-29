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
 * We also have our "accessible" property - which can be used by the client to determine if this route should be accessible
 * by the user
 *
 */
const routes = [
  {
    component: JSResource('Root', () => import('./components/routes/Root')),
    prepare: params => {
      const RootQuery = require('./components/routes/__generated__/RootQuery.graphql');
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
        component: JSResource('JoinRoot', () =>
          import('./components/routes/join/Join'),
        ),
        // When user is logged in, we just want to redirect them since they're already "logged in"
        middleware: (environment, context) => {
          const user = getUserFromEnvironment(environment);

          if (user !== undefined) {
            context.url = '/profile';
          }
        },
        prepare: () => ({}),
      },
      {
        path: '/token/:id',
        component: JSResource('TokenRoot', () =>
          import('./components/routes/token/Token'),
        ),
        // When user is logged in, they don't necessarily need this route
        middleware: (environment, context) => {
          const user = getUserFromEnvironment(environment);

          if (user !== undefined) {
            context.url = '/profile';
          }
        },
        prepare: params => {
          const TokenQuery = require('./components/routes/token/__generated__/TokenQuery.graphql');
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
      },
      {
        path: '*',
        component: JSResource('Empty', () =>
          import('./components/routes/empty/Empty'),
        ),
        prepare: () => ({}),
      },
    ],
  },
];

export default routes;
