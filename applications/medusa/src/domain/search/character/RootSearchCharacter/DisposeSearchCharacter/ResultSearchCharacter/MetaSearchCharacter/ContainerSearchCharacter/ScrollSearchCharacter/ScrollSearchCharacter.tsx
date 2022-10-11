import { graphql, usePaginationFragment } from 'react-relay'
import { ScrollSearchCharacterFragment$key } from '@//:artifacts/ScrollSearchCharacterFragment.graphql'
import { ScrollSearchCharacterAccountFragment$key } from '@//:artifacts/ScrollSearchCharacterAccountFragment.graphql'

import { ResultSearchCharacterQuery } from '@//:artifacts/ResultSearchCharacterQuery.graphql'
import { PreviewPost, VerticalPaginationScroller } from '@//:modules/content/HookedComponents/Post'
import { Stack } from '@chakra-ui/react'
import { useFragment } from 'react-relay/hooks'
import PostsFilters from '@//:modules/content/HookedComponents/Filters/fragments/PostsFilters/PostsFilters'

interface Props {
  characterQuery: ScrollSearchCharacterFragment$key
  accountQuery: ScrollSearchCharacterAccountFragment$key | null
}

const Fragment = graphql`
  fragment ScrollSearchCharacterFragment on Character
  @argumentDefinitions(
    first: {type: Int, defaultValue: 5}
    after: {type: String}
  )
  @refetchable(queryName: "SearchCharacterPostsPaginationQuery" ) {
    posts (
      first: $first,
      after: $after,
      sortBy: $sortBy,
      seed: $seed
    )
    @connection (key: "SearchCharacterPosts_posts") {
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
  fragment ScrollSearchCharacterAccountFragment on Account {
    ...PostsFiltersFragment
  }
`

export default function ScrollSearchCharacter (props: Props): JSX.Element {
  const {
    characterQuery,
    accountQuery
  } = props

  const {
    data,
    loadNext,
    hasNext,
    isLoadingNext,
    refetch
  } = usePaginationFragment<ResultSearchCharacterQuery, any>(
    Fragment,
    characterQuery
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
