import type { ResultPublicClubPostsQuery } from '@//:artifacts/ResultPublicClubPostsQuery.graphql'
import { graphql, usePaginationFragment } from 'react-relay'
import type { ScrollPublicClubPostsFragment$key } from '@//:artifacts/ScrollPublicClubPostsFragment.graphql'
import type {
  ScrollPublicClubPostsAccountFragment$key
} from '@//:artifacts/ScrollPublicClubPostsAccountFragment.graphql'
import { PreviewPost, VerticalPaginationScroller } from '@//:modules/content/HookedComponents/Post'
import { Stack } from '@chakra-ui/react'
import PostsFilters from '@//:modules/content/HookedComponents/Filters/fragments/PostsFilters/PostsFilters'
import { useFragment } from 'react-relay/hooks'

interface Props {
  clubQuery: ScrollPublicClubPostsFragment$key
  accountQuery: ScrollPublicClubPostsAccountFragment$key | null
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

const AccountFragment = graphql`
  fragment ScrollPublicClubPostsAccountFragment on Account {
    ...PostsFiltersFragment
  }
`

export default function ScrollPublicClubPosts (props: Props): JSX.Element {
  const {
    clubQuery,
    accountQuery
  } = props

  const {
    data,
    loadNext,
    hasNext,
    isLoadingNext,
    refetch
  } = usePaginationFragment<ResultPublicClubPostsQuery, any>(
    ClubFragment,
    clubQuery
  )

  const accountData = useFragment(AccountFragment, accountQuery)

  return (
    <Stack spacing={2}>
      <PostsFilters loadQuery={refetch} accountQuery={accountData} />
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
    </Stack>
  )
}
