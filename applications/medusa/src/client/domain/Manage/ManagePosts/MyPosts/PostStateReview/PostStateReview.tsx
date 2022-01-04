import { graphql } from 'react-relay/hooks'
import { usePaginationFragment } from 'react-relay'
import type { PostStateReviewFragment$key } from '@//:artifacts/PostStateReviewFragment.graphql'
import { ClickableBox, PageSectionDescription, PageSectionWrap, PostPlaceholder } from '@//:modules/content/PageLayout'
import { Box, Heading, Text } from '@chakra-ui/react'
import { RowItem, RowWrap } from '../../../../../components/ContentSelection'
import PostStateReviewPreview from './PostStateReviewPreview/PostStateReviewPreview'
import type { MyPostsQuery } from '@//:artifacts/MyPostsQuery.graphql'
import { Trans } from '@lingui/macro'

interface Props {
  query: PostStateReviewFragment$key
}

const Fragment = graphql`
  fragment PostStateReviewFragment on Account
  @argumentDefinitions(
    first: {type: Int, defaultValue: 3}
    after: {type: String}
  )
  @refetchable(queryName: "ReviewPostsPaginationQuery" ) {
    reviewPosts: posts (first: $first, after: $after, state: REVIEW)
    @connection(key: "ReviewPostsPaginationQuery_reviewPosts") {
      edges {
        node {
          ...PostStateReviewPreviewFragment
        }
      }
    }
  }
`

export default function PostStateReview ({ query }: Props): JSX.Element {
  const {
    data,
    loadNext,
    hasNext,
    isLoadingNext
  } = usePaginationFragment<MyPostsQuery,
  any>(
    Fragment,
    query
  )

  if (data.reviewPosts.edges.length < 1) {
    return (
      <PostPlaceholder>
        <Box>
          <Heading color='gray.00' fontSize='4xl'>
            <Trans>
              No Posts in Review
            </Trans>
          </Heading>
          <Text color='gray.200'>
            <Trans>
              When you submit a post, it'll appear here if it needs to be reviewed before going public.
            </Trans>
          </Text>
        </Box>
      </PostPlaceholder>
    )
  }

  return (
    <>
      <PageSectionWrap>
        <PageSectionDescription>
          <Trans>
            These posts will be reviewed to ensure they comply with our community guidelines before going live.
          </Trans>
        </PageSectionDescription>
      </PageSectionWrap>
      <RowWrap spacing={0}>
        {data.reviewPosts.edges.map((item, index) =>
          <RowItem key={index} h={100}>
            <PostStateReviewPreview query={item.node} />
          </RowItem>
        )}
        {hasNext &&
          <RowItem>
            <ClickableBox
              isLoading={isLoadingNext}
              onClick={() => loadNext(3)}
              h={100}
            >
              <Heading fontSize='lg' textAlign='center' color='gray.00'>
                <Trans>
                  Load More
                </Trans>
              </Heading>
            </ClickableBox>
          </RowItem>}
      </RowWrap>
    </>
  )
}
