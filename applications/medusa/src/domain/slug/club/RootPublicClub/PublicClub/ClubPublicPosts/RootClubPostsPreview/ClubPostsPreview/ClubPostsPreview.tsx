import { graphql, usePaginationFragment } from 'react-relay'
import type { ClubPostsPreviewViewerFragment$key } from '@//:artifacts/ClubPostsPreviewViewerFragment.graphql'
import PostsInfiniteScroll
  from '@//:modules/content/Posts/components/PostNavigation/PostsInfiniteScroll/PostsInfiniteScroll'
import { useFragment, useLazyLoadQuery } from 'react-relay/hooks'
import { ClubPostsPreviewQuery } from '@//:artifacts/ClubPostsPreviewQuery.graphql'
import { ComponentSearchArguments } from '@//:modules/content/HookedComponents/Search/types'

interface Props extends ComponentSearchArguments<any> {
  viewerQuery: ClubPostsPreviewViewerFragment$key | null
}

const Query = graphql`
  query ClubPostsPreviewQuery($slug: String!, $sort: PostsSort!, $supporter: [SupporterOnlyStatus!]) {
    club (slug: $slug) @required(action: THROW) {
      ...ClubPostsPreviewFragment
    }
  }
`

const Fragment = graphql`
  fragment ClubPostsPreviewFragment on Club
  @argumentDefinitions(
    first: {type: Int, defaultValue: 10}
    after: {type: String}
  )
  @refetchable(queryName: "ClubPostsPreviewPaginationQuery" ) {
    clubPosts: posts(first: $first, after: $after, sortBy: $sort, supporterOnlyStatus: $supporter)
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
  searchArguments,
  viewerQuery
}: Props): JSX.Element {
  const queryData = useLazyLoadQuery<ClubPostsPreviewQuery>(
    Query,
    searchArguments.variables,
    searchArguments.options
  )

  const {
    data,
    hasNext,
    loadNext,
    isLoadingNext
  } = usePaginationFragment<ClubPostsPreviewQuery, any>(
    Fragment,
    queryData.club
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
