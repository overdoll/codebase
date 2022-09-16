import { graphql, usePaginationFragment } from 'react-relay'
import type { ClubPostsPreviewViewerFragment$key } from '@//:artifacts/ClubPostsPreviewViewerFragment.graphql'
import { useFragment } from 'react-relay/hooks'
import { ClubPostsPreviewFragment$key } from '@//:artifacts/ClubPostsPreviewFragment.graphql'
import { EmptyBoundary, EmptyPosts } from '@//:modules/content/Placeholder'
import PostInfiniteScroll
  from '@//:modules/content/Posts/components/PostNavigation/PostInfiniteScroll/PostInfiniteScroll'
import FullClubPost
  from '../../../../../../../../../../posts/RootPublicClubPosts/DisposePublicClubPosts/ResultPublicClubPosts/MetaPublicClubPosts/ContainerPublicClubPosts/ScrollPublicClubPosts/FullClubPost/FullClubPost'
import type { ResultPublicClubQuery } from '@//:artifacts/ResultPublicClubQuery.graphql'

interface Props {
  clubQuery: ClubPostsPreviewFragment$key
  viewerQuery: ClubPostsPreviewViewerFragment$key | null
}

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
      sortBy: ALGORITHM,
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

export default function ClubPostsPreview (props: Props): JSX.Element {
  const {
    clubQuery,
    viewerQuery
  } = props

  const {
    data,
    hasNext,
    loadNext,
    isLoadingNext
  } = usePaginationFragment<ResultPublicClubQuery, any>(
    Fragment,
    clubQuery
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
        {({
          index,
          key
        }) => (
          <FullClubPost
            key={key}
            query={data.clubPosts.edges[index].node}
            viewerQuery={viewerData}
          />
        )}
      </PostInfiniteScroll>
    </EmptyBoundary>
  )
}
