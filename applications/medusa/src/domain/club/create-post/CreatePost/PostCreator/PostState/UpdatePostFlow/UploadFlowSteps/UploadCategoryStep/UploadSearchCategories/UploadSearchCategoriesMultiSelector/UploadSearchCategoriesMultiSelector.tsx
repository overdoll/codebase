import { usePaginationFragment } from 'react-relay'
import { graphql, useLazyLoadQuery } from 'react-relay/hooks'
import type {
  UploadSearchCategoriesMultiSelectorQuery
} from '@//:artifacts/UploadSearchCategoriesMultiSelectorQuery.graphql'
import CategoryTileOverlay
  from '@//:modules/content/ContentSelection/TileOverlay/CategoryTileOverlay/CategoryTileOverlay'
import { EmptyBoundary } from '@//:modules/content/Placeholder'
import { ComponentSearchArguments } from '@//:modules/content/HookedComponents/Search/types'
import { ComponentChoiceArguments } from '@//:modules/content/HookedComponents/Choice/types'
import { Choice } from '@//:modules/content/HookedComponents/Choice'
import ShortGridTile from '@//:modules/content/ContentSelection/ShortGridTile/ShortGridTile'
import UploadEmptyCategories from '../UploadEmptyCategories/UploadEmptyCategories'
import LoadMoreShortGridTile
  from '@//:modules/content/ContentSelection/ShortGridTile/LoadMoreShortGridTile/LoadMoreShortGridTile'
import ShortGridWrap from '@//:modules/content/ContentSelection/ShortGridWrap/ShortGridWrap'

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
    first: {type: Int, defaultValue: 9}
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

  return (
    <EmptyBoundary
      fallback={(
        <UploadEmptyCategories hint={searchArguments.variables.title} />)}
      condition={data.categories.edges.length < 1}
    >
      <ShortGridWrap templateColumns='repeat(auto-fill, minmax(100px, 1fr))'>
        {data.categories.edges.map((item) => (
          <ShortGridTile key={item.node.id}>
            <Choice
              {...register(item.node.id, {
                title: item.node.title
              })}
            >
              <CategoryTileOverlay query={item.node} />
            </Choice>
          </ShortGridTile>
        )
        )}
        <LoadMoreShortGridTile
          hasNext={hasNext}
          onLoadNext={() => loadNext(15)}
          isLoadingNext={isLoadingNext}
        />
      </ShortGridWrap>
    </EmptyBoundary>
  )
}
