import { usePaginationFragment } from 'react-relay'
import { graphql, useLazyLoadQuery } from 'react-relay/hooks'
import { GridTile, GridWrap, LoadMoreGridTile } from '@//:modules/content/ContentSelection'
import removeNode from '@//:modules/support/removeNode'
import type {
  UploadSearchCategoriesMultiSelectorQuery
} from '@//:artifacts/UploadSearchCategoriesMultiSelectorQuery.graphql'
import CategoryTileOverlay
  from '@//:modules/content/ContentSelection/TileOverlay/CategoryTileOverlay/CategoryTileOverlay'
import { EmptyBoundary, EmptyCategories } from '@//:modules/content/Placeholder'
import { ComponentSearchArguments } from '@//:modules/content/HookedComponents/Search/types'
import { ComponentChoiceArguments } from '@//:modules/content/HookedComponents/Choice/types'
import { Choice } from '@//:modules/content/HookedComponents/Choice'

interface Props extends ComponentSearchArguments<any>, ComponentChoiceArguments<any> {
}

const Query = graphql`
  query UploadSearchCategoriesMultiSelectorQuery($title: String) {
    ...UploadSearchCategoriesMultiSelectorFragment @arguments(title: $title)
  }
`

const Fragment = graphql`
  fragment UploadSearchCategoriesMultiSelectorFragment on Query
  @argumentDefinitions(
    first: {type: Int, defaultValue: 5}
    after: {type: String},
    title: {type: String}
  )
  @refetchable(queryName: "UploadSearchCategoriesMultiSelectorPaginationFragment" )
  {
    categories (
      first: $first,
      after: $after,
      title: $title
    ) @connection(key: "UploadSearchCategoriesMultiSelector_categories")
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

export default function UploadSearchCategoriesMultiSelector ({
  searchArguments,
  register
}: Props): JSX.Element {
  const queryData = useLazyLoadQuery<UploadSearchCategoriesMultiSelectorQuery>(
    Query,
    searchArguments.variables,
    searchArguments.options
  )

  const {
    data,
    loadNext,
    isLoadingNext,
    hasNext
  } = usePaginationFragment<UploadSearchCategoriesMultiSelectorQuery, any>(
    Fragment,
    queryData
  )
  const categories = removeNode(data.categories.edges)

  return (
    <EmptyBoundary
      fallback={<EmptyCategories hint={searchArguments.variables.title} />}
      condition={categories.length < 1}
    >
      <GridWrap justify='center'>
        {categories.map((item, index) => (
          <GridTile key={index}>
            <Choice
              {...register(item.id, {
                title: item.title
              })}
            >
              <CategoryTileOverlay query={item} />
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
