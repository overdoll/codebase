import { graphql, usePaginationFragment } from 'react-relay'
import { ScrollPublicClubCharacterFragment$key } from '@//:artifacts/ScrollPublicClubCharacterFragment.graphql'
import { ResultPublicClubCharacterQuery } from '@//:artifacts/ResultPublicClubCharacterQuery.graphql'
import { PreviewPost, VerticalPaginationScroller } from '@//:modules/content/HookedComponents/Post'
import {
  ScrollPublicClubCharacterAccountFragment$key
} from '@//:artifacts/ScrollPublicClubCharacterAccountFragment.graphql'
import { Stack } from '@chakra-ui/react'
import PostsFilters from '@//:modules/content/HookedComponents/Filters/fragments/PostsFilters/PostsFilters'
import { useFragment } from 'react-relay/hooks'

interface Props {
  characterQuery: ScrollPublicClubCharacterFragment$key
  accountQuery: ScrollPublicClubCharacterAccountFragment$key | null
}

const Fragment = graphql`
  fragment ScrollPublicClubCharacterFragment on Character
  @argumentDefinitions(
    first: {type: Int, defaultValue: 5}
    after: {type: String}
  )
  @refetchable(queryName: "PublicClubCharacterPostsPaginationQuery" ) {
    posts (
      first: $first,
      after: $after,
      sortBy: $sortBy,
      seed: $seed
    )
    @connection (key: "PublicClubCharacterPosts_posts") {
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
  fragment ScrollPublicClubCharacterAccountFragment on Account {
    ...PostsFiltersFragment
  }
`

export default function ScrollPublicClubCharacter (props: Props): JSX.Element {
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
  } = usePaginationFragment<ResultPublicClubCharacterQuery, any>(
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
