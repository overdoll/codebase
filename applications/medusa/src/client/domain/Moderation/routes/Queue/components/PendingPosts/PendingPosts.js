/**
 * @flow
 */

import {
  Flex,
  Stack,
  Text,
  IconButton,
  Heading
} from '@chakra-ui/react'
import Icon from '@//:modules/content/Icon/Icon'
import { useState } from 'react'
import { usePaginationFragment, graphql } from 'react-relay'

import { useTranslation } from 'react-i18next'
import type { PostsPaginationQuery } from '@//:artifacts/PostsPaginationQuery.graphql'
import type { PendingPostsFragment$key } from '@//:artifacts/PendingPostsFragment.graphql'
import type { QueuePostsQuery } from '@//:artifacts/QueuePostsQuery.graphql'
import ModeratePost from './ModeratePost/ModeratePost'
import PostHeader from './PostHeader/PostHeader'
import PostContent from './PostContent/PostContent'
import PostArtist from './PostArtist/PostArtist'
import PostCharacters from './PostCharacters/PostCharacters'
import PostCategories from './PostCategories/PostCategories'
import NoPostsPlaceholder from './NoPostsPlaceholder/NoPostsPlaceholder'

import InterfaceArrowsButtonRight
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/arrows/interface-arrows-button-right.svg'
import InterfaceArrowsButtonLeft
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/arrows/interface-arrows-button-left.svg'

type Props = {
  query: QueuePostsQuery,
  posts: PendingPostsFragment$key
}

const pendingPostsGQL = graphql`
  fragment PendingPostsFragment on Account
  @argumentDefinitions(
    first: {type: Int, defaultValue: 1}
    after: {type: String}
  )
  @refetchable(queryName: "PostsPaginationQuery" ) {
    ...NoPostsPlaceholderFragment
    moderatorPostsQueue (first: $first, after: $after)
    @connection(key: "Posts_moderatorPostsQueue") {
      __id
      edges {
        node {
          ...PostHeaderFragment
          ...PostContentFragment
          ...PostArtistFragment
          ...PostCharactersFragment
          ...PostCategoriesFragment
          ...ModeratePostFragment
          postedAt
        }
      }
    }
  }
`

export default function (props: Props): Node {
  const [t] = useTranslation('moderation')

  const { data, loadNext, hasNext, isLoadingNext } = usePaginationFragment<PostsPaginationQuery,
    _>(
      pendingPostsGQL,
      props.posts
    )

  const [currentIndex, setCurrentIndex] = useState(0)

  const currentPost = data?.moderatorPostsQueue.edges[currentIndex]?.node

  const postsConnection = data?.moderatorPostsQueue?.__id

  const nextPage = () => {
    if (currentIndex + 1 === data?.moderatorPostsQueue.edges.length) {
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

  const parseDate = (date) => {
    const current = new Date(date)
    const month = current.toLocaleString('default', { month: 'long' })
    const day = current.getDay()
    return `${month} ${day}`
  }

  // If there are no posts in queue, return a placeholder that also shows if they are in queue
  if (data.moderatorPostsQueue.edges.length < 1) {
    return (
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
        <NoPostsPlaceholder moderator={data} />
      </Flex>
    )
  }

  // Otherwise, show a post queue if the user has one
  return (
    <>
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
          >{t('queue.post.title', { date: parseDate(currentPost.postedAt) })}
          </Text>
        </Flex>
        {(currentIndex + 1 !== data.moderatorPostsQueue?.edges.length || hasNext) &&
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
        mt={2}
        bg='gray.800'
        borderRadius={10}
        position='relative'
        direction='column'
      >
        <Flex direction='column' p={6}>
          <PostHeader contributor={currentPost} />
          <Stack spacing={2} direction='column' mt={4}>
            <Flex mb={1} direction='column'>
              <Heading mb={2} color='gray.00' size='md'>{t('queue.post.content')}</Heading>
              <PostContent content={currentPost} />
            </Flex>
            <Flex direction='column'>
              <Heading mb={2} color='gray.00' size='md'>{t('queue.post.tags.title')}</Heading>
              <Stack spacing={2}>
                <Flex direction='column'>
                  <Heading mb={1} fontSize='md' color='teal.50'>{t('queue.post.tags.artist')}</Heading>
                  <PostArtist artist={currentPost} />
                </Flex>
                <Flex direction='column'>
                  <Heading mb={1} fontSize='md' color='purple.50'>{t('queue.post.tags.characters')}</Heading>
                  <PostCharacters characters={currentPost} />
                </Flex>
                <Flex direction='column'>
                  <Heading mb={1} fontSize='md' color='orange.50'>{t('queue.post.tags.categories')}</Heading>
                  <PostCategories categories={currentPost} />
                </Flex>
              </Stack>
            </Flex>
          </Stack>
        </Flex>
        <ModeratePost connectionID={postsConnection} infractions={props.query} postID={currentPost} />
      </Flex>
    </>
  )
}
