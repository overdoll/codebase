import { ScrollBrowseSeriesFragment$key } from '@//:artifacts/ScrollBrowseSeriesFragment.graphql'
import { graphql, usePaginationFragment } from 'react-relay'
import { ResultBrowseSeriesQuery } from '@//:artifacts/ResultBrowseSeriesQuery.graphql'
import { EmptyBoundary, EmptySeries } from '@//:modules/content/Placeholder'
import { GridTile, GridWrap, LoadMoreGridTile } from '@//:modules/content/ContentSelection'
import { Trans } from '@lingui/macro'
import SearchResultsSeries
  from '@//:common/components/PageHeader/SearchButton/components/SearchBody/SearchResults/SearchResultsUnion/SearchResultsSeries/SearchResultsSeries'

interface Props {
  query: ScrollBrowseSeriesFragment$key
}

const Fragment = graphql`
  fragment ScrollBrowseSeriesFragment on Query
  @argumentDefinitions(
    first: {type: Int, defaultValue: 24}
    after: {type: String}
  )
  @refetchable(queryName: "ScrollBrowseSeriesPaginationQuery" ) {
    series (first: $first, after: $after, excludeEmpty: true)
    @connection (key: "ScrollBrowseSeries_series") {
      edges {
        node {
          id
          ...SearchResultsSeriesFragment
        }
      }
    }
  }
`

export default function ScrollBrowseSeries (props: Props): JSX.Element {
  const {
    query
  } = props

  const {
    data,
    loadNext,
    hasNext,
    isLoadingNext
  } = usePaginationFragment<ResultBrowseSeriesQuery, any>(
    Fragment,
    query
  )

  return (
    <>
      <EmptyBoundary
        fallback={
          <EmptySeries />
        }
        condition={data.series.edges.length < 1}
      >
        <GridWrap templateColumns='repeat(auto-fill, minmax(150px, 1fr))'>
          {data.series.edges.map((item) =>
            <GridTile key={item.node.id}>
              <SearchResultsSeries query={item.node} />
            </GridTile>)}
          <LoadMoreGridTile
            text={<Trans>Load More Series</Trans>}
            hasNext={hasNext}
            onLoadNext={() => loadNext(24)}
            isLoadingNext={isLoadingNext}
          />
        </GridWrap>
      </EmptyBoundary>
    </>
  )
}
