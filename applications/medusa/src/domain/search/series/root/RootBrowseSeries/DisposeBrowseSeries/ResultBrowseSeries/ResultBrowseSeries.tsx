import { PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import { ResultBrowseSeriesQuery } from '@//:artifacts/ResultBrowseSeriesQuery.graphql'
import { graphql } from 'react-relay'
import MetaBrowseSeries from './MetaBrowseSeries/MetaBrowseSeries'

interface Props {
  query: PreloadedQuery<ResultBrowseSeriesQuery>
}

const Query = graphql`
  query ResultBrowseSeriesQuery {
    ...MetaBrowseSeriesFragment
  }
`

export default function ResultBrowseSeries (props: Props): JSX.Element {
  const { query } = props

  const queryData = usePreloadedQuery<ResultBrowseSeriesQuery>(
    Query,
    query
  )

  return (
    <MetaBrowseSeries rootQuery={queryData} />
  )
}
