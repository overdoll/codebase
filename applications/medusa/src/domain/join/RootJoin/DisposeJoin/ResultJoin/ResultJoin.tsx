import { PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import type { ResultJoinQuery } from '@//:artifacts/ResultJoinQuery.graphql'
import { graphql } from 'react-relay'
import StartJoin from './StartJoin/StartJoin'
import { FixedContainer } from '@//:modules/content/PageLayout'

interface Props {
  query: PreloadedQuery<ResultJoinQuery>
  loadQuery: () => void
}

const Query = graphql`
  query ResultJoinQuery($token: String!) @preloadable {
    viewAuthenticationToken(token: $token)  {
      ...StartJoinFragment
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
      <StartJoin query={data.viewAuthenticationToken} loadQuery={loadQuery} />
    </FixedContainer>
  )
}
