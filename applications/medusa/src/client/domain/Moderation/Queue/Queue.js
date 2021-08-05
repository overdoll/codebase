/**
 * @flow
 */
import type { Node } from 'react'
import { Helmet } from 'react-helmet-async'
import { Suspense } from 'react'
import {
  Heading, Center,
  Flex, IconButton, Popover,
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
import { useTranslation } from 'react-i18next'
import type { PreparedPostsQuery } from '@//:artifacts/PreparedPostsQuery.graphql'
import InterfaceHelpQuestionCircle
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/help/interface-help-question-circle.svg'
import SkeletonStack from '@//:modules/content/SkeletonStack/SkeletonStack'
import PreparedPosts from './PreparedPosts/PreparedPosts'
import type { PreloadedQueryInner } from 'react-relay/hooks'

type Props = {
  prepared: {
    postsQuery: PreloadedQueryInner<PreparedPostsQuery>,
  }
}

export default function Queue (props: Props): Node {
  const [t] = useTranslation('moderation')

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
            <SkeletonStack />
          }
          >
            <PreparedPosts query={props.prepared.postsQuery} />
          </Suspense>
        </Flex>
      </Center>
    </>
  )
}
