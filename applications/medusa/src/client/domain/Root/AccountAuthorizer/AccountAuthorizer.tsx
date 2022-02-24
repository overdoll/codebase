import { ReactNode, useMemo } from 'react'
import { AbilityContext } from '@//:modules/authorization/AbilityContext'
import { graphql, useFragment } from 'react-relay/hooks'
import { AccountAuthorizerFragment$key } from '@//:artifacts/AccountAuthorizerFragment.graphql'
import defineAbility from '@//:modules/authorization/defineAbility'

interface Props {
  children: ReactNode
  queryRef: AccountAuthorizerFragment$key | null
}

const AccountAuthorizerGQL = graphql`
  fragment AccountAuthorizerFragment on Account {
    lock {
      __typename
    }
    isModerator
    isStaff
    clubs {
      edges {
        node {
          slug
          slugAliases {
            slug
          }
        }
      }
    }
  }
`

export default function AccountAuthorizer ({
  queryRef,
  children
}: Props): JSX.Element {
  const data = useFragment(AccountAuthorizerGQL, queryRef)

  const canManageClubs = data?.clubs != null
    ? [...data?.clubs.edges.map((item) => item.node.slug),
        ...data?.clubs.edges.reduce((accum, item) => [...accum,
          ...item.node.slugAliases
        ], [])]
    : []

  const ability = useMemo(() => defineAbility(
    (
      data != null
        ? {
            isModerator: data.isModerator,
            isStaff: data.isStaff,
            isLocked: data.lock != null,
            clubs: canManageClubs as string[]
          }
        : null
    )), [data])

  return (
    <AbilityContext.Provider value={ability}>
      {children}
    </AbilityContext.Provider>
  )
}
