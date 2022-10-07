import { useLazyLoadQuery } from 'react-relay/hooks'
import type { RootModalJoinQuery } from '@//:artifacts/RootModalJoinQuery.graphql'
import { graphql } from 'react-relay'
import RootStartJoin from '../../../../../../join/RootJoin/DisposeJoin/ResultJoin/RootStartJoin/RootStartJoin'
import { ComponentSearchArguments } from '@//:modules/content/HookedComponents/Search/types'

interface Props extends ComponentSearchArguments<any> {
  loadQuery: () => void
}

const Query = graphql`
  query RootModalJoinQuery($token: String!) @preloadable {
    viewAuthenticationToken(token: $token)  {
      ...RootStartJoinFragment
    }
  }
`

export default function RootModalJoin (props: Props): JSX.Element {
  const {
    loadQuery,
    searchArguments
  } = props

  const data = useLazyLoadQuery<RootModalJoinQuery>(
    Query,
    searchArguments.variables,
    searchArguments.options
  )

  return (
    <RootStartJoin query={data.viewAuthenticationToken} loadQuery={loadQuery} />
  )
}
