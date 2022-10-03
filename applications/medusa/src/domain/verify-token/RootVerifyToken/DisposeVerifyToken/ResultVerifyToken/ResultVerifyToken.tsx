import { PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import type { ResultVerifyTokenQuery } from '@//:artifacts/ResultVerifyTokenQuery.graphql'
import { graphql } from 'react-relay'
import EmptyVerifyToken from './EmptyVerifyToken/EmptyVerifyToken'
import ViewVerifyToken from './ViewVerifyToken/ViewVerifyToken'

interface Props {
  query: PreloadedQuery<ResultVerifyTokenQuery>
}

const Query = graphql`
  query ResultVerifyTokenQuery($token: String!, $secret: String) @preloadable {
    viewAuthenticationToken(token: $token, secret: $secret) {
      ...ViewVerifyTokenFragment
    }
  }
`

export default function ResultVerifyToken (props: Props): JSX.Element {
  const {
    query
  } = props

  const data = usePreloadedQuery<ResultVerifyTokenQuery>(
    Query,
    query
  )

  if (data.viewAuthenticationToken == null) {
    return <EmptyVerifyToken />
  }

  return (
    <ViewVerifyToken query={data.viewAuthenticationToken} />
  )
}
