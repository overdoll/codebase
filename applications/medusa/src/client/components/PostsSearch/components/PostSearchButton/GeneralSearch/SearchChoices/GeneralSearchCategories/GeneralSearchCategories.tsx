import { usePaginationFragment } from 'react-relay'
import { graphql } from 'react-relay/hooks'
import { removeNode } from '@//:modules/support'
import type { GeneralSearchCategoriesFragment$key } from '@//:artifacts/GeneralSearchCategoriesFragment.graphql'
import { Trans } from '@lingui/macro'
import { Choice, useChoiceContext } from '@//:modules/content/HookedComponents/Choice'
import { EmptyBoundary } from '@//:modules/content/Placeholder'
import { CategoryTileOverlay, GridTile, GridWrap, LoadMoreGridTile } from '@//:modules/content/ContentSelection'
import type { SearchChoicesQuery } from '@//:artifacts/SearchChoicesQuery.graphql'

interface Props {
  query: GeneralSearchCategoriesFragment$key
}

const Fragment = graphql`
  fragment GeneralSearchCategoriesFragment on Query
  @argumentDefinitions(
    after: {type: String}
    first: {type: Int, defaultValue: 5}
  )
  @refetchable(queryName: "GeneralSearchCategoriesPaginationFragment" )
  {
    categories (
      first: $first,
      after: $after,
      title: $search,
      slugs: $categoriesSlugs
    ) @connection(key: "GeneralSearchCategories_categories")
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

export default function GeneralSearchCategories ({
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
  const categories = removeNode(data.categories.edges)

  const { register } = useChoiceContext()

  return (
    <EmptyBoundary
      fallback={<></>}
      condition={categories.length < 1}
    >
      <GridWrap justify='center'>
        {categories.map((item, index) => (
          <GridTile key={index}>
            <Choice {...register(item.id, {
              title: item.title,
              slug: item.slug,
              tagTitle: item.title,
              type: 'category'
            })}
            >
              <CategoryTileOverlay
                query={item}
              />
            </Choice>
          </GridTile>
        )
        )}
        <LoadMoreGridTile
          text={<Trans>Load More Categories</Trans>}
          hasNext={hasNext && categories.length > 0}
          onLoadNext={() => loadNext(6)}
          isLoadingNext={isLoadingNext}
        />
      </GridWrap>
    </EmptyBoundary>
  )
}
