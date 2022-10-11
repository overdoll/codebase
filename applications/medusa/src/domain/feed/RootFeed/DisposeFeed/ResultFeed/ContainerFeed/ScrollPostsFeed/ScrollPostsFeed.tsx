import { graphql, usePaginationFragment } from 'react-relay'
import { ScrollPostsFeedFragment$key } from '@//:artifacts/ScrollPostsFeedFragment.graphql'
import type { ResultFeedQuery } from '@//:artifacts/ResultFeedQuery.graphql'
import { PreviewPost, VerticalPaginationScroller } from '@//:modules/content/HookedComponents/Post'

interface Props {
  accountQuery: ScrollPostsFeedFragment$key
}

const Fragment = graphql`
  fragment ScrollPostsFeedFragment on Account
  @argumentDefinitions(
    first: {type: Int, defaultValue: 5}
    after: {type: String}
  )
  @refetchable(queryName: "ScrollPostsFeedPaginationQuery" ) {
    clubMembersPostsFeed (
      first: $first,
      after: $after,
    )
    @connection (key: "ScrollPostsFeed_clubMembersPostsFeed") {
      edges {
        node {
          ...PreviewPostFragment
        }
      }
      ...VerticalPaginationScrollerFragment
    }
  }
`

export default function ScrollPostsFeed (props: Props): JSX.Element {
  const {
    accountQuery
  } = props

  const {
    data,
    loadNext,
    hasNext,
    isLoadingNext
  } = usePaginationFragment<ResultFeedQuery, any>(
    Fragment,
    accountQuery
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
          postQuery={data.clubMembersPostsFeed.edges[index].node}
        />
      )}
    </VerticalPaginationScroller>
  )
}
