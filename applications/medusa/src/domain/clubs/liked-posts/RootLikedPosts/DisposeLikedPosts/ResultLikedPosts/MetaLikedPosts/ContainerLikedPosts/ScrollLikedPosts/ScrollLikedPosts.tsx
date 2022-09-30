import { graphql, usePaginationFragment } from 'react-relay'
import { ResultLikedPostsQuery } from '@//:artifacts/ResultLikedPostsQuery.graphql'
import { ScrollLikedPostsFragment$key } from '@//:artifacts/ScrollLikedPostsFragment.graphql'
import { Icon, LargeBackgroundBox } from '@//:modules/content/PageLayout'
import { Box, Heading, Stack, Text } from '@chakra-ui/react'
import { BookmarkLarge } from '@//:assets/icons'
import { Trans } from '@lingui/macro'
import LinkButton from '@//:modules/content/ThemeComponents/LinkButton/LinkButton'
import { PreviewPost, VerticalPaginationScroller } from '@//:modules/content/HookedComponents/Post'

interface Props {
  viewerQuery: ScrollLikedPostsFragment$key | null
}

const ViewerFragment = graphql`
  fragment ScrollLikedPostsFragment on Account
  @argumentDefinitions(
    first: {type: Int, defaultValue: 5}
    after: {type: String}
  )
  @refetchable(queryName: "LikedPostsFeedPaginationQuery" ) {
    likedPosts (first: $first, after: $after)
    @connection (key: "LikedPostsFeed_likedPosts") {
      edges {
        node {
          ...PreviewPostFragment
        }
      }
      ...VerticalPaginationScrollerFragment
    }
  }
`

export default function ScrollLikedPosts (props: Props): JSX.Element {
  const {
    viewerQuery
  } = props

  const {
    data,
    loadNext,
    hasNext,
    isLoadingNext
  } = usePaginationFragment<ResultLikedPostsQuery, any>(
    ViewerFragment,
    viewerQuery
  )

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
    <VerticalPaginationScroller
      postConnectionQuery={data.likedPosts}
      hasNext={hasNext}
      loadNext={loadNext}
      isLoadingNext={isLoadingNext}
    >
      {({
        index
      }) => (
        <PreviewPost
          postQuery={data?.likedPosts?.edges?.[index]?.node}
        />
      )}
    </VerticalPaginationScroller>
  )
}
