import { ScrollBrowseCategoriesFragment$key } from '@//:artifacts/ScrollBrowseCategoriesFragment.graphql'
import { graphql, usePaginationFragment } from 'react-relay'
import { ResultBrowseCategoriesQuery } from '@//:artifacts/ResultBrowseCategoriesQuery.graphql'
import { EmptyBoundary, EmptyCategories } from '@//:modules/content/Placeholder'
import { GridTile, GridWrap, LoadMoreGridTile } from '@//:modules/content/ContentSelection'
import { Trans } from '@lingui/macro'
import SearchResultsCategory
  from '@//:common/components/PageHeader/SearchButton/components/SearchBody/SearchResults/SearchResultsUnion/SearchResultsCategory/SearchResultsCategory'

interface Props {
  query: ScrollBrowseCategoriesFragment$key
}

const Fragment = graphql`
  fragment ScrollBrowseCategoriesFragment on Query
  @argumentDefinitions(
    first: {type: Int, defaultValue: 24}
    after: {type: String}
  )
  @refetchable(queryName: "ScrollBrowseCategoriesPaginationQuery" ) {
    categories (first: $first, after: $after, excludeEmpty: true)
    @connection (key: "ScrollBrowseCategories_categories") {
      edges {
        node {
          id
          ...SearchResultsCategoryFragment
        }
      }
    }
  }
`

export default function ScrollBrowseCategories (props: Props): JSX.Element {
  const {
    query
  } = props

  const {
    data,
    loadNext,
    hasNext,
    isLoadingNext
  } = usePaginationFragment<ResultBrowseCategoriesQuery, any>(
    Fragment,
    query
  )

  return (
    <>
      <EmptyBoundary
        fallback={
          <EmptyCategories />
        }
        condition={data.categories.edges.length < 1}
      >
        <GridWrap templateColumns='repeat(auto-fill, minmax(150px, 1fr))'>
          {data.categories.edges.map((item) =>
            <GridTile key={item.node.id}>
              <SearchResultsCategory query={item.node} />
            </GridTile>)}
          <LoadMoreGridTile
            text={<Trans>Load More Categories</Trans>}
            hasNext={hasNext}
            onLoadNext={() => loadNext(24)}
            isLoadingNext={isLoadingNext}
          />
        </GridWrap>
      </EmptyBoundary>
    </>
  )
}
