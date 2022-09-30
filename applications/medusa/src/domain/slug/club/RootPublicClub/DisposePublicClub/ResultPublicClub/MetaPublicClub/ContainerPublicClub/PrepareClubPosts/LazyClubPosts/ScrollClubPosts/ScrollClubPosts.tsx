import { graphql, usePaginationFragment } from 'react-relay'
import { ScrollClubPostsFragment$key } from '@//:artifacts/ScrollClubPostsFragment.graphql'
import type { LazyClubPostsQuery } from '@//:artifacts/LazyClubPostsQuery.graphql'
import { PreviewPost, VerticalPaginationScroller } from '@//:modules/content/HookedComponents/Post'
import ClubEmptyPosts from '../ClubEmptyPosts/ClubEmptyPosts'

interface Props {
  clubQuery: ScrollClubPostsFragment$key
}

const Fragment = graphql`
  fragment ScrollClubPostsFragment on Club
  @argumentDefinitions(
    first: {type: Int, defaultValue: 5}
    after: {type: String}
    seed: {type: String}
  )
  @refetchable(queryName: "ScrollClubPostsFragmentPaginationQuery" ) {
    posts(
      first: $first,
      after: $after,
      sortBy: ALGORITHM,
      seed: $seed)
    @connection (key: "ClubPostsPreview_posts") {
      edges {
        node {
          ...PreviewPostFragment
        }
      }
      ...VerticalPaginationScrollerFragment
    }
    ...ClubEmptyPostsFragment
  }
`

export default function ScrollClubPosts (props: Props): JSX.Element {
  const {
    clubQuery
  } = props

  const {
    data,
    hasNext,
    loadNext,
    isLoadingNext
  } = usePaginationFragment<LazyClubPostsQuery, any>(
    Fragment,
    clubQuery
  )

  if (data.posts.edges.length < 1) {
    return (
      <ClubEmptyPosts clubQuery={data} />
    )
  }

  return (
    <VerticalPaginationScroller
      postConnectionQuery={data.posts}
      hasNext={hasNext}
      loadNext={loadNext}
      isLoadingNext={isLoadingNext}
    >
      {({
        index
      }) => (
        <PreviewPost
          postQuery={data?.posts?.edges?.[index]?.node}
        />
      )}
    </VerticalPaginationScroller>
  )
}
