/**
 * @flow
 */
import type { Node } from 'react'
import { Helmet } from 'react-helmet-async'
import { Suspense } from 'react'
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
import Icon from '@//:modules/content/Icon/Icon'
import Button from '@//:modules/form/button'
import { graphql, usePreloadedQuery } from 'react-relay'
import Posts from './Posts/Posts'
import { useTranslation } from 'react-i18next'
import type { QueueQuery } from '@//:artifacts/QueueQuery.graphql'

import InterfaceHelpQuestionCircle
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/help/interface-help-question-circle.svg'

type Props = {
  prepared: {
    stateQuery: QueueQuery,
  }
}

const PostsGQL = graphql`
  query QueueQuery {
    viewer {
      ...PostsFragment
    }
    ...RejectionReasonsFragment
  }
`

export default function Queue (props: Props): Node {
  const [t] = useTranslation('moderation')

  const data = usePreloadedQuery<QueueQuery>(
    PostsGQL,
    props.prepared.stateQuery
  )

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
          </Flex>
          <Suspense fallback={
            <Stack mt={2}>
              {[...Array(3).keys()].map((item, index) =>
                <Skeleton key={index} borderRadius={5} h={12} />
              )}
            </Stack>
          }
          >
            <Posts
              query={data} posts={data?.viewer}
            />
          </Suspense>
        </Flex>
      </Center>
    </>
  )
}
