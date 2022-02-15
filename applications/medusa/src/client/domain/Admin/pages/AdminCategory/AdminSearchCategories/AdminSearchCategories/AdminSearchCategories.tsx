import { graphql, useLazyLoadQuery } from 'react-relay/hooks'
import { usePaginationFragment } from 'react-relay'
import { AdminSearchCategoriesQuery } from '@//:artifacts/AdminSearchCategoriesQuery.graphql'
import { removeNode } from '@//:modules/support'
import { GridTile, GridWrap, LinkTile, LoadMoreGridTile } from '@//:modules/content/ContentSelection'
import CategoryTileOverlay
  from '@//:modules/content/ContentSelection/components/TileOverlay/CategoryTileOverlay/CategoryTileOverlay'
import { QueryArguments } from '@//:types/hooks'
import { EmptyCategories } from '@//:modules/content/Placeholder'

interface Props {
  queryArgs: QueryArguments
}

const Query = graphql`
  query AdminSearchCategoriesQuery($title: String) {
    ...AdminSearchCategoriesFragment
  }
`

const Fragment = graphql`
  fragment AdminSearchCategoriesFragment on Query
  @argumentDefinitions(
    first: {type: Int, defaultValue: 5}
    after: {type: String}
  )
  @refetchable(queryName: "AdminSearchCategoriesPaginationFragment" )
  {
    categories (
      first: $first,
      after: $after,
      title: $title
    ) @connection(key: "AdminCategoriesConnection_categories")
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
export default function AdminSearchCategories ({ queryArgs }: Props): JSX.Element {
  const queryData = useLazyLoadQuery<AdminSearchCategoriesQuery>(
    Query,
    queryArgs.variables,
    queryArgs.options
  )

  const {
    data,
    loadNext,
    isLoadingNext,
    hasNext
  } = usePaginationFragment<AdminSearchCategoriesQuery, any>(
    Fragment,
    queryData
  )
  const categories = removeNode(data.categories.edges)

  if (categories.length < 1) {
    return (
      <EmptyCategories hint={queryArgs.variables.title} />
    )
  }

  return (
    <>
      <GridWrap justify='center'>
        {categories.map((item, index) => (
          <GridTile key={index}>
            <LinkTile to={`/admin/category/search/${item.slug as string}`}>
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
    </>
  )
}
