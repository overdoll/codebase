import { graphql, useFragment } from 'react-relay/hooks'
import type { ViewAuthenticationTokenJoinFragment$key } from '@//:artifacts/ViewAuthenticationTokenJoinFragment.graphql'
import LobbyAuthenticationTokenJoin from './LobbyAuthenticationTokenJoin/LobbyAuthenticationTokenJoin'
import RegisterAuthenticationToken from './RegisterAuthenticationToken/RegisterAuthenticationToken'
import MultiFactorAuthenticationToken from './MultiFactorAuthenticationToken/MultiFactorAuthenticationToken'
import GrantAuthenticationTokenJoin from './GrantAuthenticationTokenJoin/GrantAuthenticationTokenJoin'
import { usePageVisibility } from '@//:modules/hooks/usePageVisibility'
import { useUpdateEffect } from 'usehooks-ts'
import CodeAuthenticationTokenJoin from './CodeAuthenticationTokenJoin/CodeAuthenticationTokenJoin'

interface Props {
  query: ViewAuthenticationTokenJoinFragment$key
  loadQuery: () => void
}

const Fragment = graphql`
  fragment ViewAuthenticationTokenJoinFragment on AuthenticationToken {
    id
    verified
    method
    accountStatus {
      registered
      multiFactor {
        __typename
      }
    }
    ...GrantAuthenticationTokenJoinFragment
    ...LobbyAuthenticationTokenJoinFragment
    ...MultiFactorAuthenticationTokenFragment
    ...RegisterAuthenticationTokenFragment
    ...CodeAuthenticationTokenJoinFragment
  }
`

export default function ViewAuthenticationTokenJoin (props: Props): JSX.Element {
  const {
    query,
    loadQuery
  } = props

  const data = useFragment(Fragment, query)

  const isVisible = usePageVisibility()

  // if the user tabs back in we should reload the query
  useUpdateEffect(() => {
    if (isVisible && data?.accountStatus != null && data?.verified) {
      loadQuery()
    }
  }, [isVisible, data])

  if (!data.verified && data.method === 'MAGIC_LINK') {
    return (
      <LobbyAuthenticationTokenJoin query={data} />
    )
  }

  if (!data.verified && data.method === 'CODE') {
    return (
      <CodeAuthenticationTokenJoin query={data} />
    )
  }

  if (data.accountStatus?.registered === false) {
    return <RegisterAuthenticationToken query={data} />
  }

  // Check if the user has multi-factor enabled and show them the flow if they do
  if (data.accountStatus?.multiFactor !== null) {
    return <MultiFactorAuthenticationToken query={data} />
  }

  // This one logs you in with the token - will error out if you try to log in if multiFactor isn't an empty array
  return (<GrantAuthenticationTokenJoin query={data} />)
}
