import type { SuggestedPublicPostFragment$key } from '@//:artifacts/SuggestedPublicPostFragment.graphql'
import type { SuggestedPublicPostViewerFragment$key } from '@//:artifacts/SuggestedPublicPostViewerFragment.graphql'
import { graphql, usePaginationFragment } from 'react-relay'
import { useFragment } from 'react-relay/hooks'
import { ResultPublicPostQuery } from '@//:artifacts/ResultPublicPostQuery.graphql'
import FullSimplePost
  from '@//:modules/content/Posts/components/PostNavigation/PostInfiniteScroll/FullSimplePost/FullSimplePost'
import PostInfiniteScroll
  from '@//:modules/content/Posts/components/PostNavigation/PostInfiniteScroll/PostInfiniteScroll'
import PlatformPromoteAlert from '@//:common/components/PlatformPromoteAlert/PlatformPromoteAlert'

interface Props {
  postQuery: SuggestedPublicPostFragment$key
  viewerQuery: SuggestedPublicPostViewerFragment$key | null
}

const Fragment = graphql`
  fragment SuggestedPublicPostFragment on Post
  @argumentDefinitions(
    first: {type: Int, defaultValue: 5}
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
  fragment SuggestedPublicPostViewerFragment on Account {
    ...FullSimplePostViewerFragment
  }
`

export default function SuggestedPublicPost ({
  postQuery,
  viewerQuery
}: Props): JSX.Element {
  const {
    data,
    loadNext,
    hasNext,
    isLoadingNext
  } = usePaginationFragment<ResultPublicPostQuery, any>(
    Fragment,
    postQuery
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
      {({ index, key }) => (
        <FullSimplePost
          key={key}
          query={data.suggestedPosts.edges[index].node}
          viewerQuery={viewerData}
        />
      )}
    </PostInfiniteScroll>
  )
}
