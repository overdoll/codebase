import JSResource from '@//:modules/utilities/JSResource';

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
const routes = [
  {
    component: JSResource('Root', () =>
      import(/* webpackChunkName: "Root" */ './components/routes/Root'),
    ),
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
          import(
            /* webpackChunkName: "JoinRoot" */ './components/routes/join/Join'
          ),
        ),
        middleware: [(user, history) => {}],
      },
      {
        path: '/token/:id',
        component: JSResource('TokenRoot', () =>
          import(
            /* webpackChunkName: "TokenRoot" */ './components/routes/token/Token'
          ),
        ),
        // When user is logged in, they don't necessarily need this route
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
          import(
            /* webpackChunkName: "Empty" */ './components/routes/empty/Empty'
          ),
        ),
      },
    ],
  },
];

export default routes;
