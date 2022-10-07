import { PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import type { ResultJoinQuery } from '@//:artifacts/ResultJoinQuery.graphql'
import { graphql } from 'react-relay'
import { FixedContainer } from '@//:modules/content/PageLayout'
import RootStartJoin from './RootStartJoin/RootStartJoin'

interface Props {
  query: PreloadedQuery<ResultJoinQuery>
  loadQuery: () => void
}

const Query = graphql`
  query ResultJoinQuery($token: String!) @preloadable {
    viewAuthenticationToken(token: $token)  {
      ...RootStartJoinFragment
    }
  }
`

export default function ResultJoin (props: Props): JSX.Element {
  const {
    query,
    loadQuery
  } = props

  const data = usePreloadedQuery<ResultJoinQuery>(
    Query,
    query
  )

  return (
    <FixedContainer>
      <RootStartJoin query={data.viewAuthenticationToken} loadQuery={loadQuery} />
    </FixedContainer>
  )
}
