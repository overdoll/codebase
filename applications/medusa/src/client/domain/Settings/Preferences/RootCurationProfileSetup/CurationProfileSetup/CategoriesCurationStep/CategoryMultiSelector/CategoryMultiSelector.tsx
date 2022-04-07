import { graphql, useLazyLoadQuery } from 'react-relay/hooks'
import type { CategoryMultiSelectorQuery } from '@//:artifacts/CategoryMultiSelectorQuery.graphql'
import { GridTile, GridWrap, LoadMoreGridTile } from '@//:modules/content/ContentSelection'
import { usePaginationFragment } from 'react-relay'
import CategoryTileOverlay
  from '@//:modules/content/ContentSelection/TileOverlay/CategoryTileOverlay/CategoryTileOverlay'
import { EmptyBoundary, EmptyCategories } from '@//:modules/content/Placeholder'
import { ComponentSearchArguments } from '@//:modules/content/HookedComponents/Search/types'
import { ComponentChoiceArguments } from '@//:modules/content/HookedComponents/Choice/types'
import { Choice } from '@//:modules/content/HookedComponents/Choice'

interface Props extends ComponentSearchArguments<any>, ComponentChoiceArguments<any> {
}

const Query = graphql`
  query CategoryMultiSelectorQuery($title: String) {
    ...CategoryMultiSelectorFragment
  }
`

const Fragment = graphql`
  fragment CategoryMultiSelectorFragment on Query
  @argumentDefinitions(
    first: {type: Int, defaultValue: 5}
    after: {type: String},
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
  searchArguments,
  register
}: Props): JSX.Element {
  const queryData = useLazyLoadQuery<CategoryMultiSelectorQuery>(
    Query,
    searchArguments.variables,
    searchArguments.options
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
    <EmptyBoundary
      fallback={<EmptyCategories hint={searchArguments.variables.title} />}
      condition={data.categories.edges.length < 1}
    >
      <GridWrap>
        {data.categories.edges.map((item, index) => (
          <GridTile key={index}>
            <Choice {...register(item.node.id, { title: item.node.title })}>
              <CategoryTileOverlay query={item.node} />
            </Choice>
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
