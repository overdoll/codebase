import { graphql, usePaginationFragment } from 'react-relay'
import { ScrollTopFragment$key } from '@//:artifacts/ScrollTopFragment.graphql'
import { ResultNewQuery } from '@//:artifacts/ResultNewQuery.graphql'
import { PreviewPost, VerticalPaginationScroller } from '@//:modules/content/HookedComponents/Post'

interface Props {
  rootQuery: ScrollTopFragment$key
}

const RootFragment = graphql`
  fragment ScrollTopFragment on Query
  @argumentDefinitions(
    first: {type: Int, defaultValue: 5}
    after: {type: String}
  )
  @refetchable(queryName: "TopPostsPaginationQuery" ) {
    posts (first: $first, after: $after, state: PUBLISHED, sortBy: TOP)
    @connection (key: "TopPosts_posts") {
      edges {
        node {
          ...PreviewPostFragment
        }
      }
      ...VerticalPaginationScrollerFragment
    }
  }
`

export default function ScrollTop (props: Props): JSX.Element {
  const {
    rootQuery
  } = props

  const {
    data,
    loadNext,
    hasNext,
    isLoadingNext
  } = usePaginationFragment<ResultNewQuery, any>(
    RootFragment,
    rootQuery
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
