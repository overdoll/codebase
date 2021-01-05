import JSResource from './utilities/JSResource';
import RelayEnvironment from './RelayEnvironment';
import { graphql, loadEntryPoint } from 'react-relay/hooks';
import { TokenQuery, StateQuery } from './queries/token';

const environmentProvider = { getEnvironment: () => RelayEnvironment };

const Root = JSResource('Root', () => import('./Root'));

const TokenRoot = JSResource('TokenRoot', () =>
  import('./components/TokenRoot'),
);

const routes = [
  {
    prepare: () => {
      return loadEntryPoint(
        environmentProvider,
        {
          root: Root,
          getPreloadProps(params) {
            return {
              extraProps: {},
              entryPoints: {},
              queries: {
                stateQuery: {
                  parameters: StateQuery,
                  variables: {},
                },
              },
            };
          },
        },
        {},
      );
    },
    component: Root,
    routes: [
      {
        path: '/join',
        exact: true,
        component: JSResource('JoinRoot', () =>
          import('./components/JoinRoot'),
        ),
        prepare: function() {},
      },
      {
        path: '/token/:id',
        component: TokenRoot,
        prepare: params => {
          return loadEntryPoint(
            environmentProvider,
            {
              root: TokenRoot,
              getPreloadProps(params) {
                return {
                  extraProps: {},
                  entryPoints: {},
                  queries: {
                    tokenQuery: {
                      parameters: TokenQuery,
                      variables: { cookie: params.cookie },
                    },
                  },
                };
              },
            },
            { cookie: params.id },
          );
        },
      },
    ],
  },
];

export default routes;
