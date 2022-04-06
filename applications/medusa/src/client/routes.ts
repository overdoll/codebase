import { loadable } from '@//:modules/operations/JSResource'
import type { Route } from '@//:modules/routing/router'
import defineAbility from '@//:modules/authorization/defineAbility'
import { AppAbility } from '@//:modules/authorization/types'
import { AccountAuthorizerFragment$data } from '@//:artifacts/AccountAuthorizerFragment.graphql'
import { decodeRouterArguments } from './components/PostsSearch'

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
        }) => i18n._load(getLanguageFromEnvironment(environment), { dateFns: data })
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
        path: '/logout',
        exact: true,
        dependencies: [
          {
            resource: loadable(async (environment) =>
              await import(
                `./domain/Logout/__locale__/${getLanguageFromEnvironment(environment)}/index.js`
              )
            ),
            then: loadMessages
          }
        ],
        component: loadable(async () =>
          await import(
            './domain/Logout/Logout'
          )
        ),
        // When user is logged in, we just want to redirect them since they're already "logged in"
        middleware: [
          ({
            environment,
            history
          }) => {
            const ability = getAbilityFromUser(environment)

            if (ability.can('configure', 'Account')) {
              return true
            }

            history.push('/')
            return false
          }
        ]
      },
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

            if (ability.can('configure', 'Account')) {
              history.push('/')
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

            if (ability.can('configure', 'Account')) {
              history.push('/')
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

            if (ability.cannot('configure', 'Account')) {
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
            './domain/Home/RootHome'
          )
        ),
        dependencies: [
          {
            resource: loadable(async (environment) =>
              await import(
                `./domain/Home/__locale__/${getLanguageFromEnvironment(environment)}/index.js`
              )
            ),
            then: loadMessages
          }
        ],
        prepare: () => {
          const Query = require('@//:artifacts/HomeQuery.graphql')
          return {
            query: {
              query: Query,
              variables: {},
              options: {
                fetchPolicy: 'store-or-network'
              }
            }
          }
        }
      },
      {
        path: '/search',
        exact: true,
        component: loadable(async () =>
          await import(
            './domain/Search/RootSearch'
          )
        ),
        dependencies: [
          {
            resource: loadable(async (environment) =>
              await import(
                `./domain/Search/__locale__/${getLanguageFromEnvironment(environment)}/index.js`
              )
            ),
            then: loadMessages
          }
        ],
        middleware: [
          ({ history }) => {
            if (history.location.search == null || history.location.search === '') {
              history.push('/')
              return false
            }

            return true
          }
        ],
        prepare: ({
          query
        }) => {
          const Query = require('@//:artifacts/SearchQuery.graphql')
          return {
            query: {
              query: Query,
              variables: {
                ...decodeRouterArguments(query)
              },
              options: {
                fetchPolicy: 'store-or-network'
              }
            }
          }
        }
      },
      {
        path: '/clubs',
        exact: true,
        component: loadable(async () =>
          await import(
            './domain/MyClubs/RootMyClubs'
          )
        ),
        dependencies: [
          {
            resource: loadable(async (environment) =>
              await import(
                `./domain/MyClubs/__locale__/${getLanguageFromEnvironment(environment)}/index.js`
              )
            ),
            then: loadMessages
          }
        ],
        prepare: () => {
          const Query = require('@//:artifacts/MyClubsQuery.graphql')
          return {
            query: {
              query: Query,
              variables: {},
              options: {
                fetchPolicy: 'store-or-network'
              }
            }
          }
        }
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
                './domain/Moderation/pages/Queue/Queue'
              )
            ),
            dependencies: [
              {
                resource: loadable(async (environment) =>
                  await import(
                    `./domain/Moderation/pages/Queue/__locale__/${getLanguageFromEnvironment(environment)}/index.js`
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
                './domain/Moderation/pages/History/History'
              )
            ),
            dependencies: [
              {
                resource: loadable(async (environment) =>
                  await import(
                    `./domain/Moderation/pages/History/__locale__/${getLanguageFromEnvironment(environment)}/index.js`
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
          },
          {
            path: '/moderation/reports',
            component: loadable(async () =>
              await import(
                './domain/Moderation/pages/Reports/Reports'
              )
            ),
            dependencies: [
              {
                resource: loadable(async (environment) =>
                  await import(
                    `./domain/Moderation/pages/Reports/__locale__/${getLanguageFromEnvironment(environment)}/index.js`
                  )
                ),
                then: loadMessages
              }
            ],
            middleware: [
              ({
                environment,
                history
              }) => {
                const ability = getAbilityFromUser(environment)

                if (ability.can('staff', 'Post')) {
                  return true
                }
                history.push('/join')
                return false
              }
            ]
          },
          {
            path: '/moderation/post/:reference',
            component: loadable(async () =>
              await import(
                './domain/Moderation/pages/ModerationPost/RootModerationPost'
              )
            ),
            dependencies: [
              {
                resource: loadable(async (environment) =>
                  await import(
                    `./domain/Moderation/pages/ModerationPost/__locale__/${getLanguageFromEnvironment(environment)}/index.js`
                  )
                ),
                then: loadMessages
              }
            ],
            middleware: [
              ({
                environment,
                history
              }) => {
                const ability = getAbilityFromUser(environment)

                if (ability.can('staff', 'Post')) {
                  return true
                }
                history.push('/join')
                return false
              }
            ],
            prepare: ({
              params
            }) => {
              const Query = require('@//:artifacts/ModerationPostQuery.graphql')
              return {
                query: {
                  query: Query,
                  variables: {
                    reference: params.reference
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
        path: '/staff',
        dependencies: [
          {
            resource: loadable(async (environment) =>
              await import(
                `./domain/Staff/__locale__/${getLanguageFromEnvironment(environment)}/index.js`
              )
            ),
            then: loadMessages
          }
        ],
        component: loadable(async () =>
          await import(
            './domain/Staff/Staff'
          )
        ),
        middleware: [
          ({
            environment,
            history
          }) => {
            const ability = getAbilityFromUser(environment)

            if (ability.can('staff', 'Tags') || ability.can('staff', 'Account') || ability.can('staff', 'Club')) {
              return true
            }
            history.push('/join')
            return false
          }
        ],
        routes: [
          {
            path: '/staff/category/create',
            dependencies: [
              {
                resource: loadable(async (environment) =>
                  await import(
                    `./domain/Staff/pages/StaffCategory/StaffCreateCategory/__locale__/${getLanguageFromEnvironment(environment)}/index.js`
                  )
                ),
                then: loadMessages
              }
            ],
            middleware: [
              ({
                environment,
                history
              }) => {
                const ability = getAbilityFromUser(environment)

                if (ability.can('staff', 'Tags')) {
                  return true
                }
                history.push('/join')
                return false
              }
            ],
            component: loadable(async () =>
              await import(
                './domain/Staff/pages/StaffCategory/StaffCreateCategory/RootStaffCreateCategory'
              )
            ),
            prepare: () => {
              const Query = require('@//:artifacts/StaffCreateCategoryQuery.graphql')

              return {
                query: {
                  query: Query,
                  variables: {},
                  options: {
                    fetchPolicy: 'store-or-network'
                  }
                }
              }
            }
          },
          {
            path: '/staff/category/search',
            dependencies: [
              {
                resource: loadable(async (environment) =>
                  await import(
                    `./domain/Staff/pages/StaffCategory/StaffSearchCategories/__locale__/${getLanguageFromEnvironment(environment)}/index.js`
                  )
                ),
                then: loadMessages
              }
            ],
            middleware: [
              ({
                environment,
                history
              }) => {
                const ability = getAbilityFromUser(environment)

                if (ability.can('staff', 'Tags')) {
                  return true
                }
                history.push('/join')
                return false
              }
            ],
            exact: true,
            component: loadable(async () =>
              await import(
                './domain/Staff/pages/StaffCategory/StaffSearchCategories/RootStaffSearchCategories'
              )
            )
          },
          {
            path: '/staff/category/search/:slug',
            dependencies: [
              {
                resource: loadable(async (environment) =>
                  await import(
                    `./domain/Staff/pages/StaffCategory/StaffViewCategory/__locale__/${getLanguageFromEnvironment(environment)}/index.js`
                  )
                ),
                then: loadMessages
              }
            ],
            middleware: [
              ({
                environment,
                history
              }) => {
                const ability = getAbilityFromUser(environment)

                if (ability.can('staff', 'Tags')) {
                  return true
                }
                history.push('/join')
                return false
              }
            ],
            exact: true,
            component: loadable(async () =>
              await import(
                './domain/Staff/pages/StaffCategory/StaffViewCategory/RootStaffViewCategory'
              )
            ),
            prepare: ({ params }) => {
              const Query = require('@//:artifacts/StaffViewCategoryQuery.graphql')

              return {
                query: {
                  query: Query,
                  variables: {
                    slug: params.slug
                  },
                  options: {
                    fetchPolicy: 'store-or-network'
                  }
                }
              }
            }
          },
          {
            path: '/staff/series/create',
            dependencies: [
              {
                resource: loadable(async (environment) =>
                  await import(
                    `./domain/Staff/pages/StaffSeries/StaffCreateSeries/__locale__/${getLanguageFromEnvironment(environment)}/index.js`
                  )
                ),
                then: loadMessages
              }
            ],
            middleware: [
              ({
                environment,
                history
              }) => {
                const ability = getAbilityFromUser(environment)

                if (ability.can('staff', 'Tags')) {
                  return true
                }
                history.push('/join')
                return false
              }
            ],
            component: loadable(async () =>
              await import(
                './domain/Staff/pages/StaffSeries/StaffCreateSeries/RootStaffCreateSeries'
              )
            ),
            prepare: () => {
              const Query = require('@//:artifacts/StaffCreateSeriesQuery.graphql')

              return {
                query: {
                  query: Query,
                  variables: {},
                  options: {
                    fetchPolicy: 'store-or-network'
                  }
                }
              }
            }
          },
          {
            path: '/staff/series/search',
            dependencies: [
              {
                resource: loadable(async (environment) =>
                  await import(
                    `./domain/Staff/pages/StaffSeries/StaffSearchSeries/__locale__/${getLanguageFromEnvironment(environment)}/index.js`
                  )
                ),
                then: loadMessages
              }
            ],
            middleware: [
              ({
                environment,
                history
              }) => {
                const ability = getAbilityFromUser(environment)

                if (ability.can('staff', 'Tags')) {
                  return true
                }
                history.push('/join')
                return false
              }
            ],
            exact: true,
            component: loadable(async () =>
              await import(
                './domain/Staff/pages/StaffSeries/StaffSearchSeries/RootStaffSearchSeries'
              )
            )
          },
          {
            path: '/staff/series/search/:slug',
            dependencies: [
              {
                resource: loadable(async (environment) =>
                  await import(
                    `./domain/Staff/pages/StaffSeries/StaffViewSeries/__locale__/${getLanguageFromEnvironment(environment)}/index.js`
                  )
                ),
                then: loadMessages
              }
            ],
            middleware: [
              ({
                environment,
                history
              }) => {
                const ability = getAbilityFromUser(environment)

                if (ability.can('staff', 'Tags')) {
                  return true
                }
                history.push('/join')
                return false
              }
            ],
            exact: true,
            component: loadable(async () =>
              await import(
                './domain/Staff/pages/StaffSeries/StaffViewSeries/RootStaffViewSeries'
              )
            ),
            prepare: ({ params }) => {
              const Query = require('@//:artifacts/StaffViewSeriesQuery.graphql')

              return {
                query: {
                  query: Query,
                  variables: {
                    slug: params.slug
                  },
                  options: {
                    fetchPolicy: 'store-or-network'
                  }
                }
              }
            }
          },
          {
            path: '/staff/character/create',
            dependencies: [
              {
                resource: loadable(async (environment) =>
                  await import(
                    `./domain/Staff/pages/StaffCharacter/StaffCreateCharacter/__locale__/${getLanguageFromEnvironment(environment)}/index.js`
                  )
                ),
                then: loadMessages
              }
            ],
            middleware: [
              ({
                environment,
                history
              }) => {
                const ability = getAbilityFromUser(environment)

                if (ability.can('staff', 'Tags')) {
                  return true
                }
                history.push('/join')
                return false
              }
            ],
            component: loadable(async () =>
              await import(
                './domain/Staff/pages/StaffCharacter/StaffCreateCharacter/RootStaffCreateCharacter'
              )
            ),
            prepare: () => {
              const Query = require('@//:artifacts/StaffCreateCharacterQuery.graphql')

              return {
                query: {
                  query: Query,
                  variables: {},
                  options: {
                    fetchPolicy: 'store-or-network'
                  }
                }
              }
            }
          },
          {
            path: '/staff/character/search',
            dependencies: [
              {
                resource: loadable(async (environment) =>
                  await import(
                    `./domain/Staff/pages/StaffCharacter/StaffSearchCharacter/__locale__/${getLanguageFromEnvironment(environment)}/index.js`
                  )
                ),
                then: loadMessages
              }
            ],
            middleware: [
              ({
                environment,
                history
              }) => {
                const ability = getAbilityFromUser(environment)

                if (ability.can('staff', 'Tags')) {
                  return true
                }
                history.push('/join')
                return false
              }
            ],
            exact: true,
            component: loadable(async () =>
              await import(
                './domain/Staff/pages/StaffCharacter/StaffSearchCharacter/RootStaffSearchCharacter'
              )
            )
          },
          {
            path: '/staff/character/search/:slug/:seriesSlug',
            dependencies: [
              {
                resource: loadable(async (environment) =>
                  await import(
                    `./domain/Staff/pages/StaffCharacter/StaffViewCharacter/__locale__/${getLanguageFromEnvironment(environment)}/index.js`
                  )
                ),
                then: loadMessages
              }
            ],
            middleware: [
              ({
                environment,
                history
              }) => {
                const ability = getAbilityFromUser(environment)

                if (ability.can('staff', 'Tags')) {
                  return true
                }
                history.push('/join')
                return false
              }
            ],
            exact: true,
            component: loadable(async () =>
              await import(
                './domain/Staff/pages/StaffCharacter/StaffViewCharacter/RootStaffViewCharacter'
              )
            ),
            prepare: ({ params }) => {
              const Query = require('@//:artifacts/StaffViewCharacterQuery.graphql')

              return {
                query: {
                  query: Query,
                  variables: {
                    slug: params.slug,
                    seriesSlug: params.seriesSlug
                  },
                  options: {
                    fetchPolicy: 'store-or-network'
                  }
                }
              }
            }
          },
          {
            path: '/staff/audience/create',
            dependencies: [
              {
                resource: loadable(async (environment) =>
                  await import(
                    `./domain/Staff/pages/StaffAudience/StaffCreateAudience/__locale__/${getLanguageFromEnvironment(environment)}/index.js`
                  )
                ),
                then: loadMessages
              }
            ],
            middleware: [
              ({
                environment,
                history
              }) => {
                const ability = getAbilityFromUser(environment)

                if (ability.can('staff', 'Tags')) {
                  return true
                }
                history.push('/join')
                return false
              }
            ],
            component: loadable(async () =>
              await import(
                './domain/Staff/pages/StaffAudience/StaffCreateAudience/RootStaffCreateAudience'
              )
            ),
            prepare: () => {
              const Query = require('@//:artifacts/StaffCreateAudienceQuery.graphql')

              return {
                query: {
                  query: Query,
                  variables: {},
                  options: {
                    fetchPolicy: 'store-or-network'
                  }
                }
              }
            }
          },
          {
            path: '/staff/audience/search',
            dependencies: [
              {
                resource: loadable(async (environment) =>
                  await import(
                    `./domain/Staff/pages/StaffAudience/StaffSearchAudiences/__locale__/${getLanguageFromEnvironment(environment)}/index.js`
                  )
                ),
                then: loadMessages
              }
            ],
            middleware: [
              ({
                environment,
                history
              }) => {
                const ability = getAbilityFromUser(environment)

                if (ability.can('staff', 'Tags')) {
                  return true
                }
                history.push('/join')
                return false
              }
            ],
            exact: true,
            component: loadable(async () =>
              await import(
                './domain/Staff/pages/StaffAudience/StaffSearchAudiences/RootStaffSearchAudiences'
              )
            )
          },
          {
            path: '/staff/audience/search/:slug',
            dependencies: [
              {
                resource: loadable(async (environment) =>
                  await import(
                    `./domain/Staff/pages/StaffAudience/StaffViewAudience/__locale__/${getLanguageFromEnvironment(environment)}/index.js`
                  )
                ),
                then: loadMessages
              }
            ],
            middleware: [
              ({
                environment,
                history
              }) => {
                const ability = getAbilityFromUser(environment)

                if (ability.can('staff', 'Tags')) {
                  return true
                }
                history.push('/join')
                return false
              }
            ],
            exact: true,
            component: loadable(async () =>
              await import(
                './domain/Staff/pages/StaffAudience/StaffViewAudience/RootStaffViewAudience'
              )
            ),
            prepare: ({ params }) => {
              const Query = require('@//:artifacts/StaffViewAudienceQuery.graphql')

              return {
                query: {
                  query: Query,
                  variables: {
                    slug: params.slug
                  },
                  options: {
                    fetchPolicy: 'store-or-network'
                  }
                }
              }
            }
          },
          {
            path: '/staff/rule/create',
            dependencies: [
              {
                resource: loadable(async (environment) =>
                  await import(
                    `./domain/Staff/pages/StaffRules/StaffCreateRule/__locale__/${getLanguageFromEnvironment(environment)}/index.js`
                  )
                ),
                then: loadMessages
              }
            ],
            middleware: [
              ({
                environment,
                history
              }) => {
                const ability = getAbilityFromUser(environment)

                if (ability.can('staff', 'Tags')) {
                  return true
                }
                history.push('/join')
                return false
              }
            ],
            component: loadable(async () =>
              await import(
                './domain/Staff/pages/StaffRules/StaffCreateRule/RootStaffCreateRule'
              )
            ),
            prepare: () => {
              const Query = require('@//:artifacts/StaffCreateRuleQuery.graphql')

              return {
                query: {
                  query: Query,
                  variables: {},
                  options: {
                    fetchPolicy: 'store-or-network'
                  }
                }
              }
            }
          },
          {
            path: '/staff/rule/search',
            dependencies: [
              {
                resource: loadable(async (environment) =>
                  await import(
                    `./domain/Staff/pages/StaffRules/StaffSearchRules/__locale__/${getLanguageFromEnvironment(environment)}/index.js`
                  )
                ),
                then: loadMessages
              }
            ],
            middleware: [
              ({
                environment,
                history
              }) => {
                const ability = getAbilityFromUser(environment)

                if (ability.can('staff', 'Tags')) {
                  return true
                }
                history.push('/join')
                return false
              }
            ],
            exact: true,
            component: loadable(async () =>
              await import(
                './domain/Staff/pages/StaffRules/StaffSearchRules/RootStaffSearchRules'
              )
            )
          },
          {
            path: '/staff/rule/search/:reference',
            dependencies: [
              {
                resource: loadable(async (environment) =>
                  await import(
                    `./domain/Staff/pages/StaffRules/StaffViewRule/__locale__/${getLanguageFromEnvironment(environment)}/index.js`
                  )
                ),
                then: loadMessages
              }
            ],
            middleware: [
              ({
                environment,
                history
              }) => {
                const ability = getAbilityFromUser(environment)

                if (ability.can('staff', 'Tags')) {
                  return true
                }
                history.push('/join')
                return false
              }
            ],
            exact: true,
            component: loadable(async () =>
              await import(
                './domain/Staff/pages/StaffRules/StaffViewRule/RootStaffViewRule'
              )
            ),
            prepare: ({ params }) => {
              const Query = require('@//:artifacts/StaffViewRuleQuery.graphql')

              return {
                query: {
                  query: Query,
                  variables: {
                    reference: params.reference
                  },
                  options: {
                    fetchPolicy: 'store-or-network'
                  }
                }
              }
            }
          },
          {
            path: '/staff/cancellation-reason/create',
            dependencies: [
              {
                resource: loadable(async (environment) =>
                  await import(
                    `./domain/Staff/pages/StaffCancellationReasons/StaffCreateCancellationReason/__locale__/${getLanguageFromEnvironment(environment)}/index.js`
                  )
                ),
                then: loadMessages
              }
            ],
            middleware: [
              ({
                environment,
                history
              }) => {
                const ability = getAbilityFromUser(environment)

                if (ability.can('staff', 'Tags')) {
                  return true
                }
                history.push('/join')
                return false
              }
            ],
            component: loadable(async () =>
              await import(
                './domain/Staff/pages/StaffCancellationReasons/StaffCreateCancellationReason/RootStaffCreateCancellationReason'
              )
            ),
            prepare: () => {
              const Query = require('@//:artifacts/StaffCreateCancellationReasonQuery.graphql')

              return {
                query: {
                  query: Query,
                  variables: {},
                  options: {
                    fetchPolicy: 'store-or-network'
                  }
                }
              }
            }
          },
          {
            path: '/staff/cancellation-reason/search',
            dependencies: [
              {
                resource: loadable(async (environment) =>
                  await import(
                    `./domain/Staff/pages/StaffCancellationReasons/StaffSearchCancellationReasons/__locale__/${getLanguageFromEnvironment(environment)}/index.js`
                  )
                ),
                then: loadMessages
              }
            ],
            middleware: [
              ({
                environment,
                history
              }) => {
                const ability = getAbilityFromUser(environment)

                if (ability.can('staff', 'Tags')) {
                  return true
                }
                history.push('/join')
                return false
              }
            ],
            exact: true,
            component: loadable(async () =>
              await import(
                './domain/Staff/pages/StaffCancellationReasons/StaffSearchCancellationReasons/RootStaffSearchCancellationReasons'
              )
            )
          },
          {
            path: '/staff/cancellation-reason/search/:reference',
            dependencies: [
              {
                resource: loadable(async (environment) =>
                  await import(
                    `./domain/Staff/pages/StaffCancellationReasons/StaffViewCancellationReason/__locale__/${getLanguageFromEnvironment(environment)}/index.js`
                  )
                ),
                then: loadMessages
              }
            ],
            middleware: [
              ({
                environment,
                history
              }) => {
                const ability = getAbilityFromUser(environment)

                if (ability.can('staff', 'Tags')) {
                  return true
                }
                history.push('/join')
                return false
              }
            ],
            exact: true,
            component: loadable(async () =>
              await import(
                './domain/Staff/pages/StaffCancellationReasons/StaffViewCancellationReason/RootStaffViewCancellationReason'
              )
            ),
            prepare: ({ params }) => {
              const Query = require('@//:artifacts/StaffViewCancellationReasonQuery.graphql')

              return {
                query: {
                  query: Query,
                  variables: {
                    reference: params.reference
                  },
                  options: {
                    fetchPolicy: 'store-or-network'
                  }
                }
              }
            }
          },
          {
            path: '/staff/account/:username',
            dependencies: [
              {
                resource: loadable(async (environment) =>
                  await import(
                    `./domain/Staff/pages/StaffAccount/__locale__/${getLanguageFromEnvironment(environment)}/index.js`
                  )
                ),
                then: loadMessages
              }
            ],
            middleware: [
              ({
                environment,
                history
              }) => {
                const ability = getAbilityFromUser(environment)

                if (ability.can('staff', 'Account')) {
                  return true
                }
                history.push('/join')
                return false
              }
            ],
            exact: true,
            component: loadable(async () =>
              await import(
                './domain/Staff/pages/StaffAccount/RootStaffAccount'
              )
            ),
            prepare: ({ params }) => {
              const Query = require('@//:artifacts/StaffAccountQuery.graphql')

              return {
                query: {
                  query: Query,
                  variables: {
                    username: params.username
                  },
                  options: {
                    fetchPolicy: 'store-or-network'
                  }
                }
              }
            }
          },
          {
            path: '/staff/club/:slug',
            dependencies: [
              {
                resource: loadable(async (environment) =>
                  await import(
                    `./domain/Staff/pages/StaffClub/__locale__/${getLanguageFromEnvironment(environment)}/index.js`
                  )
                ),
                then: loadMessages
              }
            ],
            middleware: [
              ({
                environment,
                history
              }) => {
                const ability = getAbilityFromUser(environment)

                if (ability.can('staff', 'Club')) {
                  return true
                }
                history.push('/join')
                return false
              }
            ],
            exact: true,
            component: loadable(async () =>
              await import(
                './domain/Staff/pages/StaffClub/RootStaffClub'
              )
            ),
            prepare: ({ params }) => {
              const Query = require('@//:artifacts/StaffClubQuery.graphql')

              return {
                query: {
                  query: Query,
                  variables: {
                    slug: params.slug
                  },
                  options: {
                    fetchPolicy: 'store-or-network'
                  }
                }
              }
            }
          },
          {
            path: '/staff/subscription/:reference',
            dependencies: [
              {
                resource: loadable(async (environment) =>
                  await import(
                    `./domain/Staff/pages/StaffAccountClubSupporterSubscription/__locale__/${getLanguageFromEnvironment(environment)}/index.js`
                  )
                ),
                then: loadMessages
              }
            ],
            middleware: [
              ({
                environment,
                history
              }) => {
                const ability = getAbilityFromUser(environment)

                if (ability.can('staff', 'Account')) {
                  return true
                }
                history.push('/join')
                return false
              }
            ],
            exact: true,
            component: loadable(async () =>
              await import(
                './domain/Staff/pages/StaffAccountClubSupporterSubscription/RootStaffAccountClubSupporterSubscription'
              )
            ),
            prepare: ({ params }) => {
              const Query = require('@//:artifacts/StaffAccountClubSupporterSubscriptionQuery.graphql')

              return {
                query: {
                  query: Query,
                  variables: {
                    reference: params.reference
                  },
                  options: {
                    fetchPolicy: 'store-or-network'
                  }
                }
              }
            }
          },
          {
            path: '/staff/transaction/:reference',
            dependencies: [
              {
                resource: loadable(async (environment) =>
                  await import(
                    `./domain/Staff/pages/StaffAccountTransaction/__locale__/${getLanguageFromEnvironment(environment)}/index.js`
                  )
                ),
                then: loadMessages
              }
            ],
            middleware: [
              ({
                environment,
                history
              }) => {
                const ability = getAbilityFromUser(environment)

                if (ability.can('staff', 'Account')) {
                  return true
                }
                history.push('/join')
                return false
              }
            ],
            exact: true,
            component: loadable(async () =>
              await import(
                './domain/Staff/pages/StaffAccountTransaction/RootStaffAccountTransaction'
              )
            ),
            prepare: ({ params }) => {
              const Query = require('@//:artifacts/StaffAccountTransactionQuery.graphql')

              return {
                query: {
                  query: Query,
                  variables: {
                    reference: params.reference
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

            if (ability.can('configure', 'Account')) {
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
              const Query = require('@//:artifacts/AccountSettingsQuery.graphql')

              return {
                query: {
                  query: Query,
                  variables: {},
                  options: {
                    fetchPolicy: 'store-or-network'
                  }
                }
              }
            },
            routes: [
              {
                path: '/settings/profile/username',
                component: loadable(async () =>
                  await import(
                    './domain/Settings/Profile/RootUsername/RootUsername'
                  )
                ),
                dependencies: [
                  {
                    resource: loadable(async (environment) =>
                      await import(
                        `./domain/Settings/Profile/RootUsername/__locale__/${getLanguageFromEnvironment(environment)}/index.js`
                      )
                    ),
                    then: loadMessages
                  }
                ],
                prepare: () => {
                  const Query = require('@//:artifacts/UsernameQuery.graphql')

                  return {
                    query: {
                      query: Query,
                      variables: {},
                      options: {
                        fetchPolicy: 'store-or-network'
                      }
                    }
                  }
                }
              },
              {
                path: '/settings/profile/emails',
                component: loadable(async () =>
                  await import(
                    './domain/Settings/Profile/RootEmails/RootEmails'
                  )
                ),
                dependencies: [
                  {
                    resource: loadable(async (environment) =>
                      await import(
                        `./domain/Settings/Profile/RootEmails/__locale__/${getLanguageFromEnvironment(environment)}/index.js`
                      )
                    ),
                    then: loadMessages
                  }
                ],
                prepare: () => {
                  const Query = require('@//:artifacts/EmailsQuery.graphql')

                  return {
                    query: {
                      query: Query,
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
              const Query = require('@//:artifacts/MultiFactorSettingsQuery.graphql')

              return {
                query: {
                  query: Query,
                  variables: {},
                  options: {
                    fetchPolicy: 'store-or-network'
                  }
                }
              }
            },
            routes: [
              {
                path: '/settings/security/multi-factor/totp',
                component: loadable(async () =>
                  await import(
                    './domain/Settings/Security/RootMultiFactorTotpSetup/RootMultiFactorTotpSetup'
                  )
                ),
                dependencies: [
                  {
                    resource: loadable(async (environment) =>
                      await import(
                        `./domain/Settings/Security/RootMultiFactorTotpSetup/__locale__/${getLanguageFromEnvironment(environment)}/index.js`
                      )
                    ),
                    then: loadMessages
                  }
                ],
                prepare: () => {
                  const Query = require('@//:artifacts/MultiFactorTotpHeaderQuery.graphql')

                  return {
                    query: {
                      query: Query,
                      variables: {},
                      options: {
                        fetchPolicy: 'store-or-network'
                      }
                    }
                  }
                }
              },
              {
                path: '/settings/security/multi-factor/recovery-codes',
                component: loadable(async () =>
                  await import(
                    './domain/Settings/Security/RootRecoveryCodesSetup/RootRecoveryCodesSetup'
                  )
                ),
                dependencies: [
                  {
                    resource: loadable(async (environment) =>
                      await import(
                        `./domain/Settings/Security/RootRecoveryCodesSetup/__locale__/${getLanguageFromEnvironment(environment)}/index.js`
                      )
                    ),
                    then: loadMessages
                  }
                ],
                prepare: () => {
                  const Query = require('@//:artifacts/RecoveryCodesSetupQuery.graphql')

                  return {
                    query: {
                      query: Query,
                      variables: {},
                      options: {
                        fetchPolicy: 'store-or-network'
                      }
                    }
                  }
                }
              },
              {
                path: '/settings/security/sessions',
                component: loadable(async () =>
                  await import(
                    './domain/Settings/Security/RootSessionsSettings/RootSessionsSettings'
                  )
                ),
                dependencies: [
                  {
                    resource: loadable(async (environment) =>
                      await import(
                        `./domain/Settings/Security/RootSessionsSettings/__locale__/${getLanguageFromEnvironment(environment)}/index.js`
                      )
                    ),
                    then: loadMessages
                  }
                ],
                prepare: () => {
                  const Query = require('@//:artifacts/SessionsSettingsQuery.graphql')

                  return {
                    query: {
                      query: Query,
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
          },
          {
            path: '/settings/preferences',
            component: loadable(async () =>
              await import(
                './domain/Settings/Preferences/Preferences'
              )
            ),
            dependencies: [
              {
                resource: loadable(async (environment) =>
                  await import(
                    `./domain/Settings/Preferences/__locale__/${getLanguageFromEnvironment(environment)}/index.js`
                  )
                ),
                then: loadMessages
              }
            ],
            prepare: () => {
              const Query = require('@//:artifacts/CurationSettingsQuery.graphql')
              return {
                curationQuery: {
                  query: Query,
                  variables: {},
                  options: {
                    fetchPolicy: 'store-or-network'
                  }
                }
              }
            },
            routes: [
              {
                path: '/settings/preferences/curation-profile',
                component: loadable(async () =>
                  await import(
                    './domain/Settings/Preferences/RootCurationProfileSetup/RootCurationProfileSetup'
                  )
                ),
                dependencies: [
                  {
                    resource: loadable(async (environment) =>
                      await import(
                        `./domain/Settings/Preferences/RootCurationProfileSetup/__locale__/${getLanguageFromEnvironment(environment)}/index.js`
                      )
                    ),
                    then: loadMessages
                  }
                ],
                prepare: () => {
                  const Query = require('@//:artifacts/CurationProfileSetupQuery.graphql')

                  return {
                    curationQuery: {
                      query: Query,
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
            path: '/settings/billing',
            component: loadable(async () =>
              await import(
                './domain/Settings/Billing/Billing'
              )
            ),
            dependencies: [
              {
                resource: loadable(async (environment) =>
                  await import(
                    `./domain/Settings/Billing/__locale__/${getLanguageFromEnvironment(environment)}/index.js`
                  )
                ),
                then: loadMessages
              }
            ],
            routes: [
              {
                path: '/settings/billing/subscriptions',
                dependencies: [
                  {
                    resource: loadable(async (environment) =>
                      await import(
                        `./domain/Settings/Billing/pages/RootSubscriptionsSettings/__locale__/${getLanguageFromEnvironment(environment)}/index.js`
                      )
                    ),
                    then: loadMessages
                  }
                ],
                component: loadable(async () =>
                  await import(
                    './domain/Settings/Billing/pages/RootSubscriptionsSettings/RootSubscriptionsSettings'
                  )
                ),
                prepare: () => {
                  const Query = require('@//:artifacts/SubscriptionsSettingsQuery.graphql')
                  return {
                    subscriptionsQuery: {
                      query: Query,
                      variables: {},
                      options: {
                        fetchPolicy: 'store-or-network'
                      }
                    }
                  }
                }
              },
              {
                path: '/settings/billing/payment-methods',
                dependencies: [
                  {
                    resource: loadable(async (environment) =>
                      await import(
                        `./domain/Settings/Billing/pages/RootSavedPaymentMethodsSettings/__locale__/${getLanguageFromEnvironment(environment)}/index.js`
                      )
                    ),
                    then: loadMessages
                  }
                ],
                component: loadable(async () =>
                  await import(
                    './domain/Settings/Billing/pages/RootSavedPaymentMethodsSettings/RootSavedPaymentMethodsSettings'
                  )
                ),
                prepare: () => {
                  const Query = require('@//:artifacts/SavedPaymentMethodsSettingsQuery.graphql')
                  return {
                    paymentMethodsQuery: {
                      query: Query,
                      variables: {},
                      options: {
                        fetchPolicy: 'store-or-network'
                      }
                    }
                  }
                }
              },
              {
                path: '/settings/billing/transactions',
                dependencies: [
                  {
                    resource: loadable(async (environment) =>
                      await import(
                        `./domain/Settings/Billing/pages/RootTransactionsSettings/__locale__/${getLanguageFromEnvironment(environment)}/index.js`
                      )
                    ),
                    then: loadMessages
                  }
                ],
                component: loadable(async () =>
                  await import(
                    './domain/Settings/Billing/pages/RootTransactionsSettings/RootTransactionsSettings'
                  )
                ),
                prepare: () => {
                  const Query = require('@//:artifacts/TransactionsSettingsQuery.graphql')
                  return {
                    query: {
                      query: Query,
                      variables: {},
                      options: {
                        fetchPolicy: 'store-or-network'
                      }
                    }
                  }
                }
              },
              {
                path: '/settings/billing/subscription/:reference',
                dependencies: [
                  {
                    resource: loadable(async (environment) =>
                      await import(
                        `./domain/Settings/Billing/pages/RootAccountClubSupporterSubscriptionSettings/__locale__/${getLanguageFromEnvironment(environment)}/index.js`
                      )
                    ),
                    then: loadMessages
                  }
                ],
                component: loadable(async () =>
                  await import(
                    './domain/Settings/Billing/pages/RootAccountClubSupporterSubscriptionSettings/RootAccountClubSupporterSubscriptionSettings'
                  )
                ),
                prepare: ({
                  params
                }) => {
                  const Query = require('@//:artifacts/AccountClubSupporterSubscriptionSettingsQuery.graphql')
                  return {
                    query: {
                      query: Query,
                      variables: {
                        reference: params.reference
                      },
                      options: {
                        fetchPolicy: 'store-or-network'
                      }
                    }
                  }
                }
              }
            ]
          }
        ]
      },
      {
        path: '/:slug/p/:reference',
        dependencies: [
          {
            resource: loadable(async (environment) =>
              await import(
                `./domain/PublicPost/__locale__/${getLanguageFromEnvironment(environment)}/index.js`
              )
            ),
            then: loadMessages
          }
        ],
        exact: true,
        component: loadable(async () =>
          await import(
            './domain/PublicPost/RootPublicPost'
          )
        ),
        prepare: ({
          params,
          query
        }) => {
          const Query = require('@//:artifacts/PublicPostQuery.graphql')
          return {
            query: {
              query: Query,
              variables: {
                reference: params.reference ?? ''
              },
              options: {
                fetchPolicy: 'store-or-network'
              }
            }
          }
        }
      },
      {
        path: '/m/:username',
        exact: true,
        dependencies: [
          {
            resource: loadable(async (environment) =>
              await import(
                `./domain/Profile/__locale__/${getLanguageFromEnvironment(environment)}/index.js`
              )
            ),
            then: loadMessages
          }
        ],
        component: loadable(async () =>
          await import(
            './domain/Profile/RootProfile'
          )
        ),
        prepare: ({
          params,
          query
        }) => {
          const Query = require('@//:artifacts/ProfileQuery.graphql')
          return {
            query: {
              query: Query,
              variables: {
                username: params.username
              },
              options: {
                fetchPolicy: 'store-or-network'
              }
            }
          }
        }
      },
      {
        path: '/configure/create-club',
        dependencies: [
          {
            resource: loadable(async (environment) =>
              await import(
                `./domain/ManageClub/pages/CreateClub/__locale__/${getLanguageFromEnvironment(environment)}/index.js`
              )
            ),
            then: loadMessages
          }
        ],
        component: loadable(async () =>
          await import(
            './domain/ManageClub/pages/CreateClub/RootCreateClub'
          )
        ),
        prepare: ({
          params,
          query
        }) => {
          const Query = require('@//:artifacts/CreateClubQuery.graphql')
          return {
            query: {
              query: Query,
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

            if (ability.can('create', 'Club')) {
              return true
            }
            history.push('/')
            return false
          }
        ]
      },
      {
        path: '/club/:slug',
        dependencies: [
          {
            resource: loadable(async (environment) =>
              await import(
                `./domain/ManageClub/__locale__/${getLanguageFromEnvironment(environment)}/index.js`
              )
            ),
            then: loadMessages
          }
        ],
        middleware: [
          ({
            environment,
            history
          }) => {
            const ability = getAbilityFromUser(environment)

            if (ability.can('configure', 'Club')) {
              return true
            }
            history.push('/join')
            return false
          }
        ],
        component: loadable(async () =>
          await import(
            './domain/ManageClub/RootManageClub'
          )
        ),
        prepare: ({
          params,
          query
        }) => {
          const Query = require('@//:artifacts/SelectClubsQuery.graphql')
          return {
            query: {
              query: Query,
              variables: {
                slug: params.slug
              },
              options: {
                fetchPolicy: 'store-or-network'
              }
            }
          }
        },
        routes: [
          {
            path: '/club/:slug/:entity(home)',
            dependencies: [
              {
                resource: loadable(async (environment) =>
                  await import(
                    `./domain/ManageClub/pages/ClubHome/__locale__/${getLanguageFromEnvironment(environment)}/index.js`
                  )
                ),
                then: loadMessages
              }
            ],
            component: loadable(async () =>
              await import(
                './domain/ManageClub/pages/ClubHome/RootClubHome'
              )
            ),
            prepare: ({
              params,
              query
            }) => {
              const Query = require('@//:artifacts/ClubHomeQuery.graphql')
              return {
                query: {
                  query: Query,
                  variables: {
                    slug: params.slug
                  },
                  options: {
                    fetchPolicy: 'store-or-network'
                  }
                }
              }
            }
          },
          {
            path: '/club/:slug/:entity(members)',
            dependencies: [
              {
                resource: loadable(async (environment) =>
                  await import(
                    `./domain/ManageClub/pages/ClubMembers/__locale__/${getLanguageFromEnvironment(environment)}/index.js`
                  )
                ),
                then: loadMessages
              }
            ],
            component: loadable(async () =>
              await import(
                './domain/ManageClub/pages/ClubMembers/RootClubMembers'
              )
            ),
            prepare: ({
              params,
              query
            }) => {
              const Query = require('@//:artifacts/ClubMembersQuery.graphql')
              return {
                query: {
                  query: Query,
                  variables: {
                    slug: params.slug
                  },
                  options: {
                    fetchPolicy: 'store-or-network'
                  }
                }
              }
            }
          },
          {
            path: '/club/:slug/:entity(settings)',
            dependencies: [
              {
                resource: loadable(async (environment) =>
                  await import(
                    `./domain/ManageClub/pages/ClubSettings/__locale__/${getLanguageFromEnvironment(environment)}/index.js`
                  )
                ),
                then: loadMessages
              }
            ],
            component: loadable(async () =>
              await import(
                './domain/ManageClub/pages/ClubSettings/RootClubSettings'
              )
            ),
            prepare: ({
              params
            }) => {
              const Query = require('@//:artifacts/ClubSettingsQuery.graphql')
              return {
                query: {
                  query: Query,
                  variables: {
                    slug: params.slug
                  },
                  options: {
                    fetchPolicy: 'store-or-network'
                  }
                }
              }
            },
            routes: [
              {
                path: '/club/:slug/:entity(settings)/name',
                dependencies: [
                  {
                    resource: loadable(async (environment) =>
                      await import(
                        `./domain/ManageClub/pages/ClubSettings/RootChangeClubName/__locale__/${getLanguageFromEnvironment(environment)}/index.js`
                      )
                    ),
                    then: loadMessages
                  }
                ],
                component: loadable(async () =>
                  await import(
                    './domain/ManageClub/pages/ClubSettings/RootChangeClubName/RootChangeClubName'
                  )
                ),
                prepare: ({
                  params
                }) => {
                  const Query = require('@//:artifacts/ChangeClubNameQuery.graphql')
                  return {
                    query: {
                      query: Query,
                      variables: {
                        slug: params.slug
                      },
                      options: {
                        fetchPolicy: 'store-or-network'
                      }
                    }
                  }
                }
              },
              {
                path: '/club/:slug/:entity(settings)/thumbnail',
                dependencies: [
                  {
                    resource: loadable(async (environment) =>
                      await import(
                        `./domain/ManageClub/pages/ClubSettings/RootChangeClubThumbnail/__locale__/${getLanguageFromEnvironment(environment)}/index.js`
                      )
                    ),
                    then: loadMessages
                  }
                ],
                component: loadable(async () =>
                  await import(
                    './domain/ManageClub/pages/ClubSettings/RootChangeClubThumbnail/RootChangeClubThumbnail'
                  )
                ),
                prepare: ({
                  params
                }) => {
                  const Query = require('@//:artifacts/ChangeClubThumbnailQuery.graphql')
                  return {
                    query: {
                      query: Query,
                      variables: {
                        slug: params.slug
                      },
                      options: {
                        fetchPolicy: 'store-or-network'
                      }
                    }
                  }
                }
              },
              {
                path: '/club/:slug/:entity(settings)/aliases',
                dependencies: [
                  {
                    resource: loadable(async (environment) =>
                      await import(
                        `./domain/ManageClub/pages/ClubSettings/RootClubAliases/__locale__/${getLanguageFromEnvironment(environment)}/index.js`
                      )
                    ),
                    then: loadMessages
                  }
                ],
                component: loadable(async () =>
                  await import(
                    './domain/ManageClub/pages/ClubSettings/RootClubAliases/RootClubAliases'
                  )
                ),
                prepare: ({
                  params
                }) => {
                  const Query = require('@//:artifacts/ClubAliasesQuery.graphql')
                  return {
                    query: {
                      query: Query,
                      variables: {
                        slug: params.slug
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
            path: '/club/:slug/:entity(posts)',
            dependencies: [
              {
                resource: loadable(async (environment) =>
                  await import(
                    `./domain/ManageClub/pages/ClubPosts/__locale__/${getLanguageFromEnvironment(environment)}/index.js`
                  )
                ),
                then: loadMessages
              }
            ],
            component: loadable(async () =>
              await import(
                './domain/ManageClub/pages/ClubPosts/RootClubPosts'
              )
            ),
            prepare: ({
              params,
              query
            }) => {
              const Query = require('@//:artifacts/ClubPostsQuery.graphql')
              return {
                query: {
                  query: Query,
                  variables: {
                    slug: params.slug,
                    state: query.get('state')
                  },
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

                if (ability.can('create', 'Post')) {
                  return true
                }
                history.push('/join')
                return false
              }
            ]
          },
          {
            path: '/club/:slug/:entity(create-post)',
            dependencies: [
              {
                resource: loadable(async (environment) =>
                  await import(
                    `./domain/ManageClub/pages/CreatePost/__locale__/${getLanguageFromEnvironment(environment)}/index.js`
                  )
                ),
                then: loadMessages
              }
            ],
            component: loadable(async () =>
              await import(
                './domain/ManageClub/pages/CreatePost/CreatePost'
              )
            ),
            prepare: ({
              params,
              query
            }) => {
              const Query = require('@//:artifacts/PostCreatorQuery.graphql')
              return {
                query: {
                  query: Query,
                  variables: {
                    reference: query.get('post') ?? '',
                    slug: params.slug
                  },
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

                if (ability.can('create', 'Post')) {
                  return true
                }
                history.push('/join')
                return false
              }
            ]
          }
        ]
      },
      {
        path: '/help',
        exact: true,
        component: loadable(async () =>
          await import(
            './domain/Help/Help'
          )
        ),
        dependencies: [
          {
            resource: loadable(async (environment) =>
              await import(
                `./domain/Help/__locale__/${getLanguageFromEnvironment(environment)}/index.js`
              )
            ),
            then: loadMessages
          }
        ]
      },
      {
        path: '/:slug',
        exact: true,
        component: loadable(async () =>
          await import(
            './domain/ClubPublicPage/RootClubPublicPage'
          )
        ),
        dependencies: [
          {
            resource: loadable(async (environment) =>
              await import(
                `./domain/ClubPublicPage/__locale__/${getLanguageFromEnvironment(environment)}/index.js`
              )
            ),
            then: loadMessages
          }
        ],
        prepare: ({
          params,
          query
        }) => {
          const Query = require('@//:artifacts/ClubPublicPageQuery.graphql')
          return {
            query: {
              query: Query,
              variables: {
                slug: params.slug
              },
              options: {
                fetchPolicy: 'store-or-network'
              }
            }
          }
        }
      },
      {
        path: '/:slug/:entity(posts)',
        exact: true,
        component: loadable(async () =>
          await import(
            './domain/ClubPublicPosts/RootClubPublicPosts'
          )
        ),
        dependencies: [
          {
            resource: loadable(async (environment) =>
              await import(
                `./domain/ClubPublicPosts/__locale__/${getLanguageFromEnvironment(environment)}/index.js`
              )
            ),
            then: loadMessages
          }
        ],
        middleware: [
          ({ history }) => {
            if (history.location.search == null || history.location.search === '') {
              history.push('/')
              return false
            }

            return true
          }
        ],
        prepare: ({
          query,
          params
        }) => {
          const Query = require('@//:artifacts/ClubPublicPostsQuery.graphql')
          return {
            query: {
              query: Query,
              variables: {
                slug: params.slug,
                ...decodeRouterArguments(query)
              },
              options: {
                fetchPolicy: 'store-or-network'
              }
            }
          }
        }
      },
      {
        path: '*',
        exact: false,
        dependencies: [
          {
            resource: loadable(async (environment) =>
              await import(
                `./domain/CatchAll/__locale__/${getLanguageFromEnvironment(environment)}/index.js`
              )
            ),
            then: loadMessages
          }
        ],
        component: loadable(async () =>
          await import(
            './domain/CatchAll/CatchAll'
          )
        )
      }
    ]
  }
]

export default routes
