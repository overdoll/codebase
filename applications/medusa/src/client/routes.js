/**
 * @flow
 */
import JSResource from '@//:modules/utilities/JSResource'
import type { Route } from '@//:modules/routing/router'

const getUserFromEnvironment = environment =>
  environment
    .getStore()
    .getSource()
    .get('client:root:authentication:user')

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

const routes: Array<Route> = [
  {
    component: JSResource('Root', () =>
      import(
        /* webpackChunkName: "Root" */ './domain/Root/Root'
      ),
    module.hot
    ),
    prepare: params => {
      const RootQuery = require('@//:artifacts/RootQuery.graphql')
      return {
        stateQuery: {
          query: RootQuery,
          variables: {},
          options: {
            fetchPolicy: 'store-or-network'
          }
        }
      }
    },
    routes: [
      {
        path: '/join',
        exact: true,
        component: JSResource('JoinRoot', () =>
          import(
            /* webpackChunkName: "JoinRoot" */ './domain/Join/Join'
          ),
        module.hot
        ),
        // When user is logged in, we just want to redirect them since they're already "logged in"
        middleware: [
          ({ environment, history }) => {
            const user = getUserFromEnvironment(environment)

            if (user) {
              history.push('/profile')
              return false
            }

            return true
          }
        ]
      },
      {
        path: '/upload',
        exact: true,
        component: JSResource('UploadRoot', () =>
          import(
            /* webpackChunkName: "UploadRoot" */ './domain/Upload/Upload'
          ),
        module.hot
        ),
        // If user is not logged in, they can't post - so we redirect to join page
        middleware: [
          ({ environment, history }) => {
            const user = getUserFromEnvironment(environment)

            if (!user) {
              history.push('/join')
              return false
            }

            return true
          }
        ]
      },
      {
        path: '/mod',
        component: JSResource('ModRoot', () =>
          import(
            /* webpackChunkName: "ModRoot" */ './domain/Mod/Mod'
          ),
        module.hot
        ),
        // If user is not logged in, they can't post - so we redirect to join page
        middleware: [
          ({ environment, history }) => {
            const user = getUserFromEnvironment(environment)

            if (!user) {
              history.push('/join')
              return false
            }

            return true
          }
        ],
        // first item is the top level. here, it defines the title of the nav bar
        // and the general title of the sidebar
        navigation: {
          firstRoute: true,
          side: {
            title: 'nav.123.asd'
            // icons?
          },
          top: {
            title: '123',
            icon: 'streamlineimport'
          }
        },
        routes: [
          {
            path: '/mod/queue',
            component: JSResource('JoinRoot', () =>
              import(
                /* webpackChunkName: "JoinRoot" */ './domain/Join/Join'
              ),
            module.hot
            ),
            navigation: {
              // if there is a firstroute after the main level and its visible on the sidebar
              // the parent becomes a dropdown "reveal" grouping that is not a separate page
              firstRoute: true,
              side: {
                title: 'nav.123.asd'
              }
            },
            // middleware is inherited from top level
            // extra checks can be added to make a sidebar item visible based on permissions
            middleware: [],
            routes: [
              {
                path: '/mod/queue/extra',
                component: JSResource('JoinRoot', () =>
                  import(
                    /* webpackChunkName: "JoinRoot" */ './domain/Join/Join'
                  ),
                module.hot
                ),
                navigation: {
                  side: {
                    title: 'nav.123.asd'
                  }
                },
                // middleware is inherited from top level
                // extra checks can be added to make a sidebar item visible based on permissions
                middleware: []
              }
            ]
          }
        ]
      },
      {
        path: '/token/:id',
        exact: true,
        component: JSResource('TokenRoot', () =>
          import(
            /* webpackChunkName: "TokenRoot" */ './domain/Token/Token'
          ),
        module.hot
        ),
        prepare: params => {
          const TokenQuery = require('@//:artifacts/TokenQuery.graphql')
          return {
            tokenQuery: {
              query: TokenQuery,
              variables: { cookie: params.id },
              options: {
                fetchPolicy: 'store-or-network'
              }
            }
          }
        },
        // When user is logged in, we don't want them to be able to redeem any other tokens
        middleware: [
          ({ environment, history }) => {
            const user = getUserFromEnvironment(environment)

            if (user) {
              history.push('/profile')
              return false
            }

            return true
          }
        ]
      },
      {
        path: '*',
        exact: false,
        component: JSResource('Empty', () =>
          import(
            /* webpackChunkName: "Empty" */ './domain/Error/NotFound/NotFound'
          ),
        module.hot
        )
      }
    ]
  }
]

export default routes
