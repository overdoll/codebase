import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { Box, Flex, Spinner, Stack } from '@chakra-ui/react'
import { PostVideoManagerProvider } from '../../../index'
import { ObserverManagerProvider } from '../../../support/ObserverManager/ObserverManager'
import FullSimplePost from './FullSimplePost/FullSimplePost'
import type { PostsInfiniteScrollFragment$key } from '@//:artifacts/PostsInfiniteScrollFragment.graphql'
import type { PostsInfiniteScrollViewerFragment$key } from '@//:artifacts/PostsInfiniteScrollViewerFragment.graphql'
import { SmallBackgroundBox } from '../../../../PageLayout'
import { Trans } from '@lingui/macro'

interface Props {
  query: PostsInfiniteScrollFragment$key
  viewerQuery: PostsInfiniteScrollViewerFragment$key | null
  hasNext: boolean
  loadNext: (number, options) => {}
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
      <SmallBackgroundBox>
        <Trans>
          We couldn't find any posts
        </Trans>
      </SmallBackgroundBox>
    )
  }

  return (
    <Stack spacing={16}>
      {data?.edges.map((item, index) =>
        (
          <Box key={index}>
            <ObserverManagerProvider>
              {({ isObserving }) => {
                if (isObserving && index >= (data.edges.length - 2)) {
                  if (!isLoadingNext && hasNext) {
                    loadNext(9, {})
                  }
                }
                return (
                  <PostVideoManagerProvider>
                    <FullSimplePost query={item.node} viewerQuery={viewerData} />
                  </PostVideoManagerProvider>
                )
              }}
            </ObserverManagerProvider>
          </Box>))}
      {hasNext &&
        (
          <>
            {isLoadingNext &&
              (
                <Flex w='100%' justify='center'>
                  <Spinner color='gray.100' size='sm' />
                </Flex>)}
          </>
        )}
    </Stack>
  )
}
