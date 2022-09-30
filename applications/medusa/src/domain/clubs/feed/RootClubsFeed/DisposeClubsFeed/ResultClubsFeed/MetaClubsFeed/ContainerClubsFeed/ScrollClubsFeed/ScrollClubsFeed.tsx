import { graphql, usePaginationFragment } from 'react-relay'
import { ScrollClubsFeedFragment$key } from '@//:artifacts/ScrollClubsFeedFragment.graphql'
import { ResultClubsFeedQuery } from '@//:artifacts/ResultClubsFeedQuery.graphql'
import { PreviewPost, VerticalPaginationScroller } from '@//:modules/content/HookedComponents/Post'

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
          ...PreviewPostFragment
        }
      }
      ...VerticalPaginationScrollerFragment
    }
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
    <VerticalPaginationScroller
      postConnectionQuery={data.clubMembersPostsFeed}
      hasNext={hasNext}
      loadNext={loadNext}
      isLoadingNext={isLoadingNext}
    >
      {({
        index
      }) => (
        <PreviewPost
          postQuery={data?.clubMembersPostsFeed?.edges?.[index]?.node}
        />
      )}
    </VerticalPaginationScroller>
  )
}
