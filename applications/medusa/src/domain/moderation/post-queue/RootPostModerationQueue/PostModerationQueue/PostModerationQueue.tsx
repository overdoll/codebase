import { Flex, Skeleton, Stack, Text } from '@chakra-ui/react'
import Icon from '@//:modules/content/PageLayout/Flair/Icon/Icon'
import { Fragment as ReactFragment, useEffect, useState } from 'react'
import { graphql, usePaginationFragment } from 'react-relay'
import { format } from 'date-fns'
import ModeratePost from './ModeratePost/ModeratePost'
import NoPostsPlaceholder from './NoPostsPlaceholder/NoPostsPlaceholder'
import { ArrowButtonLeft, ArrowButtonRight } from '@//:assets/icons/navigation'
import PostPreview from './PostPreview/PostPreview'
import type { PreloadedQuery } from 'react-relay/hooks'
import { usePreloadedQuery } from 'react-relay/hooks'
import type { PostModerationQueueQuery } from '@//:artifacts/PostModerationQueueQuery.graphql'
import { LargeBackgroundBox, PostPlaceholder, SmallBackgroundBox } from '@//:modules/content/PageLayout'
import IconButton from '@//:modules/form/IconButton/IconButton'
import { dateFnsLocaleFromI18n } from '@//:modules/locale'
import { useLingui } from '@lingui/react'
import { Trans } from '@lingui/macro'
import PostTagsPreview from './PostTagsPreview/PostTagsPreview'

interface Props {
  query: PreloadedQuery<PostModerationQueueQuery>
}

const Query = graphql`
  query PostModerationQueueQuery @preloadable {
    viewer {
      ...PostModerationQueueFragment
    }
    ...RejectionReasonsFragment
  }
`

const Fragment = graphql`
  fragment PostModerationQueueFragment on Account
  @argumentDefinitions(
    first: {type: Int, defaultValue: 1}
    after: {type: String}
  )
  @refetchable(queryName: "PostsPaginationQuery" ) {
    ...NoPostsPlaceholderFragment
    postModeratorQueue (first: $first, after: $after)
    @connection(key: "Posts_postModeratorQueue") {
      __id
      edges {
        node {
          post {
            id
            ...PostPreviewFragment
            ...ModeratePostFragment
            ...PostTagsPreviewFragment
            postedAt
          }
        }
      }
    }
  }
`

export default function PostModerationQueue (props: Props): JSX.Element {
  const queryData = usePreloadedQuery<PostModerationQueueQuery>(
    Query,
    props.query
  )

  const {
    data,
    loadNext,
    hasNext,
    isLoadingNext
  } = usePaginationFragment<PostModerationQueueQuery, any>(
    Fragment,
    queryData?.viewer
  )

  const { i18n } = useLingui()

  const [currentIndex, setCurrentIndex] = useState(0)

  const currentPost = data?.postModeratorQueue.edges[currentIndex]?.node.post

  const postsConnection = data?.postModeratorQueue?.__id

  const nextPage = (): void => {
    if (currentIndex + 1 >= data?.postModeratorQueue.edges.length) {
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

  const previousPage = (): void => {
    if (currentIndex > 0) {
      setCurrentIndex(x => x + -1)
    }
  }

  // If a user approves a post and there are no more in the store but
  // they are able to load more, we go to next page for them
  // automatically so the queue can continue
  useEffect(() => {
    if (hasNext && data?.postModeratorQueue.edges.length < 1) {
      nextPage()
    } else if (currentPost == null && data.postModeratorQueue.edges.length > 0) {
      previousPage()
    }
  }, [data?.postModeratorQueue.edges])

  // Make sure we show a placeholder for the above logic
  // so we can have a loading state
  if ((data.postModeratorQueue.edges.length < 1 && hasNext) || (currentPost == null && data.postModeratorQueue.edges.length > 0)) {
    return (
      <PostPlaceholder>
        <Skeleton
          h='100%'
          w='100%'
        />
      </PostPlaceholder>
    )
  }

  // If there are no posts in queue, return a placeholder that also shows if they are in queue
  if (data.postModeratorQueue.edges.length < 1) {
    return (
      <PostPlaceholder>
        <NoPostsPlaceholder moderator={data} />
      </PostPlaceholder>
    )
  }

  const formattedDate = format(new Date(currentPost.postedAt), 'eeee h:mm aaa', { locale: dateFnsLocaleFromI18n(i18n) })

  // Show the posts queue for the user
  return (
    <Stack spacing={2}>
      <Flex>
        {currentIndex !== 0 &&
          <IconButton
            aria-label='go left'
            icon={<Icon icon={ArrowButtonLeft} w={4} h={4} fill='gray.300' />}
            variant='solid'
            mr={2}
            size='lg'
            bg='gray.800'
            borderRadius='base'
            onClick={previousPage}
          />}
        <SmallBackgroundBox align='center' justify='center' w='100%'>
          <Text
            color='gray.300'
            fontSize='md'
          >
            <Trans>Posted on {formattedDate}</Trans>
          </Text>
        </SmallBackgroundBox>
        {(currentIndex + 1 !== data.postModeratorQueue?.edges.length || hasNext) &&
          <IconButton
            aria-label='button right'
            ml={2}
            icon={<Icon icon={ArrowButtonRight} w={4} h={4} fill='gray.300' />}
            variant='solid'
            bg='gray.800'
            size='lg'
            borderRadius='base'
            isLoading={isLoadingNext}
            onClick={nextPage}
          />}
      </Flex>
      {data?.postModeratorQueue.edges.map((item, index) => {
        if (index !== currentIndex) {
          return <ReactFragment key={index} />
        }
        return (
          <LargeBackgroundBox
            key={index}
            position='relative'
          >
            <PostPreview query={item.node.post} />
            <PostTagsPreview query={item.node.post} />
            <Flex justify='flex-end' mt={4}>
              <ModeratePost
                connectionID={postsConnection}
                infractions={queryData}
                postID={item.node.post}
              />
            </Flex>
          </LargeBackgroundBox>
        )
      })}
    </Stack>
  )
}
