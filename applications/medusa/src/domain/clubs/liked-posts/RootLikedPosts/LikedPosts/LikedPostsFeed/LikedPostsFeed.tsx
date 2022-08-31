import type { LikedPostsFeedFragment$key } from '@//:artifacts/LikedPostsFeedFragment.graphql'
import type { LikedPostsFeedViewerFragment$key } from '@//:artifacts/LikedPostsFeedViewerFragment.graphql'
import { graphql, usePaginationFragment } from 'react-relay'
import { ClubsFeedQuery } from '@//:artifacts/ClubsFeedQuery.graphql'
import { useFragment } from 'react-relay/hooks'
import PostInfiniteScroll
  from '@//:modules/content/Posts/components/PostNavigation/PostInfiniteScroll/PostInfiniteScroll'
import FullSimplePost
  from '@//:modules/content/Posts/components/PostNavigation/PostsInfiniteScroll/FullSimplePost/FullSimplePost'
import { Icon, LargeBackgroundBox } from '@//:modules/content/PageLayout'
import { Box, Heading, Stack, Text } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import { BookmarkLarge } from '@//:assets/icons'
import LinkButton from '@//:modules/content/ThemeComponents/LinkButton/LinkButton'

interface Props {
  query: LikedPostsFeedFragment$key | null
  viewerQuery: LikedPostsFeedViewerFragment$key | null
}

const Fragment = graphql`
  fragment LikedPostsFeedFragment on Account
  @argumentDefinitions(
    first: {type: Int, defaultValue: 5}
    after: {type: String}
  )
  @refetchable(queryName: "LikedPostsFeedPaginationQuery" ) {
    likedPosts (first: $first, after: $after)
    @connection (key: "LikedPostsFeed_likedPosts") {
      edges {
        node {
          ...FullSimplePostFragment
        }
      }
      ...PostInfiniteScrollFragment
    }
  }
`

const ViewerFragment = graphql`
  fragment LikedPostsFeedViewerFragment on Account {
    ...FullSimplePostViewerFragment
  }
`

export default function LikedPostsFeed ({
  query,
  viewerQuery
}: Props): JSX.Element {
  const {
    data,
    loadNext,
    hasNext,
    isLoadingNext
  } = usePaginationFragment<ClubsFeedQuery, any>(
    Fragment,
    query
  )

  const viewerData = useFragment(ViewerFragment, viewerQuery)

  if (data.likedPosts.edges.length < 1) {
    return (
      <LargeBackgroundBox>
        <Stack align='center' spacing={4}>
          <Icon icon={BookmarkLarge} w={8} h={8} fill='primary.400' />
          <Box>
            <Heading textAlign='center' fontSize='lg' color='gray.00'>
              <Trans>
                Your saved posts will show up here
              </Trans>
            </Heading>
            <Text textAlign='center' fontSize='md' color='gray.100'>
              <Trans>
                You haven't saved any posts yet
              </Trans>
            </Text>
          </Box>
          <LinkButton size='lg' colorScheme='primary' w='100%' href='/'>
            <Trans>
              Browse Content
            </Trans>
          </LinkButton>
        </Stack>
      </LargeBackgroundBox>
    )
  }

  return (
    <PostInfiniteScroll
      query={data.likedPosts}
      hasNext={hasNext}
      loadNext={loadNext}
      isLoadingNext={isLoadingNext}
    >
      {({ index }) => (
        <FullSimplePost
          hideOverflow={false}
          query={data.likedPosts.edges[index].node}
          viewerQuery={viewerData}
        />
      )}
    </PostInfiniteScroll>
  )
}
