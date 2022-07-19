import { graphql, usePaginationFragment } from 'react-relay'
import type { ClubPostsPreviewFragment$key } from '@//:artifacts/ClubPostsPreviewFragment.graphql'
import type { ClubPostsPreviewViewerFragment$key } from '@//:artifacts/ClubPostsPreviewViewerFragment.graphql'
import { PublicClubQuery } from '@//:artifacts/PublicClubQuery.graphql'
import PostsInfiniteScroll
  from '@//:modules/content/Posts/components/PostNavigation/PostsInfiniteScroll/PostsInfiniteScroll'
import { useFragment } from 'react-relay/hooks'

interface Props {
  query: ClubPostsPreviewFragment$key
  viewerQuery: ClubPostsPreviewViewerFragment$key | null
}

const Fragment = graphql`
  fragment ClubPostsPreviewFragment on Club
  @argumentDefinitions(
    first: {type: Int, defaultValue: 10}
    after: {type: String}
  )
  @refetchable(queryName: "ClubPostsPreviewPaginationQuery" ) {
    clubPosts: posts(first: $first, after: $after, sortBy: TOP)
    @connection (key: "ClubPostsPreview_clubPosts") {
      edges {
        __typename
      }
      ...PostsInfiniteScrollFragment
    }
  }
`

const ViewerFragment = graphql`
  fragment ClubPostsPreviewViewerFragment on Account {
    ...PostsInfiniteScrollViewerFragment
  }
`

export default function ClubPostsPreview ({
  query,
  viewerQuery
}: Props): JSX.Element {
  const {
    data,
    hasNext,
    loadNext,
    isLoadingNext
  } = usePaginationFragment<PublicClubQuery, any>(
    Fragment,
    query
  )

  const viewerData = useFragment(ViewerFragment, viewerQuery)

  return (
    <PostsInfiniteScroll
      query={data.clubPosts}
      viewerQuery={viewerData}
      hasNext={hasNext}
      loadNext={() => loadNext(11)}
      isLoadingNext={isLoadingNext}
    />
  )
}
