/**
 * @flow
 */
import type { Node } from 'react'
import { Helmet } from 'react-helmet-async'
import { Suspense, useEffect } from 'react'
import { PreloadedQuery } from 'react-relay/hooks'
import {
  Heading, Center,
  Flex, Stack, Skeleton, IconButton, Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton
} from '@chakra-ui/react'
import Icon from '@//:modules/content/icon/Icon'
import Button from '@//:modules/form/button'
import InterfaceArrowsSynchronize
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/arrows/interface-arrows-synchronize.svg'
import { graphql, useQueryLoader } from 'react-relay'
import PendingPosts from './components/PendingPosts/PendingPosts'
import { useTranslation } from 'react-i18next'
import type { QueuePostsQuery } from '@//:artifacts/QueuePostsQuery.graphql'
import ErrorFallback from '../../../../components/ErrorFallback/ErrorFallback'
import ErrorBoundary from '@//:modules/utilities/ErrorBoundary'
import InterfaceHelpQuestionCircle
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/help/interface-help-question-circle.svg'

type Props = {
  postsQuery: PreloadedQuery<QueuePostsQuery>,
}

const pendingPostsGQL = graphql`
  fragment QueuePostsFragment on Account
  @argumentDefinitions(
    first: {type: Int, defaultValue: 1}
    after: {type: String}
  )
  @refetchable(queryName: "PostsPaginationQuery" ) {
    moderatorPostsQueue (first: $first, after: $after)
    @connection(key: "Posts_moderatorPostsQueue") {
      edges {
        node {
          id
          state
          contributor {
            username
            avatar
          }
          content {
            url
          }
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
          postedAt
          reassignmentAt
        }
      }
    }
  }
`

const queuePostsGQL = graphql`
  query QueuePostsQuery {
    viewer {
      ...QueuePostsFragment
      moderator {
        lastSelected
      }
    }
  }
`

export default function Queue (props: Props): Node {
  const [t] = useTranslation('moderation')

  const [queryRef, loadQuery] = useQueryLoader<QueuePostsQuery>(
    queuePostsGQL,
    props.postsQuery
  )

  useEffect(() => {
    loadQuery()
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
            <Flex>
              <Heading size='lg' color='gray.00'>{t('queue.title')}</Heading>
              <Popover placement='bottom'>
                <PopoverTrigger>
                  <IconButton
                    ml={1}
                    size='xs'
                    variant='link' mb={2}
                    icon={<Icon h={3} w={3} fill='gray.100' icon={InterfaceHelpQuestionCircle} />}
                  />
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverHeader pt={4} border={0}>
                    <Heading color='gray.00' fontSize='lg'>{t('queue.post.actions.notice.title')}</Heading>
                  </PopoverHeader>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverBody pr={2}>{t('queue.post.actions.notice.description')}</PopoverBody>
                  <PopoverFooter pb={2} justify='flex-start' border={0}>
                    <Button
                      colorScheme='blue' variant='link'
                      size='md'
                    >{t('queue.post.actions.notice.link')}
                    </Button>
                  </PopoverFooter>
                </PopoverContent>
              </Popover>
            </Flex>
            <IconButton
              icon={<Icon icon={InterfaceArrowsSynchronize} w='fill' h='fill' fill='gray.500' />}
              variant='solid' borderRadius={5} pl={2} pr={2} pt={1} pb={1}
              bg='transparent'
              onClick={loadQuery}
            />
          </Flex>
          <ErrorBoundary
            fallback={({ error, reset }) => (
              <ErrorFallback error={error} reset={reset} refetch={loadQuery} />
            )}
          >
            <Suspense fallback={<PostSuspense />}>
              {queryRef
                ? <PendingPosts
                    queryRef={queryRef} query={queuePostsGQL}
                    paginationQuery={pendingPostsGQL}
                    refresh={loadQuery}
                  />
                : <PostSuspense />}
            </Suspense>
          </ErrorBoundary>
        </Flex>
      </Center>
    </>
  )
}

const PostSuspense = () => {
  return (
    <Stack mt={2}>
      {[...Array(3).keys()].map((item, index) =>
        <Skeleton key={index} borderRadius={5} h={12} />
      )}
    </Stack>
  )
}
