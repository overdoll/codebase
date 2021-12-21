import { loadable } from '@//:modules/operations/JSResource'
import type { Route } from '@//:modules/routing/router'
import defineAbility from '@//:modules/authorization/defineAbility'
import { AppAbility } from '@//:modules/authorization/types'
import { AccountAuthorizerFragment$data } from '@//:artifacts/AccountAuthorizerFragment.graphql'

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

function getLanguageFromEnvironment (environment): string {
  if (environment == null) {
    return ''
  }

  return environment
    .getStore()
    .getSource()
    .get('client:root:language')?.locale
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

const mapping = {
  en: 'en-US'
}

// dateFNS has weird mapping - so we check to make sure its proper here
function getDateFnsLocale (locale: string): string {
  if (mapping[locale] != null) {
    return mapping[locale]
  }

  return locale
}

const loadMessages = ({
  data,
  environment,
  i18n
}): void => i18n._load(getLanguageFromEnvironment(environment), data.messages)

const routes: Route[] = [
  {
    component: loadable(async () =>
      await import(
        './domain/Root/Root'
      )
    ),
    dependencies: [
      {
        resource: loadable(async (environment) => (
          await import(
            /* webpackExclude: /_lib/ */`date-fns/locale/${getDateFnsLocale(getLanguageFromEnvironment(environment))}/index.js`
          )
        )),
        then: ({
          data,
          environment,
          i18n
        }) => i18n.load(getLanguageFromEnvironment(environment), { dateFns: data })
      },
      {
        resource: loadable(async (environment) =>
          await import(
            `./domain/Root/__locale__/${getLanguageFromEnvironment(environment)}/index.js`
          )
        ),
        then: loadMessages
      }
    ],
    middleware: [
      ({
        environment,
        i18n
      }) => {
        i18n._locale = getLanguageFromEnvironment(environment)
        return true
      }
    ],
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
    routes: [
      {
        path: '/join',
        exact: true,
        dependencies: [
          {
            resource: loadable(async (environment) =>
              await import(
                `./domain/Join/__locale__/${getLanguageFromEnvironment(environment)}/index.js`
              )
            ),
            then: loadMessages
          }
        ],
        component: loadable(async () =>
          await import(
            './domain/Join/JoinRoot'
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
        component: loadable(async () =>
          await import(
            './domain/VerifyToken/VerifyToken'
          )
        ),
        dependencies: [
          {
            resource: loadable(async (environment) =>
              await import(
                `./domain/VerifyToken/__locale__/${getLanguageFromEnvironment(environment)}/index.js`
              )
            ),
            then: loadMessages
          }
        ],
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
        component: loadable(async () =>
          await import(
            './domain/ConfirmEmail/ConfirmEmail'
          )
        ),
        dependencies: [
          {
            resource: loadable(async (environment) =>
              await import(
                `./domain/ConfirmEmail/__locale__/${getLanguageFromEnvironment(environment)}/index.js`
              )
            ),
            then: loadMessages
          }
        ],
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
        component: loadable(async () =>
          await import(
            './domain/Home/Home'
          )
        )
      },
      {
        path: '/moderation',
        component: loadable(async () =>
          await import(
            './domain/Moderation/Moderation'
          )
        ),
        dependencies: [
          {
            resource: loadable(async (environment) =>
              await import(
                `./domain/Moderation/__locale__/${getLanguageFromEnvironment(environment)}/index.js`
              )
            ),
            then: loadMessages
          }
        ],
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
            component: loadable(async () =>
              await import(
                './domain/Moderation/Queue/Queue'
              )
            ),
            dependencies: [
              {
                resource: loadable(async (environment) =>
                  await import(
                    `./domain/Moderation/Queue/__locale__/${getLanguageFromEnvironment(environment)}/index.js`
                  )
                ),
                then: loadMessages
              }
            ],
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
            component: loadable(async () =>
              await import(
                './domain/Moderation/History/History'
              )
            ),
            dependencies: [
              {
                resource: loadable(async (environment) =>
                  await import(
                    `./domain/Moderation/History/__locale__/${getLanguageFromEnvironment(environment)}/index.js`
                  )
                ),
                then: loadMessages
              }
            ],
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
        dependencies: [
          {
            resource: loadable(async (environment) =>
              await import(
                `./domain/Manage/__locale__/${getLanguageFromEnvironment(environment)}/index.js`
              )
            ),
            then: loadMessages
          }
        ],
        component: loadable(async () =>
          await import(
            './domain/Manage/Manage'
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
        component: loadable(async () =>
          await import(
            './domain/Settings/Settings'
          )
        ),
        dependencies: [
          {
            resource: loadable(async (environment) =>
              await import(
                `./domain/Settings/__locale__/${getLanguageFromEnvironment(environment)}/index.js`
              )
            ),
            then: loadMessages
          }
        ],
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
            component: loadable(async () =>
              await import(
                './domain/Settings/Profile/Profile'
              )
            ),
            dependencies: [
              {
                resource: loadable(async (environment) =>
                  await import(
                    `./domain/Settings/Profile/__locale__/${getLanguageFromEnvironment(environment)}/index.js`
                  )
                ),
                then: loadMessages
              }
            ],
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
            component: loadable(async () =>
              await import(
                './domain/Settings/Security/Security'
              )
            ),
            dependencies: [
              {
                resource: loadable(async (environment) =>
                  await import(
                    `./domain/Settings/Security/__locale__/${getLanguageFromEnvironment(environment)}/index.js`
                  )
                ),
                then: loadMessages
              }
            ],
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
            component: loadable(async () =>
              await import(
                './domain/Settings/Moderation/Moderation'
              )
            ),
            dependencies: [
              {
                resource: loadable(async (environment) =>
                  await import(
                    `./domain/Settings/Moderation/__locale__/${getLanguageFromEnvironment(environment)}/index.js`
                  )
                ),
                then: loadMessages
              }
            ],
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
        component: loadable(async () =>
          await import(
            './domain/Settings/Security/RootMultiFactorTotpSetup/RootMultiFactorTotpSetup'
          )
        ),
        dependencies: [
          {
            resource: loadable(async (environment) =>
              await import(
                `./domain/Settings/Security/__locale__/${getLanguageFromEnvironment(environment)}/index.js`
              )
            ),
            then: loadMessages
          }
        ],
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
        component: loadable(async () =>
          await import(
            './domain/Settings/Security/RootRecoveryCodesSetup/RootRecoveryCodesSetup'
          )
        ),
        dependencies: [
          {
            resource: loadable(async (environment) =>
              await import(
                `./domain/Settings/Security/__locale__/${getLanguageFromEnvironment(environment)}/index.js`
              )
            ),
            then: loadMessages
          }
        ],
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
        component: loadable(async () =>
          await import(
            './domain/Profile/Profile'
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
        dependencies: [
          {
            resource: loadable(async (environment) =>
              await import(
                `./domain/NotFound/__locale__/${getLanguageFromEnvironment(environment)}/index.js`
              )
            ),
            then: loadMessages
          }
        ],
        component: loadable(async () =>
          await import(
            './domain/NotFound/NotFound'
          )
        )
      }
    ]
  }
]

export default routes
