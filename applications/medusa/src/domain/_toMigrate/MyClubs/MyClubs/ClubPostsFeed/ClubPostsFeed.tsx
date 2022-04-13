import type { ClubPostsFeedFragment$key } from '@//:artifacts/ClubPostsFeedFragment.graphql'
import type { ClubPostsFeedViewerFragment$key } from '@//:artifacts/ClubPostsFeedViewerFragment.graphql'

import { graphql, usePaginationFragment } from 'react-relay'
import { MyClubsQuery } from '@//:artifacts/MyClubsQuery.graphql'
import PostsInfiniteScroll from '@//:modules/content/Posts/components/PostNavigation/PostsInfiniteScroll/PostsInfiniteScroll'
import { useFragment } from 'react-relay/hooks'

interface Props {
  query: ClubPostsFeedFragment$key | null
  viewerQuery: ClubPostsFeedViewerFragment$key | null
}

const Fragment = graphql`
  fragment ClubPostsFeedFragment on Account
  @argumentDefinitions(
    first: {type: Int, defaultValue: 10}
    after: {type: String}
  )
  @refetchable(queryName: "ClubPostsFeedPaginationQuery" ) {
    clubMembersPostsFeed (first: $first, after: $after)
    @connection (key: "ClubPostsFeed_clubMembersPostsFeed") {
      edges {
        __typename
      }
      ...PostsInfiniteScrollFragment
    }
  }
`

const ViewerFragment = graphql`
  fragment ClubPostsFeedViewerFragment on Account {
    ...PostsInfiniteScrollViewerFragment
  }
`

export default function ClubPostsFeed ({
  query,
  viewerQuery
}: Props): JSX.Element {
  const {
    data,
    loadNext,
    hasNext,
    isLoadingNext
  } = usePaginationFragment<MyClubsQuery, any>(
    Fragment,
    query
  )

  const viewerData = useFragment(ViewerFragment, viewerQuery)

  return (
    <PostsInfiniteScroll
      query={data.clubMembersPostsFeed}
      viewerQuery={viewerData}
      hasNext={hasNext}
      loadNext={loadNext}
      isLoadingNext={isLoadingNext}
    />
  )
}
