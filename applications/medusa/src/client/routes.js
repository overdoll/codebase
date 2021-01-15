import JSResource from '@//:modules/utilities/JSResource';
import { loadQuery } from 'react-relay/hooks';

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
        prepare: () => null,
      },
      {
        path: '/token/:id',
        component: JSResource('TokenRoot', () =>
          import('./components/routes/token/Token'),
        ),
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
        prepare: () => null,
      },
    ],
  },
];

export default routes;
