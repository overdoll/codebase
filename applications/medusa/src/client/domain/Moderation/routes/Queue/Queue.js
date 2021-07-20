/**
 * @flow
 */
import type { Node } from 'react'
import { Helmet } from 'react-helmet-async'
import { Suspense, useEffect } from 'react'
import { PreloadedQuery } from 'react-relay/hooks'
import {
  Heading, Center,
  Flex, Stack, Text, CircularProgress, CircularProgressLabel, Skeleton, IconButton
} from '@chakra-ui/react'
import Icon from '@//:modules/content/icon/Icon'
import Button from '@//:modules/form/button'
import InterfaceArrowsSynchronize
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/arrows/interface-arrows-synchronize.svg'
import { graphql, usePreloadedQuery, useLazyLoadQuery, useQueryLoader, usePaginationFragment } from 'react-relay'
import PendingPosts from './components/PendingPosts/PendingPosts'
import { useTranslation } from 'react-i18next'

import type { QueuePostsFragment$key } from '@//:artifacts/QueuePostsFragment.graphql'
import type { PostsPaginationQuery } from '@//:artifacts/PostsPaginationQuery.graphql'
import type { QueuePostsQuery } from '@//:artifacts/QueuePostsQuery.graphql'

type Props = {
  pendingPosts: QueuePostsFragment$key,
  pendingPostsQuery: PreloadedQuery<QueuePostsQuery>
}

const pendingPostsGQL = graphql`
  fragment QueuePostsFragment on Query
  @argumentDefinitions(
    first: {type: Int, defaultValue: 1}
    after: {type: String}
  )
  @refetchable(queryName: "PostsPaginationQuery" ) {
    pendingPosts (first: $first, after: $after)
    @connection(key: "QueuePostsFragment_pendingPosts") {
      edges {
        node {
          id
          artistId
        }
      }
    }
  }
`

export default function Queue (props: Props): Node {
  const [t] = useTranslation('moderation')

  const { data, loadNext, hasNext, hasPrevious, loadPrevious, isLoadingNext, isLoadingPrevious } = usePaginationFragment<PostsPaginationQuery,
    _>(
      pendingPostsGQL,
      props.pendingPosts
    )

  const queryData = useLazyLoadQuery(
    graphql`
      query QueuePostsQuery {
        ...QueuePostsFragment
      }
    `,
    props.pendingPostsQuery
  )

  console.log(queryData)

  return (
    <>
      <Helmet title='queue' />
      <Center mt={8}>
        <Flex
          w={['full', 'sm', 'md', 'lg']}
          pl={[1, 0]}
          pr={[1, 0]}
          direction='column'
          mb={6}
        >
          <button onClick={() => loadNext(10)}>123</button>
          <Flex align='center' justify='space-between'>
            <Heading size='lg' color='gray.00'>{t('queue.title')}</Heading>
            <IconButton
              icon={<Icon icon={InterfaceArrowsSynchronize} w='fill' h='fill' fill='gray.500' />}
              variant='solid' borderRadius={5} pl={2} pr={2} pt={1} pb={1}
              bg='transparent'
            />
          </Flex>
          <Suspense fallback={<PostSuspense />} />
        </Flex>
      </Center>
    </>
  )
}

const PostSuspense = () => {
  return (
    <Stack mt={2}>
      <Skeleton borderRadius={5} h={12} />
      <Skeleton borderRadius={5} h={12} />
      <Skeleton borderRadius={5} h={12} />
    </Stack>
  )
}
