import type { ResultPublicClubPostsQuery } from '@//:artifacts/ResultPublicClubPostsQuery.graphql'
import { graphql, usePaginationFragment } from 'react-relay'
import type { ScrollPublicClubPostsFragment$key } from '@//:artifacts/ScrollPublicClubPostsFragment.graphql'
import type {
  ScrollPublicClubPostsAccountFragment$key
} from '@//:artifacts/ScrollPublicClubPostsAccountFragment.graphql'
import { Stack } from '@chakra-ui/react'
import { useFragment } from 'react-relay/hooks'
import PostsSupporterFilters
  from '@//:modules/content/HookedComponents/Filters/fragments/PostsSupporterFilters/PostsSupporterFilters'
import SwapPaginationScroller from '../../../../../../../../components/SwapPaginationScroller/SwapPaginationScroller'
import FilterPublicClubPosts from './FilterPublicClubPosts/FilterPublicClubPosts'

interface Props {
  clubQuery: ScrollPublicClubPostsFragment$key
  accountQuery: ScrollPublicClubPostsAccountFragment$key | null
}

const ClubFragment = graphql`
  fragment ScrollPublicClubPostsFragment on Club
  @argumentDefinitions(
    first: {type: Int, defaultValue: 12}
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
          id
        }
      }
      ...SwapPaginationScrollerFragment
    }
    ...FilterPublicClubPostsFragment
  }
`

const AccountFragment = graphql`
  fragment ScrollPublicClubPostsAccountFragment on Account {
    ...PostsSupporterFiltersFragment
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
      <PostsSupporterFilters defaultValue='NEW' newLocked={false} loadQuery={refetch} query={accountData} />
      <FilterPublicClubPosts loadQuery={refetch} query={data} />
      <SwapPaginationScroller
        postConnectionQuery={data.posts}
        hasNext={hasNext}
        loadNext={loadNext}
        isLoadingNext={isLoadingNext}
      />
    </Stack>
  )
}
