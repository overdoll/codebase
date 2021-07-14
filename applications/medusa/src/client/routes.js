/**
 * @flow
 */
import JSResource from '@//:modules/utilities/JSResource'
import type { Route } from '@//:modules/routing/router'
import defineAbility from '@//:modules/utilities/functions/defineAbility/defineAbility'

const getUserFromEnvironment = environment =>
  environment
    .getStore()
    .getSource()
    .get('client:root:authentication:account')

const getAbilityFromUser = (environment) => {
  return defineAbility(getUserFromEnvironment(environment))
}

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
            const ability = getAbilityFromUser(environment)

            if (ability.can('manage', 'account')) {
              history.push('/profile')
              return false
            }

            return true
          }
        ]
      },
      {
        path: '/',
        exact: true,
        component: JSResource('HomeRoot', () =>
          import(
            /* webpackChunkName: "HomeRoot" */ './domain/Home/Home'
          ),
        module.hot
        )
      },
      {
        path: '/m',
        component: JSResource('ModRoot', () =>
          import(
            /* webpackChunkName: "ModRoot" */ './domain/Moderation/Moderation'
          ),
        module.hot
        ),
        // If user is not logged in, they can't post - so we redirect to join page
        middleware: [
          ({ environment, history }) => {
            const ability = getAbilityFromUser(environment)

            if (ability.can('read', 'pendingPosts')) {
              return true
            }
            history.push('/join')
            return false
          }
        ],
        routes: [
          {
            path: '/m/queue',
            component: JSResource('ModQueueRoot', () =>
              import(
                /* webpackChunkName: "ModQueueRoot" */ './domain/Moderation/routes/Queue/Queue'
              ),
            module.hot
            )
          },
          {
            path: '/m/history',
            component: JSResource('ModHistoryRoot', () =>
              import(
                /* webpackChunkName: "ModHistoryRoot" */ './domain/Moderation/routes/History/History'
              ),
            module.hot
            )
          }
        ]
      },
      {
        path: '/upload',
        component: JSResource('UploadRoot', () =>
          import(
            /* webpackChunkName: "UploadRoot" */ './domain/Upload/Upload'
          ),
        module.hot
        ),
        // If user is not logged in, they can't post - so we redirect to join page
        middleware: [
          ({ environment, history }) => {
            const ability = getAbilityFromUser(environment)

            if (ability.can('manage', 'account')) {
              return true
            }
            history.push('/join')
            return false
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
            const ability = getAbilityFromUser(environment)

            if (ability.can('manage', 'account')) {
              history.push('/')
              return false
            }

            return true
          }
        ]
      },
      {
        path: '/s',
        component: JSResource('SettingsRoot', () =>
          import(
            /* webpackChunkName: "SettingsRoot" */ './domain/Settings/Settings'
          ),
        module.hot
        ),
        // If user is not logged in, they can't post - so we redirect to join page
        middleware: [
          ({ environment, history }) => {
            const ability = getAbilityFromUser(environment)

            if (ability.can('manage', 'account')) {
              return true
            }
            history.push('/join')
            return false
          }
        ],
        routes: [
          {
            path: '/s/profile',
            component: JSResource('SettingsProfileRoot', () =>
              import(
                /* webpackChunkName: "SettingsProfileRoot" */ './domain/Settings/routes/Profile/Profile'
              ),
            module.hot
            )
          },
          {
            path: '/s/security',
            component: JSResource('SettingsSecurityRoot', () =>
              import(
                /* webpackChunkName: "SettingsSecurityRoot" */ './domain/Settings/routes/Security/Security'
              ),
            module.hot
            )
          },
          {
            path: '/s/moderation',
            component: JSResource('SettingsModerationRoot', () =>
              import(
                /* webpackChunkName: "SettingsModerationRoot" */ './domain/Settings/routes/Moderation/Moderation'
              ),
            module.hot
            ),
            middleware: [
              ({ environment }) => {
                const ability = getAbilityFromUser(environment)

                if (ability.can('manage', 'pendingPosts')) {
                  return true
                }
                return false
              }
            ]
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
