import { graphql, useLazyLoadQuery } from 'react-relay/hooks'
import { usePaginationFragment } from 'react-relay'
import { AdminSearchSeriesQuery } from '@//:artifacts/AdminSearchSeriesQuery.graphql'
import { removeNode } from '@//:modules/support'
import { GridTile, GridWrap, LinkTile, LoadMoreGridTile, SeriesTileOverlay } from '@//:modules/content/ContentSelection'
import { EmptyBoundary, EmptySeries } from '@//:modules/content/Placeholder'
import { ComponentSearchArguments } from '@//:modules/content/HookedComponents/Search/types'

interface Props extends ComponentSearchArguments<any> {
}

const Query = graphql`
  query AdminSearchSeriesQuery($title: String) {
    ...AdminSearchSeriesFragment
  }
`

const Fragment = graphql`
  fragment AdminSearchSeriesFragment on Query
  @argumentDefinitions(
    first: {type: Int, defaultValue: 5}
    after: {type: String}
  )
  @refetchable(queryName: "AdminSearchSeriesPaginationFragment" )
  {
    series (
      first: $first,
      after: $after,
      title: $title
    ) @connection(key: "AdminSeriesConnection_series")
    {
      edges {
        node {
          slug
          ...SeriesTileOverlayFragment
        }
      }
    }
  }
`
export default function AdminSearchSeries ({ searchArguments }: Props): JSX.Element {
  const queryData = useLazyLoadQuery<AdminSearchSeriesQuery>(
    Query,
    searchArguments.variables,
    searchArguments.options
  )

  const {
    data,
    loadNext,
    isLoadingNext,
    hasNext
  } = usePaginationFragment<AdminSearchSeriesQuery, any>(
    Fragment,
    queryData
  )
  const series = removeNode(data.series.edges)

  return (
    <EmptyBoundary
      fallback={<EmptySeries hint={searchArguments.variables.title} />}
      condition={series.length < 1}
    >
      <GridWrap justify='center'>
        {series.map((item, index) => (
          <GridTile key={index}>
            <LinkTile to={`/admin/series/search/${item.slug as string}`}>
              <SeriesTileOverlay query={item} />
            </LinkTile>
          </GridTile>
        )
        )}
        <LoadMoreGridTile
          hasNext={hasNext}
          onLoadNext={() => loadNext(5)}
          isLoadingNext={isLoadingNext}
        />
      </GridWrap>
    </EmptyBoundary>
  )
}
