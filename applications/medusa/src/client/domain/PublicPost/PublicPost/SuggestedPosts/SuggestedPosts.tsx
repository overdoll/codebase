import type { SuggestedPostsFragment$key } from '@//:artifacts/SuggestedPostsFragment.graphql'
import type { SuggestedPostsViewerFragment$key } from '@//:artifacts/SuggestedPostsViewerFragment.graphql'

import { graphql, usePaginationFragment } from 'react-relay'
import PostsInfiniteScroll from '../../../../components/PostsInfiniteScroll/PostsInfiniteScroll'
import { useFragment } from 'react-relay/hooks'
import { PublicPostQuery } from '@//:artifacts/PublicPostQuery.graphql'

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
        __typename
      }
      ...PostsInfiniteScrollFragment
    }
  }
`

const ViewerFragment = graphql`
  fragment SuggestedPostsViewerFragment on Account {
    ...PostsInfiniteScrollViewerFragment
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
    <PostsInfiniteScroll
      query={data.suggestedPosts}
      viewerQuery={viewerData}
      hasNext={hasNext}
      loadNext={loadNext}
      isLoadingNext={isLoadingNext}
    />
  )
}
