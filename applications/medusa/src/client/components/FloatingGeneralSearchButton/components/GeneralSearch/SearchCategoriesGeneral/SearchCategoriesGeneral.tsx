import { usePaginationFragment } from 'react-relay'
import { graphql } from 'react-relay/hooks'
import type { GeneralSearchQuery } from '@//:artifacts/GeneralSearchQuery.graphql'
import {
  GridTile,
  GridWrap,
  LoadMoreGridTile,
  SingleSelector
} from '../../../../../../modules/content/ContentSelection'
import { removeNode } from '@//:modules/support'
import type { SearchCategoriesGeneralFragment$key } from '@//:artifacts/SearchCategoriesGeneralFragment.graphql'
import { Trans } from '@lingui/macro'
import { useEffect } from 'react'
import CategoryTileOverlay
  from '../../../../../../modules/content/ContentSelection/components/TileOverlay/CategoryTileOverlay/CategoryTileOverlay'
import { SingleSelectorProps } from '@//:modules/content/ContentSelection/components/SingleSelector/SingleSelector'

interface Props extends SingleSelectorProps {
  query: SearchCategoriesGeneralFragment$key
  onDataChange?: (data) => void
}

const Fragment = graphql`
  fragment SearchCategoriesGeneralFragment on Query
  @argumentDefinitions(
    after: {type: String}
  )
  @refetchable(queryName: "SearchCategoriesGeneralPaginationFragment" )
  {
    categories (
      first: $first,
      after: $after,
      title: $search,
      slugs: $categoriesSlugs
    ) @connection(key: "SearchCategoriesGeneral_categories")
    {
      edges {
        node {
          id
          slug
          title
          ...CategoryTileOverlayFragment
        }
      }
    }
  }
`

export default function SearchCategoriesGeneral ({
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
  const categories = removeNode(data.categories.edges)

  const onChangeSelection = (id): void => {
    const category = categories.filter((item) => item.id === id)[0]
    onSelect(category)
  }

  useEffect(() => {
    onDataChange?.(data)
  }, [data])

  if (categories.length < 1) {
    return <></>
  }

  return (
    <>
      <GridWrap justify='center'>
        {categories.map((item, index) => (
          <GridTile key={index}>
            <SingleSelector
              onSelect={onChangeSelection}
              selected={selected}
              id={item.id}
            >
              <CategoryTileOverlay
                query={item}
              />
            </SingleSelector>
          </GridTile>
        )
        )}
        <LoadMoreGridTile
          text={<Trans>Load More Categories</Trans>}
          hasNext={hasNext && categories.length > 0}
          onLoadNext={() => loadNext(5)}
          isLoadingNext={isLoadingNext}
        />
      </GridWrap>
    </>
  )
}
