import { graphql, usePaginationFragment } from 'react-relay'
import type { ClubPostsPreviewViewerFragment$key } from '@//:artifacts/ClubPostsPreviewViewerFragment.graphql'
import { useFragment, useLazyLoadQuery } from 'react-relay/hooks'
import { ClubPostsPreviewQuery } from '@//:artifacts/ClubPostsPreviewQuery.graphql'
import { ComponentSearchArguments } from '@//:modules/content/HookedComponents/Search/types'
import { EmptyBoundary, EmptyPosts } from '@//:modules/content/Placeholder'
import FullSimplePost
  from '@//:modules/content/Posts/components/PostNavigation/PostsInfiniteScroll/FullSimplePost/FullSimplePost'
import PostInfiniteScroll
  from '@//:modules/content/Posts/components/PostNavigation/PostInfiniteScroll/PostInfiniteScroll'

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
        node {
          ...FullSimplePostFragment
        }
      }
      ...PostInfiniteScrollFragment
    }
  }
`

const ViewerFragment = graphql`
  fragment ClubPostsPreviewViewerFragment on Account {
    ...FullSimplePostViewerFragment
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
    <EmptyBoundary
      fallback={<EmptyPosts />}
      condition={data?.clubPosts?.edges.length < 1}
    >
      <PostInfiniteScroll
        query={data.clubPosts}
        hasNext={hasNext}
        loadNext={loadNext}
        isLoadingNext={isLoadingNext}
      >
        {({ index }) => (
          <FullSimplePost
            hideOverflow={false}
            query={data.clubPosts.edges[index].node}
            viewerQuery={viewerData}
          />
        )}
      </PostInfiniteScroll>
    </EmptyBoundary>
  )
}
