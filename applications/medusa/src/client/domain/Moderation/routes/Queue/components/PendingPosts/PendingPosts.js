/**
 * @flow
 */

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
  Wrap,
  WrapItem,
  Heading, Avatar, Skeleton, useDisclosure
} from '@chakra-ui/react'
import Icon from '@//:modules/content/icon/Icon'
import { useEffect, useState } from 'react'
import { graphql, usePreloadedQuery, useLazyLoadQuery, useQueryLoader, usePaginationFragment } from 'react-relay'
import mime from 'mime-types'

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
import type { PostsPaginationQuery } from '@//:artifacts/PostsPaginationQuery.graphql'
import type { QueuePostsFragment$key } from '@//:artifacts/QueuePostsFragment.graphql'
import type { QueuePostsQuery } from '@//:artifacts/QueuePostsQuery.graphql'
import SuspenseImage from '@//:modules/utilities/SuspenseImage'

/*
  queryRef: PreloadedQuery<QueuePendingPostsQuery>,
  refresh: () => void,
 */

type Props = {
  query: QueuePostsQuery,
  queryRef: QueuePostsQuery,
  paginationQuery: QueuePostsFragment$key,
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
            align='center'
            justify='center'
          >
            <Text color='gray.300' fontWeight='medium' size='md'>{currentPost.id}</Text>
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
          height='500px'
          mt={2}
          p={6}
          bg='gray.800'
          borderRadius={10}
        >
          <Flex align='center' w='100%' justify='space-between'>
            <Flex align='center'>
              <Avatar src={currentPost.contributor.avatar} w={6} h={6} mr={2} borderRadius='25%' />
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
          <Stack direction='column' mt={4}>
            <Flex direction='column'>
              <Heading mb={2} color='gray.00' size='md'>{t('queue.post.content')}</Heading>
              <Wrap justify='center'>
                {currentPost.content.map((item, index) => {
                  const rawType = mime.lookup(item)

                  const fileType = rawType.split('/')[0]

                  return (
                    <WrapItem spacing={4} h={200} w={160} key={index}>
                      {fileType === 'image'
                        ? <SuspenseImage
                            alt='thumbnail'
                            h='100%'
                            objectFit='cover'
                            src={item} fallback={<Skeleton w='100%' h='100%' />}
                          />
                        : <video
                            controls
                            disablePictureInPicture
                            controlsList='nodownload noremoteplayback nofullscreen'
                            muted loop preload='auto' style={{
                              objectFit: 'cover',
                              height: '100%'
                            }}
                          >
                          <source src={item} type={rawType} />
                        </video>}
                    </WrapItem>
                  )
                })}
              </Wrap>
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
