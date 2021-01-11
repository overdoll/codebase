import JSResource from '@//:modules/utilities/JSResource';
import { loadQuery } from 'react-relay/hooks';
import { TokenQuery, StateQuery } from './queries/token';

const routes = [
  {
    prepare: (params, RelayEnvironment) => {
      return {
        stateQuery: loadQuery(
          RelayEnvironment,
          StateQuery,
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
        component: JSResource('JoinRoot', () =>
          import('./routes/join/JoinRoot'),
        ),
        prepare: function() {},
      },
      {
        path: '/token/:id',
        component: JSResource('TokenRoot', () =>
          import('./routes/token/TokenRoot'),
        ),
        prepare: (params, RelayEnvironment) => {
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
