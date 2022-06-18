import { Box, Flex, Heading, Stack } from '@chakra-ui/react'
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
import type {
  PostModerationQueueQuery,
  PostModerationQueueQuery$variables
} from '@//:artifacts/PostModerationQueueQuery.graphql'
import { PostPlaceholder, SmallBackgroundBox } from '@//:modules/content/PageLayout'
import IconButton from '@//:modules/form/IconButton/IconButton'
import { dateFnsLocaleFromI18n } from '@//:modules/locale'
import { useLingui } from '@lingui/react'
import { t, Trans } from '@lingui/macro'
import PostTagsPreview from './PostTagsPreview/PostTagsPreview'
import { LoadQueryType } from '@//:types/hooks'
import Head from 'next/head'
import { SkeletonPost } from '@//:modules/content/Placeholder'

interface Props {
  loadQuery: LoadQueryType<PostModerationQueueQuery$variables>
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
      edges {
        node {
          id
          post {
            id
            postedAt
            ...PostPreviewFragment
            ...PostTagsPreviewFragment
          }
          ...ModeratePostFragment
        }
      }
    }
  }
`

export default function PostModerationQueue ({
  query,
  loadQuery
}: Props): JSX.Element {
  const queryData = usePreloadedQuery<PostModerationQueueQuery>(
    Query,
    query
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

  const nextPage = (): void => {
    if (currentIndex + 1 >= data?.postModeratorQueue.edges.length) {
      loadNext(
        1,
        {
          onComplete () {
            if (currentIndex + 1 >= data?.postModeratorQueue.edges.length) {
              return
            }
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
      <SkeletonPost />
    )
  }

  // If there are no posts in queue, return a placeholder that also shows if they are in queue
  if (data.postModeratorQueue.edges.length < 1) {
    return (
      <PostPlaceholder>
        <NoPostsPlaceholder loadQuery={loadQuery} query={data} />
      </PostPlaceholder>
    )
  }

  const formattedDate = format(new Date(currentPost.postedAt), 'eeee h:mm aaa', { locale: dateFnsLocaleFromI18n(i18n) })

  // Show the posts queue for the user
  return (
    <>
      <Head>
        {data?.postModeratorQueue.edges.length > 0 &&
          (
            <title>
              (!) Posts in queue - overdoll
            </title>
          )}
      </Head>
      <Stack spacing={6}>
        <Flex>
          {currentIndex !== 0 &&
            <IconButton
              aria-label={i18n._(t`Previous Post`)}
              icon={<Icon icon={ArrowButtonLeft} w={4} h={4} fill='gray.300' />}
              variant='solid'
              mr={2}
              size='lg'
              bg='gray.800'
              borderRadius='base'
              onClick={previousPage}
            />}
          <SmallBackgroundBox w='100%'>
            <Flex align='center' justify='center' w='100%' h='100%'>
              <Heading
                color='gray.200'
                fontSize='md'
              >
                <Trans>Posted on {formattedDate}</Trans>
              </Heading>
            </Flex>
          </SmallBackgroundBox>
          {(currentIndex + 1 !== data.postModeratorQueue?.edges.length || hasNext) &&
            <IconButton
              aria-label={i18n._(t`Load More Posts`)}
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
            <ReactFragment key={index}>
              <Box
                key={index}
                position='relative'
              >
                <PostPreview query={item.node.post} />
                <PostTagsPreview query={item.node.post} />
                <Flex mt={8}>
                  <ModeratePost
                    infractions={queryData}
                    postID={item.node}
                  />
                </Flex>
              </Box>
            </ReactFragment>
          )
        })}
      </Stack>
    </>
  )
}
