import { PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import type { ResultHomeQuery } from '@//:artifacts/ResultHomeQuery.graphql'
import { graphql } from 'react-relay'
import MetaHome from './MetaHome/MetaHome'

interface Props {
  query: PreloadedQuery<ResultHomeQuery>
}

const Query = graphql`
  query ResultHomeQuery($seed: String) @preloadable {
    ...MetaHomeFragment
    viewer {
      ...MetaHomeViewerFragment
    }
  }
`

export default function ResultHome (props: Props): JSX.Element {
  const { query } = props

  const queryData = usePreloadedQuery<ResultHomeQuery>(
    Query,
    query
  )

  return (
    <MetaHome rootQuery={queryData} viewerQuery={queryData.viewer} />
  )
}
