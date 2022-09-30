import type { ResultPublicClubPostsQuery } from '@//:artifacts/ResultPublicClubPostsQuery.graphql'
import { graphql, usePaginationFragment } from 'react-relay'
import type { ScrollPublicClubPostsFragment$key } from '@//:artifacts/ScrollPublicClubPostsFragment.graphql'
import { PreviewPost, VerticalPaginationScroller } from '@//:modules/content/HookedComponents/Post'

interface Props {
  clubQuery: ScrollPublicClubPostsFragment$key
}

const ClubFragment = graphql`
  fragment ScrollPublicClubPostsFragment on Club
  @argumentDefinitions(
    first: {type: Int, defaultValue: 5}
    after: {type: String}
  )
  @refetchable(queryName: "ClubPublicPostsPaginationQuery" ) {
    posts (
      first: $first,
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
          ...PreviewPostFragment
        }
      }
      ...VerticalPaginationScrollerFragment
    }
  }
`

export default function ScrollPublicClubPosts (props: Props): JSX.Element {
  const {
    clubQuery
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
