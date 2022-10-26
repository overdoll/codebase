import { graphql, usePaginationFragment } from 'react-relay'
import { ScrollPostsLikesFragment$key } from '@//:artifacts/ScrollPostsLikesFragment.graphql'
import type { ResultLikesQuery } from '@//:artifacts/ResultLikesQuery.graphql'
import { VerticalPaginationScroller } from '@//:modules/content/HookedComponents/Post'

interface Props {
  accountQuery: ScrollPostsLikesFragment$key
}

const Fragment = graphql`
  fragment ScrollPostsLikesFragment on Account
  @argumentDefinitions(
    first: {type: Int, defaultValue: 5}
    after: {type: String}
  )
  @refetchable(queryName: "ScrollPostsLikesPaginationQuery" ) {
    likedPosts (
      first: $first,
      after: $after,
    )
    @connection (key: "ScrollPostsLikes_likedPosts") {
      edges {
        node {
          id
        }
      }
      ...VerticalPaginationScrollerFragment
    }
    hasClubSupporterSubscription
  }
`

export default function ScrollPostsLikes (props: Props): JSX.Element {
  const {
    accountQuery
  } = props

  const {
    data,
    loadNext,
    hasNext,
    isLoadingNext
  } = usePaginationFragment<ResultLikesQuery, any>(
    Fragment,
    accountQuery
  )

  return (
    <VerticalPaginationScroller
      limit={data.hasClubSupporterSubscription === true ? undefined : 4}
      postConnectionQuery={data.likedPosts}
      hasNext={hasNext}
      loadNext={loadNext}
      isLoadingNext={isLoadingNext}
    />
  )
}
