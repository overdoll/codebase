import { graphql, useLazyLoadQuery } from 'react-relay/hooks'
import { usePaginationFragment } from 'react-relay'
import { StaffSearchCategoriesQuery } from '@//:artifacts/StaffSearchCategoriesQuery.graphql'
import removeNode from '@//:modules/support/removeNode'
import { GridTile, GridWrap, LinkTile, LoadMoreGridTile } from '@//:modules/content/ContentSelection'
import CategoryTileOverlay
  from '@//:modules/content/ContentSelection/TileOverlay/CategoryTileOverlay/CategoryTileOverlay'
import { EmptyBoundary, EmptyCategories } from '@//:modules/content/Placeholder'
import { ComponentSearchArguments } from '@//:modules/content/HookedComponents/Search/types'

interface Props extends ComponentSearchArguments<any> {
}

const Query = graphql`
  query StaffSearchCategoriesQuery($title: String) {
    ...StaffSearchCategoriesFragment
  }
`

const Fragment = graphql`
  fragment StaffSearchCategoriesFragment on Query
  @argumentDefinitions(
    first: {type: Int, defaultValue: 5}
    after: {type: String}
  )
  @refetchable(queryName: "StaffSearchCategoriesPaginationFragment" )
  {
    categories (
      first: $first,
      after: $after,
      title: $title
    ) @connection(key: "StaffCategoriesConnection_categories")
    {
      edges {
        node {
          slug
          ...CategoryTileOverlayFragment
        }
      }
    }
  }
`
export default function StaffSearchCategories ({ searchArguments }: Props): JSX.Element {
  const queryData = useLazyLoadQuery<StaffSearchCategoriesQuery>(
    Query,
    searchArguments.variables,
    searchArguments.options
  )

  const {
    data,
    loadNext,
    isLoadingNext,
    hasNext
  } = usePaginationFragment<StaffSearchCategoriesQuery, any>(
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
            <LinkTile href={`/staff/category/search/${item.slug as string}`}>
              <CategoryTileOverlay query={item} />
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
