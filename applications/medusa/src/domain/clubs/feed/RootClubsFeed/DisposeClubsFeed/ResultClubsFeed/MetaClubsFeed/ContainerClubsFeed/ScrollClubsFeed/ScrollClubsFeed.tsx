import { graphql, usePaginationFragment } from 'react-relay'
import { ScrollClubsFeedFragment$key } from '@//:artifacts/ScrollClubsFeedFragment.graphql'
import FullSimplePost
  from '@//:modules/content/Posts/components/PostNavigation/PostInfiniteScroll/FullSimplePost/FullSimplePost'
import PostInfiniteScroll
  from '@//:modules/content/Posts/components/PostNavigation/PostInfiniteScroll/PostInfiniteScroll'
import { ResultClubsFeedQuery } from '@//:artifacts/ResultClubsFeedQuery.graphql'

interface Props {
  viewerQuery: ScrollClubsFeedFragment$key | null
}

const ViewerFragment = graphql`
  fragment ScrollClubsFeedFragment on Account
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
    ...FullSimplePostViewerFragment
  }
`

export default function ScrollClubsFeed (props: Props): JSX.Element {
  const {
    viewerQuery
  } = props

  const {
    data,
    loadNext,
    hasNext,
    isLoadingNext
  } = usePaginationFragment<ResultClubsFeedQuery, any>(
    ViewerFragment,
    viewerQuery
  )

  return (
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
          query={data.clubMembersPostsFeed.edges[index].node}
          viewerQuery={data}
        />
      )}
    </PostInfiniteScroll>
  )
}
