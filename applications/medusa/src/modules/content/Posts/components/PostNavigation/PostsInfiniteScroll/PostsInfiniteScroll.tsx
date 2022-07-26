import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { Box, Flex, Spinner, Stack } from '@chakra-ui/react'
import FullSimplePost from './FullSimplePost/FullSimplePost'
import type { PostsInfiniteScrollFragment$key } from '@//:artifacts/PostsInfiniteScrollFragment.graphql'
import type { PostsInfiniteScrollViewerFragment$key } from '@//:artifacts/PostsInfiniteScrollViewerFragment.graphql'
import LoadMoreObserver from './LoadMoreObserver/LoadMoreObserver'
import { Fragment, useTransition } from 'react'
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

  // @ts-expect-error
  const [isPending, startTransition] = useTransition({
    timeoutMs: 150
  })

  if (((data?.edges) != null) && data?.edges.length < 1) {
    return (
      <EmptyPosts />
    )
  }

  const SpinnerSection = (): JSX.Element => {
    const SpinnerComponent = (
      <Flex w='100%' justify='center'>
        <Spinner color='gray.100' size='sm' />
      </Flex>
    )

    if (isLoadingNext || isPending) {
      return SpinnerComponent
    }

    if (hasNext) {
      return (
        <Box>
          <LoadMoreObserver startTransition={startTransition} loadNext={loadNext} />
          {SpinnerComponent}
        </Box>
      )
    }
    return <Box h={100} w='100%' />
  }

  return (
    <Stack spacing={16}>
      {data?.edges.map((item, index) =>
        (
          <Fragment key={index}>
            {(hasNext && data.edges.length - 2 === index) &&
              <LoadMoreObserver startTransition={startTransition} loadNext={loadNext} />}
            <Box key={index}>
              <FullSimplePost query={item.node} viewerQuery={viewerData} />
            </Box>
          </Fragment>
        ))}
      <SpinnerSection />
    </Stack>
  )
}
