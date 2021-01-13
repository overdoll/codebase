import JSResource from '@//:modules/utilities/JSResource';
import { loadQuery } from 'react-relay/hooks';

const routes = [
  {
    component: JSResource('Root', () => import('./components/routes/Root')),
    prepare: (params, RelayEnvironment) => {
      const RootQuery = require('./components/routes/__generated__/RootQuery.graphql');
      return {
        stateQuery: loadQuery(
          RelayEnvironment,
          RootQuery,
          {},
          {
            fetchPolicy: 'store-or-network',
          },
        ),
      };
    },
    routes: [
      {
        path: '/join',
        exact: true,
        component: JSResource('JoinRoot', () =>
          import('./components/routes/join/Join'),
        ),
        prepare: function() {},
      },
      {
        path: '/token/:id',
        component: JSResource('TokenRoot', () =>
          import('./components/routes/token/Token'),
        ),
        prepare: (params, RelayEnvironment) => {
          const TokenQuery = require('./components/routes/token/__generated__/TokenQuery.graphql');
          return {
            tokenQuery: loadQuery(
              RelayEnvironment,
              TokenQuery,
              { cookie: params.id },
              {
                fetchPolicy: 'store-or-network',
              },
            ),
          };
        },
      },
    ],
  },
];

export default routes;
