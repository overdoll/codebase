import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { Box, Flex, Spinner, Stack } from '@chakra-ui/react'
import type { PostInfiniteScrollFragment$key } from '@//:artifacts/PostInfiniteScrollFragment.graphql'
import LoadMoreObserver from './LoadMoreObserver/LoadMoreObserver'
import { Fragment, ReactNode } from 'react'
import { LoadMoreFn } from 'react-relay/relay-hooks/useLoadMoreFunction'
import { EmptyPosts } from '../../../../Placeholder'
import runIfFunction from '../../../../../support/runIfFunction'
import { MaybeRenderProp } from '@//:types/components'
import PlatformPromoteAlert from '@//:common/components/PlatformPromoteAlert/PlatformPromoteAlert'

interface ChildrenCallable {
  index: number
}

interface Props {
  query: PostInfiniteScrollFragment$key
  hasNext: boolean
  loadNext: LoadMoreFn<any>
  isLoadingNext: boolean
  children: MaybeRenderProp<ChildrenCallable>
  endOfTree?: ReactNode
}

const PostFragment = graphql`
  fragment PostInfiniteScrollFragment on PostConnection {
    edges {
      node {
        id
        __typename
      }
    }
  }
`

export default function PostInfiniteScroll ({
  query,
  hasNext,
  loadNext,
  isLoadingNext,
  children,
  endOfTree
}: Props): JSX.Element {
  const data = useFragment(PostFragment, query)

  if (((data?.edges) != null) && data?.edges.length < 1) {
    return (
      <Stack spacing={24}>
        <EmptyPosts />
        <PlatformPromoteAlert />
      </Stack>
    )
  }

  const SpinnerSection = (): JSX.Element => {
    const SpinnerComponent = (
      <Flex
        mb={{
          base: 50,
          md: 400
        }}
        w='100%'
        justify='center'
      >
        <Spinner color='gray.100' size='sm' />
      </Flex>
    )

    if (isLoadingNext) {
      return SpinnerComponent
    }

    if (hasNext) {
      return (
        <Box>
          <LoadMoreObserver loadNext={loadNext} />
          {SpinnerComponent}
        </Box>
      )
    }
    return (
      <Stack spacing={2}>
        <Flex mt={20}>
          {endOfTree}
        </Flex>
        <Box
          h={{
            base: 50,
            md: 400
          }}
          w='100%'
        />
      </Stack>
    )
  }

  return (
    <Stack spacing={16}>
      {data?.edges.map((item, index) =>
        (
          <Fragment key={item.node.id}>
            {(hasNext && data.edges.length - 2 === index) &&
              <LoadMoreObserver loadNext={loadNext} />}
            <Box>
              {runIfFunction(children, {
                index
              })}
            </Box>
          </Fragment>
        ))}
      <SpinnerSection />
    </Stack>
  )
}
