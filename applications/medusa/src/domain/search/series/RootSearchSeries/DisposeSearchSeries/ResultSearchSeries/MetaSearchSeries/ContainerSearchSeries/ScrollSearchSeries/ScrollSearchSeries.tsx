import { graphql, usePaginationFragment } from 'react-relay'
import { ScrollSearchSeriesFragment$key } from '@//:artifacts/ScrollSearchSeriesFragment.graphql'
import { ScrollSearchSeriesAccountFragment$key } from '@//:artifacts/ScrollSearchSeriesAccountFragment.graphql'
import { ResultSearchSeriesQuery } from '@//:artifacts/ResultSearchSeriesQuery.graphql'
import { PreviewPost, VerticalPaginationScroller } from '@//:modules/content/HookedComponents/Post'
import { Stack } from '@chakra-ui/react'
import { useFragment } from 'react-relay/hooks'
import PostsFilters from '@//:modules/content/HookedComponents/Filters/fragments/PostsFilters/PostsFilters'

interface Props {
  seriesQuery: ScrollSearchSeriesFragment$key
  accountQuery: ScrollSearchSeriesAccountFragment$key | null
}

const Fragment = graphql`
  fragment ScrollSearchSeriesFragment on Series
  @argumentDefinitions(
    first: {type: Int, defaultValue: 5}
    after: {type: String}
  )
  @refetchable(queryName: "SearchSeriesPostsPaginationQuery" ) {
    posts (
      first: $first,
      after: $after,
      sortBy: $sortBy,
      seed: $seed
    )
    @connection (key: "SearchSeriesPosts_posts") {
      edges {
        node {
          id
        }
      }
      ...VerticalPaginationScrollerFragment
    }
  }
`

const AccountFragment = graphql`
  fragment ScrollSearchSeriesAccountFragment on Account {
    ...PostsFiltersFragment
  }
`

export default function ScrollSearchSeries (props: Props): JSX.Element {
  const {
    seriesQuery,
    accountQuery
  } = props

  const {
    data,
    loadNext,
    hasNext,
    isLoadingNext,
    refetch
  } = usePaginationFragment<ResultSearchSeriesQuery, any>(
    Fragment,
    seriesQuery
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
      />
    </Stack>
  )
}
