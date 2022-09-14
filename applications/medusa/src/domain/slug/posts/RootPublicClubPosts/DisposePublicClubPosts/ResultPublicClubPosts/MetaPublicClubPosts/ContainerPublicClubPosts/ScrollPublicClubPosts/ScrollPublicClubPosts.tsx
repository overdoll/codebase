import { useFragment } from 'react-relay/hooks'
import type { ResultPublicClubPostsQuery } from '@//:artifacts/ResultPublicClubPostsQuery.graphql'
import { graphql, usePaginationFragment } from 'react-relay'
import PostInfiniteScroll
  from '@//:modules/content/Posts/components/PostNavigation/PostInfiniteScroll/PostInfiniteScroll'
import FullClubPost from './FullClubPost/FullClubPost'
import type { ScrollPublicClubPostsFragment$key } from '@//:artifacts/ScrollPublicClubPostsFragment.graphql'
import type { ScrollPublicClubPostsViewerFragment$key } from '@//:artifacts/ScrollPublicClubPostsViewerFragment.graphql'

interface Props {
  clubQuery: ScrollPublicClubPostsFragment$key
  viewerQuery: ScrollPublicClubPostsViewerFragment$key | null
}

const ClubFragment = graphql`
  fragment ScrollPublicClubPostsFragment on Club
  @argumentDefinitions(
    first: {type: Int, defaultValue: 5}
    after: {type: String}
  )
  @refetchable(queryName: "ClubPublicPostsPaginationQuery" ) {
    posts (first: $first,
      after: $after,
      sortBy: $sortBy,
      categorySlugs: $categorySlugs,
      seriesSlugs: $seriesSlugs,
      characterSlugs: $characterSlugs,
      supporterOnlyStatus: $supporterOnlyStatus,
      seed: $seed
    )
    @connection (key: "ClubPublicPosts_posts") {
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
  fragment ScrollPublicClubPostsViewerFragment on Account {
    ...FullClubPostViewerFragment
  }
`

export default function ScrollPublicClubPosts (props: Props): JSX.Element {
  const {
    clubQuery,
    viewerQuery
  } = props

  const {
    data,
    loadNext,
    hasNext,
    isLoadingNext
  } = usePaginationFragment<ResultPublicClubPostsQuery, any>(
    ClubFragment,
    clubQuery
  )

  const viewerData = useFragment(ViewerFragment, viewerQuery)

  return (
    <PostInfiniteScroll
      query={data.posts}
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
          query={data.posts.edges[index].node}
          viewerQuery={viewerData}
        />
      )}
    </PostInfiniteScroll>
  )
}
