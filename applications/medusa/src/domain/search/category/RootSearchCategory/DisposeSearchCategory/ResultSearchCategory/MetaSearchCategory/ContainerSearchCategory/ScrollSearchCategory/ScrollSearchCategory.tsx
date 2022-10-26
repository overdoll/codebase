import { graphql, usePaginationFragment } from 'react-relay'
import { ScrollSearchCategoryFragment$key } from '@//:artifacts/ScrollSearchCategoryFragment.graphql'
import { ScrollSearchCategoryAccountFragment$key } from '@//:artifacts/ScrollSearchCategoryAccountFragment.graphql'
import { ResultSearchCategoryQuery } from '@//:artifacts/ResultSearchCategoryQuery.graphql'
import { VerticalPaginationScroller } from '@//:modules/content/HookedComponents/Post'
import { useFragment } from 'react-relay/hooks'
import { Stack } from '@chakra-ui/react'
import PostsFilters from '@//:modules/content/HookedComponents/Filters/fragments/PostsFilters/PostsFilters'

interface Props {
  categoryQuery: ScrollSearchCategoryFragment$key
  accountQuery: ScrollSearchCategoryAccountFragment$key | null
}

const Fragment = graphql`
  fragment ScrollSearchCategoryFragment on Category
  @argumentDefinitions(
    first: {type: Int, defaultValue: 5}
    after: {type: String}
  )
  @refetchable(queryName: "SearchCategoryPostsPaginationQuery" ) {
    posts (
      first: $first,
      after: $after,
      sortBy: $sortBy,
      seed: $seed
    )
    @connection (key: "SearchCategoryPosts_posts") {
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
  fragment ScrollSearchCategoryAccountFragment on Account {
    ...PostsFiltersFragment
  }
`

export default function ScrollSearchCategory (props: Props): JSX.Element {
  const {
    categoryQuery,
    accountQuery
  } = props

  const {
    data,
    loadNext,
    hasNext,
    isLoadingNext,
    refetch
  } = usePaginationFragment<ResultSearchCategoryQuery, any>(
    Fragment,
    categoryQuery
  )

  const accountData = useFragment(AccountFragment, accountQuery)

  return (
    <Stack spacing={2}>
      <PostsFilters
        loadQuery={refetch}
        accountQuery={accountData}
      />
      <VerticalPaginationScroller
        postConnectionQuery={data.posts}
        hasNext={hasNext}
        loadNext={loadNext}
        isLoadingNext={isLoadingNext}
      />
    </Stack>
  )
}
