/**
 * @flow
 */

import {
  Flex,
  Text,
  IconButton, Box
} from '@chakra-ui/react'
import Icon from '@//:modules/content/Icon/Icon'
import { useState } from 'react'
import { usePaginationFragment, graphql } from 'react-relay'
import { format } from 'date-fns'
import { useTranslation } from 'react-i18next'
import type { PostsFragment$key } from '@//:artifacts/PostsFragment.graphql'
import ModeratePost from './ModeratePost/ModeratePost'
import PostHeader from './PostHeader/PostHeader'
import NoPostsPlaceholder from './NoPostsPlaceholder/NoPostsPlaceholder'

import InterfaceArrowsButtonRight
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/arrows/interface-arrows-button-right.svg'
import InterfaceArrowsButtonLeft
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/arrows/interface-arrows-button-left.svg'
import PostPreview from './PostPreview/PostPreview'
import type { PreloadedQueryInner } from 'react-relay/hooks'
import type { PostsQuery } from '@//:artifacts/PostsQuery.graphql'
import { usePreloadedQuery } from 'react-relay/hooks'

type Props = {
  query: PreloadedQueryInner<PostsQuery>,

}

const PostsQueryGQL = graphql`
    query PostsQuery {
        viewer {
            ...PostsFragment
        }
        ...RejectionReasonsFragment
    }
`

const PostsGQL = graphql`
    fragment PostsFragment on Account
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
                    id
                    ...PostHeaderFragment
                    ...PostPreviewFragment
                    ...ModeratePostFragment
                    postedAt
                }
            }
        }
    }
`

export default function Posts (props: Props): Node {
  const queryData = usePreloadedQuery<PostsQuery>(
    PostsQueryGQL,
    props.query
  )

  const { data, loadNext, hasNext, isLoadingNext } = usePaginationFragment<PostsFragment$key,
    _>(
      PostsGQL,
      queryData?.viewer
    )

  const [t] = useTranslation('moderation')

  // TODO make pagination more dynamic/flexible because it will probably break when a node is deleted

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

  const formattedDate = format(new Date(currentPost.postedAt), 'eeee h:m aaa')

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
          >{t('queue.post.title', { date: formattedDate })}
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
          <PostPreview post={currentPost} />
        </Flex>
        <ModeratePost connectionID={postsConnection} infractions={queryData} postID={currentPost} />
        <Box pl={1} pr={1}>
          <Text fontSize='xs' color='gray.500'>
            {currentPost.id}
          </Text>
        </Box>
      </Flex>
    </>
  )
}
