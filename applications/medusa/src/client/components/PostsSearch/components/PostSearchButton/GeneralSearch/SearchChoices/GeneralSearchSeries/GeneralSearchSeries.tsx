import { usePaginationFragment } from 'react-relay'
import { graphql } from 'react-relay/hooks'
import removeNode from '@//:modules/support/removeNode'
import type { GeneralSearchCharactersFragment$key } from '@//:artifacts/GeneralSearchCharactersFragment.graphql'
import { Trans } from '@lingui/macro'
import { Choice, useChoiceContext } from '@//:modules/content/HookedComponents/Choice'
import { EmptyBoundary } from '@//:modules/content/Placeholder'
import { GridTile, GridWrap, LoadMoreGridTile, SeriesTileOverlay } from '@//:modules/content/ContentSelection'
import type { SearchChoicesQuery } from '@//:artifacts/SearchChoicesQuery.graphql'

interface Props {
  query: GeneralSearchCharactersFragment$key
}

const Fragment = graphql`
  fragment GeneralSearchSeriesFragment on Query
  @argumentDefinitions(
    after: {type: String}
    first: {type: Int, defaultValue: 5}
  )
  @refetchable(queryName: "GeneralSearchSeriesPaginationFragment" )
  {
    series (
      first: $first
      after: $after,
      title: $search,
      slugs: $seriesSlugs
    ) @connection(key: "GeneralSearchSeries_series")
    {
      edges {
        node {
          id
          title
          slug
          ...SeriesTileOverlayFragment
        }
      }
    }
  }
`

export default function GeneralSearchSeries ({
  query
}: Props): JSX.Element {
  const {
    data,
    loadNext,
    isLoadingNext,
    hasNext
  } = usePaginationFragment<SearchChoicesQuery, any>(
    Fragment,
    query
  )
  const series = removeNode(data.series.edges)

  const { register } = useChoiceContext()

  return (
    <EmptyBoundary
      fallback={<></>}
      condition={series.length < 1}
    >
      <GridWrap justify='center'>
        {series.map((item, index) => (
          <GridTile key={index}>
            <Choice {...register(item.id, {
              title: item.title,
              slug: item.slug,
              tagTitle: item.title,
              type: 'series'
            })}
            >
              <SeriesTileOverlay query={item} />
            </Choice>
          </GridTile>
        )
        )}
        <LoadMoreGridTile
          text={<Trans>Load More Series</Trans>}
          hasNext={hasNext && series.length > 0}
          onLoadNext={() => loadNext(6)}
          isLoadingNext={isLoadingNext}
        />
      </GridWrap>
    </EmptyBoundary>
  )
}
