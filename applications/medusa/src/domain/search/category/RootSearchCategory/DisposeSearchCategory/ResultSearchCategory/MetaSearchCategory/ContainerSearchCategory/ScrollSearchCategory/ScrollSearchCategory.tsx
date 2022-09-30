import { graphql, usePaginationFragment } from 'react-relay'
import { ScrollSearchCategoryFragment$key } from '@//:artifacts/ScrollSearchCategoryFragment.graphql'
import { ResultSearchCategoryQuery } from '@//:artifacts/ResultSearchCategoryQuery.graphql'
import { PreviewPost, VerticalPaginationScroller } from '@//:modules/content/HookedComponents/Post'

interface Props {
  categoryQuery: ScrollSearchCategoryFragment$key
}

const Fragment = graphql`
  fragment ScrollSearchCategoryFragment on Category
  @argumentDefinitions(
    first: {type: Int, defaultValue: 5}
    after: {type: String}
  )
  @refetchable(queryName: "SearchCategoryPostsPaginationQuery" ) {
    posts (
      first: $first,
      after: $after,
      sortBy: $sortBy,
      seed: $seed
    )
    @connection (key: "SearchCategoryPosts_posts") {
      edges {
        node {
          ...PreviewPostFragment
        }
      }
      ...VerticalPaginationScrollerFragment
    }
  }
`

export default function ScrollSearchCategory (props: Props): JSX.Element {
  const {
    categoryQuery
  } = props

  const {
    data,
    loadNext,
    hasNext,
    isLoadingNext
  } = usePaginationFragment<ResultSearchCategoryQuery, any>(
    Fragment,
    categoryQuery
  )

  return (
    <VerticalPaginationScroller
      postConnectionQuery={data.posts}
      hasNext={hasNext}
      loadNext={loadNext}
      isLoadingNext={isLoadingNext}
    >
      {({
        index
      }) => (
        <PreviewPost
          postQuery={data?.posts?.edges?.[index]?.node}
        />
      )}
    </VerticalPaginationScroller>
  )
}
