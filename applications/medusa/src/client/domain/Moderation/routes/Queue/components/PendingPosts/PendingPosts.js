/**
 * @flow
 */

import {
  Flex,
  Stack,
  Text,
  IconButton,
  Wrap,
  WrapItem,
  Heading,
  Avatar,
  TagLabel,
  Tag,
  Tooltip,
  Button
} from '@chakra-ui/react'
import Icon from '@//:modules/content/Icon/Icon'
import { useState } from 'react'
import { usePreloadedQuery, usePaginationFragment } from 'react-relay'

import { useTranslation } from 'react-i18next'
import type { PostsPaginationQuery } from '@//:artifacts/PostsPaginationQuery.graphql'
import type { QueuePostsFragment$key } from '@//:artifacts/QueuePostsFragment.graphql'
import type { QueuePostsQuery } from '@//:artifacts/QueuePostsQuery.graphql'
import ContentItem from '../../../../../../components/Posts/components/ContentItem/ContentItem'
import ReassignmentClock from '../ReassignmentClock/ReassignmentClock'
import ModeratePost from './ModeratePost/ModeratePost'
import { Link } from '@//:modules/routing'

import InterfaceArrowsButtonRight
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/arrows/interface-arrows-button-right.svg'
import InterfaceArrowsButtonLeft
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/arrows/interface-arrows-button-left.svg'
import InterfaceValidationCheckSquare1
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/validation/interface-validation-check-square-1.svg'
import EntertainmentControlButtonPauseCircle
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/entertainment/control-buttons/entertainment-control-button-pause-circle.svg'

type Props = {
  query: QueuePostsQuery,
  queryRef: QueuePostsQuery,
  paginationQuery: QueuePostsFragment$key,
  refresh: () => void,
}

