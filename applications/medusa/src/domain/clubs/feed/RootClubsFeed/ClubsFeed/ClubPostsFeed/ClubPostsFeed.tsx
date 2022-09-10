import type { ClubPostsFeedFragment$key } from '@//:artifacts/ClubPostsFeedFragment.graphql'
import type { ClubPostsFeedViewerFragment$key } from '@//:artifacts/ClubPostsFeedViewerFragment.graphql'
import { graphql, usePaginationFragment } from 'react-relay'
import { ClubsFeedQuery } from '@//:artifacts/ClubsFeedQuery.graphql'
import { useFragment } from 'react-relay/hooks'
import PostInfiniteScroll
  from '@//:modules/content/Posts/components/PostNavigation/PostInfiniteScroll/PostInfiniteScroll'
import FullSimplePost
  from '@//:modules/content/Posts/components/PostNavigation/PostInfiniteScroll/FullSimplePost/FullSimplePost'
import { GlobalVideoManagerProvider } from '@//:modules/content/Posts'

interface Props {
  query: ClubPostsFeedFragment$key | null
  viewerQuery: ClubPostsFeedViewerFragment$key | null
}

const Fragment = graphql`
  fragment ClubPostsFeedFragment on Account
  @argumentDefinitions(
    first: {type: Int, defaultValue: 5}
    after: {type: String}
  )
  @refetchable(queryName: "ClubPostsFeedPaginationQuery" ) {
    clubMembersPostsFeed (first: $first, after: $after)
    @connection (key: "ClubPostsFeed_clubMembersPostsFeed") {
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
  fragment ClubPostsFeedViewerFragment on Account {
    ...FullSimplePostViewerFragment
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
  } = usePaginationFragment<ClubsFeedQuery, any>(
    Fragment,
    query
  )

  const viewerData = useFragment(ViewerFragment, viewerQuery)

  return (
    <GlobalVideoManagerProvider>
      <PostInfiniteScroll
        query={data.clubMembersPostsFeed}
        hasNext={hasNext}
        loadNext={loadNext}
        isLoadingNext={isLoadingNext}
      >
        {({
          index,
          key
        }) => (
          <FullSimplePost
            key={key}
            hideOverflow={false}
            query={data.clubMembersPostsFeed.edges[index].node}
            viewerQuery={viewerData}
          />
        )}
      </PostInfiniteScroll>
    </GlobalVideoManagerProvider>
  )
}
