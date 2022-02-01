import { usePaginationFragment } from 'react-relay'
import { graphql } from 'react-relay/hooks'
import type { GeneralSearchQuery } from '@//:artifacts/GeneralSearchQuery.graphql'
import {
  GridTile,
  GridWrap,
  LoadMoreGridTile,
  Selector,
  SeriesTileOverlay
} from '../../../../../../modules/content/ContentSelection'
import { removeNode } from '@//:modules/support'
import type { SearchSeriesGeneralFragment$key } from '@//:artifacts/SearchSeriesGeneralFragment.graphql'
import { Trans } from '@lingui/macro'
import { useEffect } from 'react'

interface Props {
  selected: string[]
  onSelect: (category: any) => void
  query: SearchSeriesGeneralFragment$key
  onDataChange?: (data) => void
}

const Fragment = graphql`
  fragment SearchSeriesGeneralFragment on Query
  @argumentDefinitions(
    after: {type: String},
    search: {type: String}
  )
  @refetchable(queryName: "SearchSeriesGeneralPaginationFragment" )
  {
    series (
      first: $first,
      after: $after,
      title: $search,
      slugs: $seriesSlugs
    ) @connection(key: "SearchSeriesGeneral_series")
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

export default function SearchSeriesGeneral ({
  onSelect,
  selected,
  query,
  onDataChange
}: Props): JSX.Element {
  const {
    data,
    loadNext,
    isLoadingNext,
    hasNext
  } = usePaginationFragment<GeneralSearchQuery, any>(
    Fragment,
    query
  )

  const series = removeNode(data.series.edges)

  const onChangeSelection = (id): void => {
    const serial = series.filter((item) => item.id === id)[0]
    onSelect(serial)
  }

  useEffect(() => {
    onDataChange?.(data)
  }, [data])

  if (series.length < 1) {
    return <></>
  }

  return (
    <>
      <GridWrap justify='center'>
        {series.map((item, index) => (
          <GridTile key={index}>
            <Selector
              onSelect={onChangeSelection}
              selected={selected}
              id={item.id}
            >
              <SeriesTileOverlay query={item} />
            </Selector>
          </GridTile>
        )
        )}
        <LoadMoreGridTile
          text={<Trans>Load More Series</Trans>}
          hasNext={hasNext}
          onLoadNext={() => loadNext(5)}
          isLoadingNext={isLoadingNext}
        />
      </GridWrap>
    </>
  )
}
