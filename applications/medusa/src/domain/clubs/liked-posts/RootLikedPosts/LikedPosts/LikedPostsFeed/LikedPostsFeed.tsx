import type { LikedPostsFeedFragment$key } from '@//:artifacts/LikedPostsFeedFragment.graphql'
import type { LikedPostsFeedViewerFragment$key } from '@//:artifacts/LikedPostsFeedViewerFragment.graphql'
import { graphql, usePaginationFragment } from 'react-relay'
import { ClubsFeedQuery } from '@//:artifacts/ClubsFeedQuery.graphql'
import { useFragment } from 'react-relay/hooks'
import PostInfiniteScroll
  from '@//:modules/content/Posts/components/PostNavigation/PostInfiniteScroll/PostInfiniteScroll'
import FullSimplePost
  from '@//:modules/content/Posts/components/PostNavigation/PostsInfiniteScroll/FullSimplePost/FullSimplePost'
import { LargeBackgroundBox } from '@//:modules/content/PageLayout'
import { Flex, Heading } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'

interface Props {
  query: LikedPostsFeedFragment$key | null
  viewerQuery: LikedPostsFeedViewerFragment$key | null
}

const Fragment = graphql`
  fragment LikedPostsFeedFragment on Account
  @argumentDefinitions(
    first: {type: Int, defaultValue: 10}
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
        <Flex w='100%' align='center' justify='center'>
          <Heading fontSize='md' color='gray.200'>
            <Trans>
              When you save a post, it will show up here
            </Trans>
          </Heading>
        </Flex>
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
