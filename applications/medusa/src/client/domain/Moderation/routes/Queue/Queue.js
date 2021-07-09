/**
 * @flow
 */
import type { Node } from 'react'
import { Helmet } from 'react-helmet-async'
import { Suspense, useEffect } from 'react'
import type { QueuePendingPostsQuery } from '@//:artifacts/QueuePendingPostsQuery.graphql'
import { PreloadedQuery } from 'react-relay/hooks'
import {
  Heading, Center,
  Flex, Stack, Text, CircularProgress, CircularProgressLabel, Skeleton, IconButton
} from '@chakra-ui/react'
import Icon from '@//:modules/content/icon/Icon'
import Button from '@//:modules/form/button'
import InterfaceArrowsSynchronize
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/arrows/interface-arrows-synchronize.svg'
import { graphql, usePreloadedQuery, useLazyLoadQuery, useQueryLoader } from 'react-relay'
import PendingPosts from './components/PendingPosts/PendingPosts'
import { useTranslation } from 'react-i18next'

type Props = {
  pendingPostsQueryRef: PreloadedQuery<QueuePendingPostsQuery>
}

const pendingPostsGQL = graphql`
  query QueuePendingPostsQuery ($before: String, $after: String, $first: Int, $last: Int) {
    pendingPosts (input: {first: $first, before: $before, after: $after, last: $last}, filter: {}) {
      edges {
        cursor
        node {
          id
          state
          contributor {
            username
            avatar
          }
          content
          categories {
            title
          }
          characters {
            name
            media {
              title
            }
          }
          mediaRequests
          characterRequests {
            name
            media
          }
          artistUsername
        }
      }
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
      }
    }
  }
`

export default function Queue (props: Props): Node {
  const [pendingPostsQueryRef, loadQuery] = useQueryLoader<QueuePendingPostsQuery>(
    pendingPostsGQL,
    props.pendingPostsQueryRef
  )

  const [t] = useTranslation('moderation')

  useEffect(() => {
    loadQuery({ first: 1, last: null, before: null, after: '1622477504' })
  }, [])

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
          <Flex align='center' justify='space-between'>
            <Heading size='lg' color='gray.00'>{t('queue.title')}</Heading>
            <IconButton
              icon={<Icon icon={InterfaceArrowsSynchronize} w='fill' h='fill' fill='gray.500' />}
              variant='solid' borderRadius={5} pl={2} pr={2} pt={1} pb={1}
              bg='transparent' onClick={() => loadQuery()}
              disabled={!pendingPostsQueryRef}
            />
          </Flex>
          <Suspense fallback={<PostSuspense />}>
            {pendingPostsQueryRef != null
              ? <PendingPosts queryRef={pendingPostsQueryRef} query={pendingPostsGQL} refresh={loadQuery} />
              : <PostSuspense />}
          </Suspense>
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
