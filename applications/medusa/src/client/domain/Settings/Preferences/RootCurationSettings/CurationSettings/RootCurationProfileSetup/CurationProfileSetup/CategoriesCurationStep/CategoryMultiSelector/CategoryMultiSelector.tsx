import { graphql, useLazyLoadQuery } from 'react-relay/hooks'
import type { CategoryMultiSelectorQuery } from '@//:artifacts/CategoryMultiSelectorQuery.graphql'
import { GridTile, GridWrap, LoadMoreGridTile, MultiSelector } from '@//:modules/content/ContentSelection'
import {
  MultiSelectedValue,
  MultiSelectedValueFunction
} from '@//:modules/content/ContentSelection/hooks/useMultiSelector'
import { usePaginationFragment } from 'react-relay'
import CategoryTileOverlay
  from '../../../../../../../../../../modules/content/ContentSelection/components/TileOverlay/CategoryTileOverlay/CategoryTileOverlay'

interface Props {
  selected: MultiSelectedValue
  onSelect: MultiSelectedValueFunction
}

const Query = graphql`
  query CategoryMultiSelectorQuery {
    ...CategoryMultiSelectorFragment
  }
`

const Fragment = graphql`
  fragment CategoryMultiSelectorFragment on Query
  @argumentDefinitions(
    first: {type: Int, defaultValue: 5}
    after: {type: String},
    title: {type: String}
  )
  @refetchable(queryName: "CategoryMultiSelectorPaginationFragment" )
  {
    categories (
      first: $first,
      after: $after,
      title: $title
    ) @connection(key: "CategoryMultiSelector_categories")
    {
      edges {
        node {
          id
          title
          ...CategoryTileOverlayFragment
        }
      }
    }
  }
`

export default function CategoryMultiSelector ({
  onSelect,
  selected
}: Props): JSX.Element {
  const queryData = useLazyLoadQuery<CategoryMultiSelectorQuery>(
    Query,
    {}
  )

  const {
    data,
    loadNext,
    isLoadingNext,
    hasNext
  } = usePaginationFragment<CategoryMultiSelectorQuery, any>(
    Fragment,
    queryData
  )

  return (
    <GridWrap>
      {data.categories.edges.map((item, index) => (
        <GridTile key={index}>
          <MultiSelector
            onSelect={onSelect}
            selected={selected}
            id={item.node.id}
            name={item.node.title}
            type='category'
          >
            <CategoryTileOverlay query={item.node} />
          </MultiSelector>
        </GridTile>
      )
      )}
      <LoadMoreGridTile
        hasNext={hasNext}
        onLoadNext={() => loadNext(5)}
        isLoadingNext={isLoadingNext}
      />
    </GridWrap>
  )
}
