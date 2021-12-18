import JSResource from '@//:modules/operations/JSResource'
import type { Route } from '@//:modules/routing/router'
import defineAbility from '@//:modules/authorization/defineAbility'
import { AppAbility } from '@//:modules/authorization/types'
import { AccountAuthorizerFragment$data } from '@//:artifacts/AccountAuthorizerFragment.graphql'
import { LocaleCreatorFragment$data } from '@//:artifacts/LocaleCreatorFragment.graphql'
import { i18n } from '@lingui/core'

// hacky way to get the current viewer
function getAccountFromEnvironment (environment): AccountAuthorizerFragment$data | null {
  const viewerRef = environment
    .getStore()
    .getSource()
    .get('client:root')

  if (viewerRef.viewer != null) {
    return environment
      .getStore()
      .getSource()
      .get(viewerRef.viewer.__ref)
  }

  return null
}

function getLanguageFromEnvironment (environment): LocaleCreatorFragment$data['language'] | null {
  return environment
    .getStore()
    .getSource()
    .get('client:root:language')
}

const getAbilityFromUser = (environment): AppAbility => {
  const account = getAccountFromEnvironment(environment)
  return defineAbility(account != null
    ? {
        isModerator: account.isModerator,
        isStaff: account.isStaff,
        isLocked: account.lock != null
      }
    : null)
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

const routes: Route[] = [
  {
    component: JSResource('Root', async () =>
      await import(
        /* webpackChunkName: "Root" */ './domain/Root/Root'
      )
    ),
    prepare: () => {
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
    middleware: [
      ({ environment }) => {
        i18n._locale = getLanguageFromEnvironment(environment)?.locale as string
        return true
      }
    ],
    routes: [
      {
        path: '/join',
        exact: true,
        component: JSResource('JoinRoot', async () =>
          await import(
            /* webpackChunkName: "JoinRoot" */ './domain/Join/JoinRoot'
          )
        ),
        // When user is logged in, we just want to redirect them since they're already "logged in"
        middleware: [
          ({
            environment,
            history
          }) => {
            const ability = getAbilityFromUser(environment)

            if (ability.can('manage', 'Account')) {
              history.push('/profile')
              return false
            }

            return true
          }
        ],
        prepare: ({
          params,
          query,
          cookies
        }) => {
          const JoinQuery = require('@//:artifacts/JoinRootQuery.graphql')

          let tokenCookie = cookies.get('token')

          if (tokenCookie != null) {
            tokenCookie = tokenCookie.split(';')[0]
          }

          return {
            joinQuery: {
              query: JoinQuery,
              variables: {
                token: tokenCookie ?? ''
              },
              options: {
                fetchPolicy: 'store-or-network'
              }
            }
          }
        }
      },
      {
        path: '/verify-token',
        exact: true,
        component: JSResource('VerifyToken', async () =>
          await import(
            /* webpackChunkName: "VerifyToken" */ './domain/VerifyToken/VerifyToken'
          )
        ),
        // When user is logged in, we just want to redirect them since they're already "logged in"
        middleware: [
          ({
            environment,
            history
          }) => {
            const ability = getAbilityFromUser(environment)

            if (ability.can('manage', 'Account')) {
              history.push('/profile')
              return false
            }

            return true
          }
        ],
        prepare: ({
          params,
          query
        }) => {
          const TokenQuery = require('@//:artifacts/VerifyTokenQuery.graphql')
          return {
            tokenQuery: {
              query: TokenQuery,
              variables: {
                token: query.get('token') ?? '',
                secret: query.get('secret') ?? ''
              },
              options: {
                fetchPolicy: 'store-or-network'
              }
            }
          }
        }
      },
      {
        path: '/confirm-email',
        exact: true,
        component: JSResource('ConfirmEmailRoot', async () =>
          await import(
            /* webpackChunkName: "ConfirmEmailRoot" */ './domain/ConfirmEmail/ConfirmEmail'
          )
        ),
        // When user is logged in, we don't want them to be able to redeem any other tokens
        middleware: [
          ({
            environment,
            history
          }) => {
            const ability = getAbilityFromUser(environment)

            if (ability.cannot('manage', 'Account')) {
              history.push('/')
              return false
            }

            return true
          }
        ]
      },
      {
        path: '/',
        exact: true,
        component: JSResource('HomeRoot', async () =>
          await import(
            /* webpackChunkName: "HomeRoot" */ './domain/Home/Home'
          )
        )
      },
      {
        path: '/moderation',
        component: JSResource('ModRoot', async () =>
          await import(
            /* webpackChunkName: "ModRoot" */ './domain/Moderation/Moderation'
          )
        ),
        // If user is not logged in, they can't post - so we redirect to join page
        middleware: [
          ({
            environment,
            history
          }) => {
            const ability = getAbilityFromUser(environment)

            if (ability.can('moderate', 'Post')) {
              return true
            }
            history.push('/join')
            return false
          }
        ],
        routes: [
          {
            path: '/moderation/queue',
            component: JSResource('ModQueueRoot', async () =>
              await import(
                /* webpackChunkName: "ModQueueRoot" */ './domain/Moderation/Queue/Queue'
              )
            ),
            prepare: () => {
              const PostsQuery = require('@//:artifacts/PostsQuery.graphql')
              return {
                postsQuery: {
                  query: PostsQuery,
                  variables: {},
                  options: {
                    fetchPolicy: 'store-or-network'
                  }
                }
              }
            }
          },
          {
            path: '/moderation/history',
            component: JSResource('ModHistoryRoot', async () =>
              await import(
                /* webpackChunkName: "ModHistoryRoot" */ './domain/Moderation/History/History'
              )
            ),
            prepare: () => {
              const AuditLogsQuery = require('@//:artifacts/AuditLogsQuery.graphql')
              return {
                auditLogsQuery: {
                  query: AuditLogsQuery,
                  variables: {
                    from: new Date(new Date().setDate(new Date().getDate() - 7)),
                    to: new Date()
                  },
                  options: {
                    fetchPolicy: 'store-or-network'
                  }
                }
              }
            }
          }
        ]
      },
      {
        path: '/manage',
        translations: JSResource('ManageRoot_Locale', async (locale) =>
          await import(
            /* webpackChunkName: "ManageRoot_Locale_[request]" */ `./domain/Manage/__locale__/${locale}`
          )
        ),
        component: JSResource('ManageRoot', async () =>
          await import(
            /* webpackChunkName: "ManageRoot" */ './domain/Manage/Manage'
          )
        )
        // middleware: [
        //   ({
        //     environment,
        //     history
        //   }) => {
        //     const ability = getAbilityFromUser(environment)
        //
        //     if (ability.can('manage', 'posting')) {
        //       return true
        //     }
        //     history.push('/join')
        //     return false
        //   }
        // ],
        // routes: [
        //   {
        //     path: '/manage/my_posts',
        //     component: JSResource('ManageMyPostsRoot', async () =>
        //       await import(
        //         /* webpackChunkName: "ManageMyPostsRoot" */ './domain/Manage/MyPosts/RootMyPosts'
        //       )
        //     ),
        //     prepare: params => {
        //       const MyPostsQuery = require('@//:artifacts/MyPostsQuery.graphql')
        //
        //       return {
        //         myPostsQuery: {
        //           query: MyPostsQuery,
        //           variables: {},
        //           options: {
        //             fetchPolicy: 'store-or-network'
        //           }
        //         }
        //       }
        //     }
        //   },
        //   {
        //     path: '/manage/brands',
        //     component: JSResource('ManageBrandsRoot', async () =>
        //       await import(
        //         /* webpackChunkName: "ManageBrandsRoot" */ './domain/Manage/Brands/Brands'
        //       )
        //     )
        //   }
        // ]
      },
      {
        path: '/settings',
        component: JSResource('SettingsRoot', async () =>
          await import(
            /* webpackChunkName: "SettingsRoot" */ './domain/Settings/Settings'
          )
        ),
        // If user is not logged in, they can't post - so we redirect to join page
        middleware: [
          ({
            environment,
            history
          }) => {
            const ability = getAbilityFromUser(environment)

            if (ability.can('manage', 'Account')) {
              return true
            }
            history.push('/join')
            return false
          }
        ],
        routes: [
          {
            path: '/settings/profile',
            component: JSResource('SettingsProfileRoot', async () =>
              await import(
                /* webpackChunkName: "SettingsProfileRoot" */ './domain/Settings/Profile/Profile'
              )
            ),
            prepare: () => {
              const UsernamesQuery = require('@//:artifacts/UsernamesQuery.graphql')
              const EmailsQuery = require('@//:artifacts/EmailsQuery.graphql')

              return {
                usernamesQuery: {
                  query: UsernamesQuery,
                  variables: {},
                  options: {
                    fetchPolicy: 'store-or-network'
                  }
                },
                emailsQuery: {
                  query: EmailsQuery,
                  variables: {},
                  options: {
                    fetchPolicy: 'store-or-network'
                  }
                }
              }
            }
          },
          {
            path: '/settings/security',
            component: JSResource('SettingsSecurityRoot', async () =>
              await import(
                /* webpackChunkName: "SettingsSecurityRoot" */ './domain/Settings/Security/Security'
              )
            ),
            prepare: () => {
              const MultiFactorQuery = require('@//:artifacts/MultiFactorSettingsQuery.graphql')

              const SessionsQuery = require('@//:artifacts/SessionsSettingsQuery.graphql')

              return {
                multiFactorQuery: {
                  query: MultiFactorQuery,
                  variables: {},
                  options: {
                    fetchPolicy: 'store-or-network'
                  }
                },
                sessionsQuery: {
                  query: SessionsQuery,
                  variables: {},
                  options: {
                    fetchPolicy: 'store-or-network'
                  }
                }
              }
            }
          },
          {
            path: '/settings/moderation',
            component: JSResource('SettingsModerationRoot', async () =>
              await import(
                /* webpackChunkName: "SettingsModerationRoot" */ './domain/Settings/Moderation/Moderation'
              )
            ),
            middleware: [
              ({ environment }) => {
                const ability = getAbilityFromUser(environment)

                return ability.can('moderate', 'Post')
              }
            ],
            prepare: () => {
              const QueueSettingsQuery = require('@//:artifacts/QueueSettingsQuery.graphql')
              return {
                queueQuery: {
                  query: QueueSettingsQuery,
                  variables: {},
                  options: {
                    fetchPolicy: 'store-or-network'
                  }
                }
              }
            }
          }
        ]
      },
      {
        path: '/configure/multi_factor/totp',
        component: JSResource('TotpSetup', async () =>
          await import(
            /* webpackChunkName: "TotpSetup" */ './domain/Settings/Security/RootMultiFactorTotpSetup/RootMultiFactorTotpSetup'
          )
        ),
        prepare: () => {
          const TotpQuery = require('@//:artifacts/MultiFactorTotpHeaderQuery.graphql')

          return {
            totpQuery: {
              query: TotpQuery,
              variables: {},
              options: {
                fetchPolicy: 'store-or-network'
              }
            }
          }
        },
        middleware: [
          ({
            environment,
            history
          }) => {
            const ability = getAbilityFromUser(environment)

            if (ability.can('manage', 'Account')) {
              return true
            }
            history.push('/join')
            return false
          }
        ]
      },
      {
        path: '/configure/multi_factor/recovery_codes',
        component: JSResource('TotpSetup', async () =>
          await import(
            /* webpackChunkName: "TotpSetup" */ './domain/Settings/Security/RootRecoveryCodesSetup/RootRecoveryCodesSetup'
          )
        ),
        prepare: () => {
          const RecoveryCodesQuery = require('@//:artifacts/RecoveryCodesSetupQuery.graphql')

          return {
            recoveryCodesQuery: {
              query: RecoveryCodesQuery,
              variables: {},
              options: {
                fetchPolicy: 'store-or-network'
              }
            }
          }
        },
        middleware: [
          ({
            environment,
            history
          }) => {
            const ability = getAbilityFromUser(environment)

            if (ability.can('manage', 'Account')) {
              return true
            }
            history.push('/join')
            return false
          }
        ]
      },
      // {
      //   path: '/configure/create_post',
      //   component: JSResource('CreatePostRoot', async () =>
      //     await import(
      //       /* webpackChunkName: "CreatePostRoot" */ './domain/Manage/CreatePost/CreatePost'
      //     )
      //   ),
      //   middleware: [
      //     ({
      //       environment,
      //       history
      //     }) => {
      //       const ability = getAbilityFromUser(environment)
      //
      //       if (ability.can('manage', 'posting')) {
      //         return true
      //       }
      //       history.push('/join')
      //       return false
      //     }
      //   ]
      // },
      {
        path: '/profile',
        exact: true,
        component: JSResource('ProfileRoot', async () =>
          await import(
            /* webpackChunkName: "ProfileRoot" */ './domain/Profile/Profile'
          )
        ),
        middleware: [
          ({
            environment,
            history
          }) => {
            const ability = getAbilityFromUser(environment)

            if (ability.can('manage', 'Account')) {
              return true
            }
            history.push('/')
            return false
          }
        ]
      },
      {
        path: '*',
        exact: false,
        component: JSResource('Empty', async () =>
          await import(
            /* webpackChunkName: "Empty" */ './domain/Error/NotFound/NotFound'
          )
        )
      }
    ]
  }
]

export default routes
