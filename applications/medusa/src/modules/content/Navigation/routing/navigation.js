/**
 * @flow
 */
import type { Route } from '@//:modules/routing/router'
import defineAbility from '@//:modules/utilities/functions/defineAbility/defineAbility'
import getUserFromEnvironment from '@//:modules/routing/getUserFromEnvironment'

import {
  BirdHouse,
  CogDouble,
  ContentBookEdit,
  ContentBrushPen,
  ContentPens,
  FileMultiple,
  LoginKeys,
  SecurityShield,
  SettingHammer,
  SettingWrench,
  TimeHourGlass,
  UserHuman
} from '../../../../assets/icons/navigation'

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
            title: 'sidebar.mod.queue',
            icon: FileMultiple
          }
        }
      },
      {
        path: '/moderation/history',
        navigation: {
          side: {
            title: 'sidebar.mod.history',
            icon: TimeHourGlass
          }
        }
      }
    ]
  },
  {
    path: '/configure/create-post',
    navigation: {
      top: {
        title: 'nav.create_post',
        icon: ContentBrushPen
      }
    },
    middleware: [
      ({ environment }) => {
        const ability = getAbilityFromUser(environment)

        if (ability.can('read', 'locked')) {
          return false
        }

        if (ability.can('manage', 'posting')) {
          return true
        }
        return false
      }
    ]
  },
  {
    path: '/manage',
    middleware: [
      ({ environment }) => {
        const ability = getAbilityFromUser(environment)

        if (ability.can('read', 'locked')) {
          return false
        }

        if (ability.can('manage', 'posting')) {
          return true
        }
        return false
      }
    ],
    navigation: {
      side: {
        title: 'sidebar.manage.title'
      }
    },
    routes: [
      {
        path: '/manage/my-posts',
        navigation: {
          side: {
            title: 'sidebar.manage.my_posts',
            icon: ContentBookEdit
          },
          menu: {
            title: 'menu.manage',
            icon: ContentPens
          }
        }
      },
      {
        path: '/manage/brands',
        navigation: {
          side: {
            title: 'sidebar.manage.brands',
            icon: SettingHammer
          }
        }
      }
    ]
  },
  {
    path: '/settings',
    navigation: {
      side: {
        title: 'sidebar.settings.title',
        icon: LoginKeys
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
            title: 'sidebar.settings.profile',
            icon: UserHuman
          },
          menu: {
            title: 'menu.settings',
            icon: CogDouble
          }
        }
      },
      {
        path: '/settings/security',
        navigation: {
          side: {
            title: 'sidebar.settings.security',
            icon: SecurityShield
          }
        }
      },
      {
        path: '/settings/moderation',
        navigation: {
          side: {
            title: 'sidebar.settings.moderation',
            icon: SettingWrench
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
