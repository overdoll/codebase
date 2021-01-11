import JSResource from '@//:modules/utilities/JSResource';
import { loadQuery } from 'react-relay/hooks';

const routes = [
  {
    prepare: (params, RelayEnvironment) => {
      const RootQuery = require('./routes/__generated__/RootQuery.graphql');
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
    component: JSResource('Root', () => import('./routes/Root')),
    routes: [
      {
        path: '/join',
        exact: true,
        component: JSResource('JoinRoot', () => import('./routes/join/Join')),
        prepare: function() {},
      },
      {
        path: '/token/:id',
        component: JSResource('TokenRoot', () =>
          import('./routes/token/Token'),
        ),
        prepare: (params, RelayEnvironment) => {
          const TokenQuery = require('./routes/token/__generated__/TokenQuery.graphql');
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