export default function (props: Props): Node {
  const [t] = useTranslation('moderation')

  const initialQuery = usePreloadedQuery<QueuePostsQuery>(
    props.query,
    props.queryRef
  )

  const { data, loadNext, hasNext, isLoadingNext } = usePaginationFragment<PostsPaginationQuery,
    _>(
      props.paginationQuery,
      initialQuery
    )

  const [currentIndex, setCurrentIndex] = useState(0)

  const currentPost = data.pendingPosts?.edges[currentIndex]?.node

  const nextPage = () => {
    if (currentIndex + 1 === data.pendingPosts?.edges.length) {
      loadNext(
        1,
        {
          onComplete () {
            setCurrentIndex(x => x + 1)
          }
        }
      )
    } else {
      setCurrentIndex(x => x + 1)
    }
  }

  const previousPage = () => {
    if (currentIndex > 0) {
      setCurrentIndex(x => x + -1)
    }
  }

  return (
    data.pendingPosts.edges.length > 0
      ? <>
        <Flex mt={2}>
          {currentIndex !== 0 &&
            <IconButton
              icon={<Icon icon={InterfaceArrowsButtonLeft} w='fill' h='fill' fill='gray.300' />}
              variant='solid' borderRadius={5} pl={2} pr={2} pt={1} pb={1}
              h={12}
              mr={2}
              bg='gray.800'
              onClick={previousPage}
            />}
          <Flex
            borderRadius={5} h={12} pl={2} pr={2} pt={1} pb={1} w='100%' bg='gray.800'
            justify='center'
            align='center'
            position='relative'
          >
            <Text
              color='gray.300' fontWeight='medium'
              size='md'
            >{currentPost.id}
            </Text>
          </Flex>
          {(currentIndex + 1 !== data.pendingPosts?.edges.length || hasNext) &&
            <IconButton
              ml={2}
              icon={<Icon icon={InterfaceArrowsButtonRight} w='fill' h='fill' fill='gray.300' />}
              variant='solid' borderRadius={5} pl={2} pr={2} pt={1} pb={1}
              h={12}
              bg='gray.800'
              isLoading={isLoadingNext}
              onClick={nextPage}
            />}
        </Flex>
        <Flex
          flexDirection='column'
          mt={2}
          p={6}
          bg='gray.800'
          borderRadius={10}
        >
          <Flex align='center' w='100%' justify='space-between'>
            <Flex align='center'>
              <Avatar src={currentPost.contributor.avatar} w={10} h={10} mr={2} borderRadius='25%' />
              <Text color='gray.100' fontWeight='medium' size='md'>{currentPost.contributor.username}</Text>
            </Flex>
            <ReassignmentClock time={currentPost.reassignmentAt} />
          </Flex>
          <Stack spacing={2} direction='column' mt={4}>
            <Flex mb={1} direction='column'>
              <Heading mb={2} color='gray.00' size='md'>{t('queue.post.content')}</Heading>
              <Wrap justify='center'>
                {currentPost.content.map((item, index) =>
                  <WrapItem key={index} spacing={4} h={200} w={160}>
                    <ContentItem src={item} key={index} />
                  </WrapItem>
                )}
              </Wrap>
            </Flex>
            <Flex direction='column'>
              <Heading mb={2} color='gray.00' size='md'>{t('queue.post.tags.title')}</Heading>
              <Stack spacing={2}>
                <Flex direction='column'>
                  <Heading mb={1} fontSize='md' color='teal.50'>{t('queue.post.tags.artist')}</Heading>
                  <Wrap direction='column'>
                    <WrapItem>
                      <Tag size='lg' colorScheme='gray' borderRadius='full'>
                        <TagLabel>{currentPost.artistUsername}</TagLabel>
                      </Tag>
                    </WrapItem>
                  </Wrap>
                </Flex>
                <Flex direction='column'>
                  <Heading mb={1} fontSize='md' color='purple.50'>{t('queue.post.tags.characters')}</Heading>
                  <Wrap>
                    {currentPost.characters.map((item, index) =>
                      <WrapItem key={index}>
                        <Tag size='lg' colorScheme='gray' borderRadius='full'>
                          <TagLabel>{item.name} ({item.media.title})</TagLabel>
                        </Tag>
                      </WrapItem>
                    )}
                    {currentPost.characterRequests?.map((item, index) =>
                      <WrapItem key={index}>
                        <Tooltip label={t('queue.post.tags.new')}>
                          <Tag size='lg' colorScheme='green' borderRadius='full'>
                            <TagLabel>{item.name} ({item.media})</TagLabel>
                          </Tag>
                        </Tooltip>
                      </WrapItem>
                    )}
                  </Wrap>
                </Flex>
                <Flex direction='column'>
                  <Heading mb={1} fontSize='md' color='orange.50'>{t('queue.post.tags.categories')}</Heading>
                  <Wrap>
                    {currentPost.categories.map((item, index) =>
                      <WrapItem key={index}>
                        <Tag size='lg' colorScheme='gray' borderRadius='full'>
                          <TagLabel>{item.title}</TagLabel>
                        </Tag>
                      </WrapItem>
                    )}
                  </Wrap>
                </Flex>
              </Stack>
              <ModeratePost refresh={props.refresh} postId={currentPost.id} />
            </Flex>
          </Stack>
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
          {initialQuery.accountSettings.moderator.inQueue
            ? <>
              <Icon
                w={12} h={12} icon={InterfaceValidationCheckSquare1}
                fill='green.300'
              />
              <Heading color='gray.00' fontWeight='normal' size='xl' mt={8} mb={1}>
                {t('queue.empty.header')}
              </Heading>
              <Text color='gray.200'>
                {t('queue.empty.subheader')}
              </Text>
            </>
            : <>
              <Icon
                w={12} h={12} icon={EntertainmentControlButtonPauseCircle}
                fill='orange.300'
              />
              <Heading color='gray.00' fontWeight='normal' size='xl' mt={8} mb={1}>
                {t('queue.paused.header')}
              </Heading>
              <Text mb={1} color='gray.200'>
                {t('queue.paused.subheader')}
              </Text>
              <Link to='/s/moderation'>
                <Button
                  colorScheme='gray' variant='ghost'
                  size='md'
                >{t('queue.paused.unpause')}
                </Button>
              </Link>
            </>}
        </Flex>
      </>
  )
}
