import { PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import type { ResultRandomQuery } from '@//:artifacts/ResultRandomQuery.graphql'
import { graphql } from 'react-relay'
import MetaRandom from './MetaRandom/MetaRandom'

interface Props {
  query: PreloadedQuery<ResultRandomQuery>
}

const Query = graphql`
  query ResultRandomQuery($seed: String) @preloadable {
    ...MetaRandomFragment
    viewer {
      ...MetaRandomViewerFragment
    }
  }
`

export default function ResultRandom (props: Props): JSX.Element {
  const { query } = props

  const queryData = usePreloadedQuery<ResultRandomQuery>(
    Query,
    query
  )

  return (
    <MetaRandom rootQuery={queryData} viewerQuery={queryData.viewer} />
  )
}
