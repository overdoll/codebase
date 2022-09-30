import { graphql, usePaginationFragment } from 'react-relay'
import { ScrollBrowseFragment$key } from '@//:artifacts/ScrollBrowseFragment.graphql'
import { ResultBrowseQuery } from '@//:artifacts/ResultBrowseQuery.graphql'
import { PreviewPost, VerticalPaginationScroller } from '@//:modules/content/HookedComponents/Post'

interface Props {
  rootQuery: ScrollBrowseFragment$key
}

const RootFragment = graphql`
  fragment ScrollBrowseFragment on Query
  @argumentDefinitions(
    first: {type: Int, defaultValue: 5}
    after: {type: String}
  )
  @refetchable(queryName: "BrowsePostsPaginationQuery" ) {
    postsFeed (first: $first, after: $after, seed: $seed)
    @connection (key: "BrowsePosts_postsFeed") {
      edges {
        node {
          ...PreviewPostFragment
        }
      }
      ...VerticalPaginationScrollerFragment
    }
  }
`

export default function ScrollBrowse (props: Props): JSX.Element {
  const {
    rootQuery
  } = props

  const {
    data,
    loadNext,
    hasNext,
    isLoadingNext
  } = usePaginationFragment<ResultBrowseQuery, any>(
    RootFragment,
    rootQuery
  )

  return (
    <VerticalPaginationScroller
      postConnectionQuery={data.postsFeed}
      hasNext={hasNext}
      loadNext={loadNext}
      isLoadingNext={isLoadingNext}
    >
      {({
        index
      }) => (
        <PreviewPost
          postQuery={data?.postsFeed?.edges?.[index]?.node}
        />
      )}
    </VerticalPaginationScroller>
  )
}
