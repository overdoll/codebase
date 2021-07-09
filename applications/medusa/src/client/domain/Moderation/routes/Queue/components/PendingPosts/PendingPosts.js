/**
 * @flow
 */

import type { QueuePendingPostsQuery, PendingPostQuery } from '@//:artifacts/QueuePendingPostsQuery.graphql'
import { PreloadedQuery } from 'react-relay/hooks'
import Button from '@//:modules/form/button'
import {
  CircularProgress,
  CircularProgressLabel,
  Flex,
  Stack,
  Text,
  IconButton,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Heading, Avatar
} from '@chakra-ui/react'
import Icon from '@//:modules/content/icon/Icon'
import { useEffect, useState } from 'react'
import { graphql, usePreloadedQuery, useLazyLoadQuery, useQueryLoader } from 'react-relay'

import InterfaceArrowsButtonRight
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/arrows/interface-arrows-button-right.svg'
import InterfaceArrowsButtonLeft
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/arrows/interface-arrows-button-left.svg'
import InterfaceValidationCheck
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/validation/interface-validation-check.svg'
import InterfaceValidationCheckCircle
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/validation/interface-validation-check-circle.svg'
import InterfaceValidationCheckSquare1
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/validation/interface-validation-check-square-1.svg'
import { useTranslation } from 'react-i18next'

type Props = {
  query: QueuePendingPostsQuery,
  queryRef: PreloadedQuery<QueuePendingPostsQuery>,
  refresh: () => void,
}

export default function (props: Props): Node {
  const postsQuery = usePreloadedQuery<QueuePendingPostsQuery>(
    props.query,
    props.queryRef
  )

  const [t] = useTranslation('moderation')

  const currentPost = postsQuery.pendingPosts?.edges[0]?.node

  const previousPage = (cursor) => {
    props.refresh({ last: 1, before: cursor })
  }
  const nextPage = (cursor) => {
    props.refresh({ first: 1, after: cursor })
  }

  console.log(postsQuery)

  return (
    postsQuery.pendingPosts.edges.length > 0
      ? <>
        <Flex mt={2}>
          {postsQuery.pendingPosts.pageInfo.hasPreviousPage &&
            <IconButton
              icon={<Icon icon={InterfaceArrowsButtonLeft} w='fill' h='fill' fill='gray.300' />}
              variant='solid' borderRadius={5} pl={2} pr={2} pt={1} pb={1}
              h={12}
              mr={2}
              bg='gray.800'
              onClick={() => previousPage(postsQuery.pendingPosts.edges[0].cursor)}
            />}
          <Flex
            borderRadius={5} h={12} pl={2} pr={2} pt={1} pb={1} w='100%' bg='gray.800'
            align='center'
            justify='center'
          >
            <Text color='gray.300' fontWeight='medium' size='md'>{currentPost.id}</Text>
          </Flex>
          {postsQuery.pendingPosts.pageInfo.hasNextPage &&
            <IconButton
              ml={2}
              icon={<Icon icon={InterfaceArrowsButtonRight} w='fill' h='fill' fill='gray.300' />}
              variant='solid' borderRadius={5} pl={2} pr={2} pt={1} pb={1}
              h={12}
              bg='gray.800'
              onClick={() => nextPage(postsQuery.pendingPosts.edges[0].cursor)}
            />}
        </Flex>
        <Flex
          flexDirection='column'
          height='500px'
          mt={2}
          p={6}
          bg='gray.800'
          borderRadius={10}
        >
          <Flex align='center' w='100%' justify='space-between'>
            <Flex align='center'>
              <Avatar src={currentPost.contributor.avatar} w={6} h={6} mr={2} borderRadius={7} />
              <Text color='gray.100' fontWeight='medium' size='md'>{currentPost.contributor.username}</Text>
            </Flex>
            <Flex align='center'>
              <CircularProgress size={8} value={50} color='green.500'>
                <CircularProgressLabel fontSize='xs'>
                  t
                </CircularProgressLabel>
              </CircularProgress>
            </Flex>
          </Flex>
          <Flex mt={4}>
            <Heading color='gray.00' size='md'>{t('queue.post.content')}</Heading>
          </Flex>
        </Flex>
      </>
      : <>
        <Flex
          flexDirection='column'
          alignItems='center'
          justifyContent='center'
          textAlign='center'
          height='500px'
          mt={4}
          p={12}
          bg='gray.800'
          borderRadius={10}
        >
          <Icon w={12} h={12} icon={InterfaceValidationCheckSquare1} fill='green.300' />
          <Heading color='gray.00' fontWeight='normal' size='xl' mt={8} mb={1}>
            {t('queue.empty.header')}
          </Heading>
          <Text color='gray.200'>
            {t('queue.empty.subheader')}
          </Text>
        </Flex>
      </>

  )
}
