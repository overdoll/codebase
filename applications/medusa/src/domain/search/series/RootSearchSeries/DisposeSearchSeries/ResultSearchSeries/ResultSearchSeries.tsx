import { PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import type { ResultSearchSeriesQuery } from '@//:artifacts/ResultSearchSeriesQuery.graphql'
import { graphql } from 'react-relay'
import EmptySearchSeries from './EmptySearchSeries/EmptySearchSeries'
import MetaSearchSeries from './MetaSearchSeries/MetaSearchSeries'

interface Props {
  query: PreloadedQuery<ResultSearchSeriesQuery>
}

const Query = graphql`
  query ResultSearchSeriesQuery(
    $sortBy: PostsSort!,
    $seriesSlug: String!,
    $seed: String
  ) @preloadable {
    serial(slug: $seriesSlug) {
      ...MetaSearchSeriesFragment
    }
    viewer {
      ...MetaSearchSeriesViewerFragment
    }
  }
`

export default function ResultSearchSeries (props: Props): JSX.Element {
  const { query } = props

  const queryData = usePreloadedQuery<ResultSearchSeriesQuery>(
    Query,
    query
  )

  if (queryData?.serial == null) {
    return <EmptySearchSeries />
  }

  return (
    <MetaSearchSeries seriesQuery={queryData.serial} viewerQuery={queryData.viewer} />
  )
}
