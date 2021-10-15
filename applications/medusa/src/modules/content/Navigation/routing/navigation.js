/**
 * @flow
 */
import type { Route } from '@//:modules/routing/router'
import defineAbility from '@//:modules/utilities/functions/defineAbility/defineAbility'
import getUserFromEnvironment from '@//:modules/routing/getUserFromEnvironment'

import BirdHouse from '@streamlinehq/streamlinehq/img/streamline-bold/interface-essential/home/bird-house.svg'
import LoginKeys
  from '@streamlinehq/streamlinehq/img/streamline-bold/interface-essential/login-logout/login-keys.svg'
import ContentBrushPen
  from '@streamlinehq/streamlinehq/img/streamline-bold/content/content-creation/content-brush-pen.svg'
import InterfaceSettingCog
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/setting/interface-setting-cog.svg'

const getAbilityFromUser = (environment) => {
  return defineAbility(getUserFromEnvironment(environment))
}

/**
 * Routes that are visible in the navigation bar component
 *
 * For a route to show up in the top bar, it must be added to the array
 * and have a "navigation" property like so
 * navigation: {
      top: {
        title: 'nav.home',
        icon: BirdHouse
      }
    }
 *
 * For a sub-route to show up as an item in the sidebar, it must also have a navigation
 * property, along with a "side" property
 * navigation: {
      side: {
        title: 'sidebar.mod.title'
      }
    },
 *
 * Adding "firstRoute" means that when the user clicks on a nav item on the top bar,
 * it will route them to the first item in the sub-routes instead of the route itself
 * Add "hidden" to hide a route from the nav bar if you want to have it somewhere else,
 * like the right menu
 */

const routes: Array<Route> = [
  {
    path: '/join',
    hidden: true
  },
  {
    path: '/token',
    hidden: true
  },
  {
    path: '/',
    exact: true,
    navigation: {
      top: {
        title: 'nav.home',
        icon: BirdHouse
      }
    }
  },
  {
    path: '/moderation',
    middleware: [
      ({ environment }) => {
        const ability = getAbilityFromUser(environment)

        if (ability.can('read', 'locked')) {
          return false
        }

        if (ability.can('read', 'pendingPosts')) {
          return true
        }
        return false
      }
    ],
    navigation: {
      side: {
        title: 'sidebar.mod.title'
      }
    },
    routes: [
      {
        path: '/moderation/queue',
        navigation: {
          top: {
            title: 'nav.mod',
            icon: LoginKeys
          },
          side: {
            title: 'sidebar.mod.queue'
          }
        }
      },
      {
        path: '/moderation/history',
        navigation: {
          side: {
            title: 'sidebar.mod.history'
          }
        }
      }
    ]
  },
  {
    path: '/upload',
    middleware: [
      ({ environment }) => {
        const ability = getAbilityFromUser(environment)

        if (ability.can('read', 'locked')) {
          return false
        }

        if (ability.can('manage', 'uploads')) {
          return true
        }
        return false
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
    path: '/settings',
    navigation: {
      side: {
        title: 'sidebar.settings.title'
      }
    },
    middleware: [
      ({ environment }) => {
        const ability = getAbilityFromUser(environment)

        if (ability.can('manage', 'account')) {
          return true
        }

        return false
      }
    ],
    routes: [
      {
        path: '/settings/profile',
        navigation: {
          side: {
            title: 'sidebar.settings.profile'
          },
          menu: {
            title: 'menu.settings',
            icon: InterfaceSettingCog
          }
        }
      },
      {
        path: '/settings/security',
        navigation: {
          side: {
            title: 'sidebar.settings.security'
          }
        }
      },
      {
        path: '/settings/moderation',
        navigation: {
          side: {
            title: 'sidebar.settings.moderation'
          }
        },
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
  }
]

export default routes
