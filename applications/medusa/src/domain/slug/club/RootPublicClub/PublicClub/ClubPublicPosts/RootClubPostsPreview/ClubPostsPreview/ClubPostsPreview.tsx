import { graphql, usePaginationFragment } from 'react-relay'
import type { ClubPostsPreviewViewerFragment$key } from '@//:artifacts/ClubPostsPreviewViewerFragment.graphql'
import { useFragment, useLazyLoadQuery } from 'react-relay/hooks'
import { ClubPostsPreviewQuery } from '@//:artifacts/ClubPostsPreviewQuery.graphql'
import { ComponentSearchArguments } from '@//:modules/content/HookedComponents/Search/types'
import { EmptyBoundary, EmptyPosts } from '@//:modules/content/Placeholder'
import PostInfiniteScroll
  from '@//:modules/content/Posts/components/PostNavigation/PostInfiniteScroll/PostInfiniteScroll'
import FullClubPost from '../../../../../../posts/RootPublicClubPosts/PublicClubPosts/FullClubPost/FullClubPost'

interface Props extends ComponentSearchArguments<any> {
  viewerQuery: ClubPostsPreviewViewerFragment$key | null
}

const Query = graphql`
  query ClubPostsPreviewQuery($slug: String!, $sort: PostsSort!, $supporter: [SupporterOnlyStatus!], $seed: String) {
    club (slug: $slug) @required(action: THROW) {
      ...ClubPostsPreviewFragment
    }
  }
`

const Fragment = graphql`
  fragment ClubPostsPreviewFragment on Club
  @argumentDefinitions(
    first: {type: Int, defaultValue: 5}
    after: {type: String}
  )
  @refetchable(queryName: "ClubPostsPreviewPaginationQuery" ) {
    clubPosts: posts(
      first: $first,
      after: $after,
      sortBy: $sort,
      supporterOnlyStatus: $supporter,
      seed: $seed)
    @connection (key: "ClubPostsPreview_clubPosts") {
      edges {
        node {
          ...FullClubPostFragment
        }
      }
      ...PostInfiniteScrollFragment
    }
  }
`

const ViewerFragment = graphql`
  fragment ClubPostsPreviewViewerFragment on Account {
    ...FullClubPostViewerFragment
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
          <FullClubPost
            query={data.clubPosts.edges[index].node}
            viewerQuery={viewerData}
          />
        )}
      </PostInfiniteScroll>
    </EmptyBoundary>
  )
}
