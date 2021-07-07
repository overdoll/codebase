/**
 * @flow
 */
import JSResource from '@//:modules/utilities/JSResource'
import type { Route } from '@//:modules/routing/router'
import { useTranslation } from 'react-i18next'
import createMockHistory from '../server/app/render/Domain/createMockHistory'
import BirdHouse from '@streamlinehq/streamlinehq/img/streamline-bold/interface-essential/home/bird-house.svg'
import LoginKeys
  from '@streamlinehq/streamlinehq/img/streamline-bold/interface-essential/login-logout/login-keys.svg'
import ContentBrushPen
  from '@streamlinehq/streamlinehq/img/streamline-bold/content/content-creation/content-brush-pen.svg'

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

// const [t] = useTranslation('nav')

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
        hidden: true,
        exact: true,
        component: JSResource('JoinRoot', () =>
          import(
            /* webpackChunkName: "JoinRoot" */ './domain/Join/Join'
          ),
        module.hot
        ),
        // When user is logged in, we just want to redirect them since they're already "logged in"
        middleware: [
          ({ environment, ability, location, history }) => {
            // TODO get rid of user and just check ability of logged in
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
        path: '/',
        exact: true,
        component: JSResource('HomeRoot', () =>
          import(
            /* webpackChunkName: "HomeRoot" */ './domain/Home/Home'
          ),
        module.hot
        ),
        navigation: {
          top: {
            title: 'nav.home',
            icon: BirdHouse
          }
        }
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
          ({ environment, ability, location, history }) => {
            if (ability.can('access', 'modtools')) {
              return true
            }
            history.push('/join')
            return false
          }
        ],
        // first item is the top level. here, it defines the title of the nav bar
        // and the general title of the sidebar
        navigation: {
          firstRoute: true,
          top: {
            title: 'nav.mod',
            icon: LoginKeys
          },
          side: {
            title: 'sidebar.mod.title'
          }
        },
        routes: [
          {
            path: '/m/queue',
            component: JSResource('ModQueueRoot', () =>
              import(
                /* webpackChunkName: "ModQueueRoot" */ './domain/Moderation/routes/Queue/Queue'
              ),
            module.hot
            ),
            navigation: {
              // if there are any child routes after the parent in the "side" section, the parent
              // becomes an accordion menu that holds the children.
              // when firstRoute is enabled, clicking the accordion only opens the children
              // and does not go to a separate page afterwards
              firstRoute: true,
              side: {
                title: 'sidebar.mod.queue'
              }
            }
          },
          {
            path: '/m/history',
            component: JSResource('ModHistoryRoot', () =>
              import(
                /* webpackChunkName: "ModHistoryRoot" */ './domain/Moderation/routes/History/History'
              ),
            module.hot
            ),
            navigation: {
              // if there are any child routes after the parent in the "side" section, the parent
              // becomes an accordion menu that holds the children.
              // when firstRoute is enabled, clicking the accordion only opens the children
              // and does not go to a separate page afterwards
              firstRoute: true,
              side: {
                title: 'sidebar.mod.history'
              }
            }
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
          ({ environment, ability, history, location }) => {
            const user = getUserFromEnvironment(environment)

            if (!user) {
              history.push('/join')
              return false
            }

            return true
          }
        ],
        navigation: {
          top: {
            title: 'nav.upload',
            icon: ContentBrushPen
          }
        }
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
          ({ environment, location }) => {
            const user = getUserFromEnvironment(environment)
            const context = {}
            const history = createMockHistory({ context, location: location.pathname })

            if (user) {
              history.push('/')
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
