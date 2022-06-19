import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { Box, Flex, Spinner, Stack } from '@chakra-ui/react'
import FullSimplePost from './FullSimplePost/FullSimplePost'
import type { PostsInfiniteScrollFragment$key } from '@//:artifacts/PostsInfiniteScrollFragment.graphql'
import type { PostsInfiniteScrollViewerFragment$key } from '@//:artifacts/PostsInfiniteScrollViewerFragment.graphql'
import LoadMoreObserver from './LoadMoreObserver/LoadMoreObserver'
import { Fragment } from 'react'
import { LoadMoreFn } from 'react-relay/relay-hooks/useLoadMoreFunction'
import { EmptyPosts } from '../../../../Placeholder'

interface Props {
  query: PostsInfiniteScrollFragment$key
  viewerQuery: PostsInfiniteScrollViewerFragment$key | null
  hasNext: boolean
  loadNext: LoadMoreFn<any>
  isLoadingNext: boolean
}

const PostFragment = graphql`
  fragment PostsInfiniteScrollFragment on PostConnection {
    edges {
      node {
        ...FullSimplePostFragment
      }
    }
  }
`

const ViewerFragment = graphql`
  fragment PostsInfiniteScrollViewerFragment on Account {
    ...FullSimplePostViewerFragment
  }
`

export default function PostsInfiniteScroll ({
  query,
  viewerQuery,
  hasNext,
  loadNext,
  isLoadingNext
}: Props): JSX.Element {
  const data = useFragment(PostFragment, query)

  const viewerData = useFragment(ViewerFragment, viewerQuery)

  if (((data?.edges) != null) && data?.edges.length < 1) {
    return (
      <EmptyPosts />
    )
  }

  const SpinnerSection = (): JSX.Element => {
    if (hasNext || isLoadingNext) {
      return (
        <Flex w='100%' justify='center'>
          <Spinner color='gray.100' size='sm' />
        </Flex>
      )
    }
    return <></>
  }

  return (
    <Stack spacing={16}>
      {data?.edges.map((item, index) =>
        (
          <Fragment key={index}>
            {hasNext && <LoadMoreObserver loadNext={loadNext} index={index} length={data.edges.length} />}
            <Box key={index}>
              <FullSimplePost query={item.node} viewerQuery={viewerData} />
            </Box>
          </Fragment>
        ))}
      <SpinnerSection />
    </Stack>
  )
}
