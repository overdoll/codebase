import { graphql, useFragment, useSubscribeToInvalidationState } from 'react-relay/hooks'
import type { ViewAuthenticationTokenJoinFragment$key } from '@//:artifacts/ViewAuthenticationTokenJoinFragment.graphql'
import LobbyAuthenticationTokenJoin from './LobbyAuthenticationTokenJoin/LobbyAuthenticationTokenJoin'
import RegisterAuthenticationToken from './RegisterAuthenticationToken/RegisterAuthenticationToken'
import MultiFactorAuthenticationToken from './MultiFactorAuthenticationToken/MultiFactorAuthenticationToken'
import GrantAuthenticationTokenJoin from './GrantAuthenticationTokenJoin/GrantAuthenticationTokenJoin'

interface Props {
  query: ViewAuthenticationTokenJoinFragment$key
  loadQuery: () => void
}

const Fragment = graphql`
  fragment ViewAuthenticationTokenJoinFragment on AuthenticationToken {
    id
    verified
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
  }
`

export default function ViewAuthenticationTokenJoin (props: Props): JSX.Element {
  const {
    query,
    loadQuery
  } = props

  const data = useFragment(Fragment, query)

  useSubscribeToInvalidationState([data.id], () => {
    loadQuery()
  })

  if (!data.verified) {
    return (
      <LobbyAuthenticationTokenJoin query={data} />
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
