import { ReactNode, useMemo } from 'react'
import { AbilityContext } from '@//:modules/authorization/AbilityContext'
import { graphql, useFragment } from 'react-relay/hooks'
import { AccountAuthorizerFragment$key } from '@//:artifacts/AccountAuthorizerFragment.graphql'
import defineAbility from '@//:modules/authorization/defineAbility'
import * as Sentry from '@sentry/nextjs'

interface Props {
  children: ReactNode
  queryRef: AccountAuthorizerFragment$key | null
}

const AccountAuthorizerGQL = graphql`
  fragment AccountAuthorizerFragment on Account {
    reference
    username
    lock {
      __typename
    }
    deleting {
      __typename
    }
    isModerator
    isStaff
    isArtist
  }
`

export default function AccountAuthorizer ({
  queryRef,
  children
}: Props): JSX.Element {
  const data = useFragment(AccountAuthorizerGQL, queryRef)

  const ability = useMemo(() => defineAbility(
    (
      data != null
        ? {
            isModerator: data.isModerator,
            isStaff: data.isStaff,
            isLocked: data.lock != null || data.deleting != null,
            isArtist: data.isArtist
          }
        : null
    )), [data])

  useMemo(() => {
    if (data != null) {
      Sentry.setUser({
        username: data.username,
        id: data.reference
      })
    }
  }, [])

  return (
    <AbilityContext.Provider value={ability}>
      {children}
    </AbilityContext.Provider>
  )
}
