import { graphql, useLazyLoadQuery } from 'react-relay/hooks'
import { usePaginationFragment } from 'react-relay'
import { StaffSearchSeriesQuery } from '@//:artifacts/StaffSearchSeriesQuery.graphql'
import removeNode from '@//:modules/support/removeNode'
import { GridTile, GridWrap, LinkTile, LoadMoreGridTile, SeriesTileOverlay } from '@//:modules/content/ContentSelection'
import { EmptyBoundary, EmptySeries } from '@//:modules/content/Placeholder'
import { ComponentSearchArguments } from '@//:modules/content/HookedComponents/Search/types'

interface Props extends ComponentSearchArguments<any> {
}

const Query = graphql`
  query StaffSearchSeriesQuery($title: String) {
    ...StaffSearchSeriesFragment
  }
`

const Fragment = graphql`
  fragment StaffSearchSeriesFragment on Query
  @argumentDefinitions(
    first: {type: Int, defaultValue: 5}
    after: {type: String}
  )
  @refetchable(queryName: "StaffSearchSeriesPaginationFragment" )
  {
    series (
      first: $first,
      after: $after,
      title: $title
    ) @connection(key: "StaffSeriesConnection_series")
    {
      edges {
        node {
          id
          slug
          ...SeriesTileOverlayFragment
        }
      }
    }
  }
`
export default function StaffSearchSeries ({ searchArguments }: Props): JSX.Element {
  const queryData = useLazyLoadQuery<StaffSearchSeriesQuery>(
    Query,
    searchArguments.variables,
    searchArguments.options
  )

  const {
    data,
    loadNext,
    isLoadingNext,
    hasNext
  } = usePaginationFragment<StaffSearchSeriesQuery, any>(
    Fragment,
    queryData
  )
  const series = removeNode(data.series.edges)

  return (
    <EmptyBoundary
      fallback={<EmptySeries hint={searchArguments.variables.title} />}
      condition={series.length < 1}
    >
      <GridWrap>
        {series.map((item) => (
          <GridTile key={item.node.id}>
            <LinkTile href={{
              pathname: '/staff/entity/series/[slug]',
              query: { slug: item.slug }
            }}
            >
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
