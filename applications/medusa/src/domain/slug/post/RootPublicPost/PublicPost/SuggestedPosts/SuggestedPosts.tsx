import type { SuggestedPostsFragment$key } from '@//:artifacts/SuggestedPostsFragment.graphql'
import type { SuggestedPostsViewerFragment$key } from '@//:artifacts/SuggestedPostsViewerFragment.graphql'
import { graphql, usePaginationFragment } from 'react-relay'
import { useFragment } from 'react-relay/hooks'
import { PublicPostQuery } from '@//:artifacts/PublicPostQuery.graphql'
import FullSimplePost
  from '@//:modules/content/Posts/components/PostNavigation/PostsInfiniteScroll/FullSimplePost/FullSimplePost'
import PostInfiniteScroll
  from '@//:modules/content/Posts/components/PostNavigation/PostInfiniteScroll/PostInfiniteScroll'
import PlatformPromoteAlert from '@//:common/components/PlatformPromoteAlert/PlatformPromoteAlert'

interface Props {
  query: SuggestedPostsFragment$key | null
  viewerQuery: SuggestedPostsViewerFragment$key | null
}

const Fragment = graphql`
  fragment SuggestedPostsFragment on Post
  @argumentDefinitions(
    first: {type: Int, defaultValue: 10}
    after: {type: String}
  )
  @refetchable(queryName: "SuggestedPostsPaginationQuery" ) {
    suggestedPosts (first: $first, after: $after)
    @connection (key: "SuggestedPosts_suggestedPosts") {
      edges {
        node {
          ...FullSimplePostFragment
        }
      }
      ...PostInfiniteScrollFragment
    }
  }
`

const ViewerFragment = graphql`
  fragment SuggestedPostsViewerFragment on Account {
    ...FullSimplePostViewerFragment
  }
`

export default function SuggestedPosts ({
  query,
  viewerQuery
}: Props): JSX.Element {
  const {
    data,
    loadNext,
    hasNext,
    isLoadingNext
  } = usePaginationFragment<PublicPostQuery, any>(
    Fragment,
    query
  )

  const viewerData = useFragment(ViewerFragment, viewerQuery)

  return (
    <PostInfiniteScroll
      query={data.suggestedPosts}
      hasNext={hasNext}
      loadNext={loadNext}
      isLoadingNext={isLoadingNext}
      endOfTree={<PlatformPromoteAlert />}
    >
      {({ index }) => (
        <FullSimplePost
          query={data.suggestedPosts.edges[index].node}
          viewerQuery={viewerData}
        />
      )}
    </PostInfiniteScroll>
  )
}
