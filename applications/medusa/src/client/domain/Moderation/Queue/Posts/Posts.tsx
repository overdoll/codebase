import { Flex, Skeleton, Stack, Text } from '@chakra-ui/react'
import Icon from '@//:modules/content/Icon/Icon'
import { Fragment, useEffect, useState } from 'react'
import { graphql, usePaginationFragment } from 'react-relay'
import { format } from 'date-fns'
import ModeratePost from './ModeratePost/ModeratePost'
import PostHeader from './PostHeader/PostHeader'
import NoPostsPlaceholder from './NoPostsPlaceholder/NoPostsPlaceholder'
import { ArrowButtonLeft, ArrowButtonRight } from '@//:assets/icons/navigation'
import PostPreview from './PostPreview/PostPreview'
import type { PreloadedQuery } from 'react-relay/hooks'
import { usePreloadedQuery } from 'react-relay/hooks'
import type { PostsQuery } from '@//:artifacts/PostsQuery.graphql'
import { LargeBackgroundBox, SmallBackgroundBox } from '@//:modules/content/PageLayout'
import IconButton from '@//:modules/form/IconButton/IconButton'
import { PostsPaginationQuery } from '@//:artifacts/PostsPaginationQuery.graphql'
import { dateFnsLocaleFromI18n } from '@//:modules/locale'
import { useLingui } from '@lingui/react'
import { Trans } from '@lingui/macro'

interface Props {
  query: PreloadedQuery<PostsQuery>
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

export default function Posts (props: Props): JSX.Element {
  const queryData = usePreloadedQuery<PostsQuery>(
    PostsQueryGQL,
    props.query
  )

  const {
    data,
    loadNext,
    hasNext,
    isLoadingNext
  } = usePaginationFragment<PostsPaginationQuery, any>(
    PostsGQL,
    queryData?.viewer
  )

  const { i18n } = useLingui()

  const [currentIndex, setCurrentIndex] = useState(0)

  const currentPost = data?.moderatorPostsQueue.edges[currentIndex]?.node

  const postsConnection = data?.moderatorPostsQueue?.__id

  const nextPage = (): void => {
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

  const previousPage = (): void => {
    if (currentIndex > 0) {
      setCurrentIndex(x => x + -1)
    }
  }

  // If a user approves a post and there are no more in the store but
  // they are able to load more, we go to next page for them
  // automatically so the queue can continue
  useEffect(() => {
    if (hasNext && data?.moderatorPostsQueue.edges.length < 1) {
      nextPage()
    } else if (currentPost == null && data.moderatorPostsQueue.edges.length > 0) {
      previousPage()
    }
  }, [data?.moderatorPostsQueue.edges])

  // Make sure we show a placeholder for the above logic
  // so we can have a loading state
  if ((data.moderatorPostsQueue.edges.length < 1 && hasNext) || (currentPost == null && data.moderatorPostsQueue.edges.length > 0)) {
    return (
      <LargeBackgroundBox>
        <Skeleton
          flexDirection='column'
          alignItems='center'
          justifyContent='center'
          textAlign='center'
          height='500px'
        />
      </LargeBackgroundBox>
    )
  }

  // If there are no posts in queue, return a placeholder that also shows if they are in queue
  if (data.moderatorPostsQueue.edges.length < 1) {
    return (
      <LargeBackgroundBox>
        <Flex
          flexDirection='column'
          alignItems='center'
          justifyContent='center'
          textAlign='center'
          height='500px'
        >
          <NoPostsPlaceholder moderator={data} />
        </Flex>
      </LargeBackgroundBox>
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
        <SmallBackgroundBox alignContent='center' w='100%'>
          <Text
            color='gray.300'
            fontSize='md'
          >
            <Trans>Posted on {formattedDate}</Trans>
          </Text>
        </SmallBackgroundBox>
        {(currentIndex + 1 !== data.moderatorPostsQueue?.edges.length || hasNext) &&
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
      {data?.moderatorPostsQueue.edges.map((item, index) => {
        if (index !== currentIndex) {
          return <Fragment key={index} />
        }
        return (
          <LargeBackgroundBox
            key={index}
            position='relative'
          >
            <Stack spacing={2}>
              <PostHeader query={item.node} />
              <PostPreview query={item.node} />
            </Stack>
            <Flex justify='flex-end' mt={4}>
              <ModeratePost
                connectionID={postsConnection}
                infractions={queryData}
                postID={item.node}
              />
            </Flex>
          </LargeBackgroundBox>
        )
      })}
    </Stack>
  )
}
