import { graphql, usePaginationFragment } from 'react-relay'
import { ScrollRandomFragment$key } from '@//:artifacts/ScrollRandomFragment.graphql'
import { ScrollRandomViewerFragment$key } from '@//:artifacts/ScrollRandomViewerFragment.graphql'
import { ResultRandomQuery } from '@//:artifacts/ResultRandomQuery.graphql'
import { PreviewPost, VerticalPaginationScroller } from '@//:modules/content/HookedComponents/Post'
import { Stack } from '@chakra-ui/react'
import PostsFilters from '@//:modules/content/HookedComponents/Filters/fragments/PostsFilters/PostsFilters'
import { useFragment } from 'react-relay/hooks'
import RandomizeButton from '../RandomizeButton/RandomizeButton'

interface Props {
  rootQuery: ScrollRandomFragment$key
  accountQuery: ScrollRandomViewerFragment$key | null
}

const RootFragment = graphql`
  fragment ScrollRandomFragment on Query
  @argumentDefinitions(
    first: {type: Int, defaultValue: 5}
    after: {type: String}
    sortBy: {type: PostsSort, defaultValue: ALGORITHM}
  )
  @refetchable(queryName: "RandomPostsPaginationQuery" ) {
    posts (first: $first, after: $after, seed: $seed, state: PUBLISHED, sortBy: $sortBy)
    @connection (key: "RandomPosts_posts") {
      edges {
        node {
          ...PreviewPostFragment
        }
      }
      ...VerticalPaginationScrollerFragment
    }
  }
`

const ViewerFragment = graphql`
  fragment ScrollRandomViewerFragment on Account {
    ...PostsFiltersFragment
  }
`

export default function ScrollRandom (props: Props): JSX.Element {
  const {
    rootQuery,
    accountQuery
  } = props

  const {
    data,
    loadNext,
    hasNext,
    isLoadingNext,
    refetch
  } = usePaginationFragment<ResultRandomQuery, any>(
    RootFragment,
    rootQuery
  )

  const accountData = useFragment(ViewerFragment, accountQuery)

  return (
    <>
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
      <RandomizeButton />
    </>
  )
}
