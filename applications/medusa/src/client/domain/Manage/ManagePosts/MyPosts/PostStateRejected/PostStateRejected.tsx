import type { MyPostsQuery } from '@//:artifacts/MyPostsQuery.graphql'
import { graphql } from 'react-relay/hooks'
import { usePaginationFragment } from 'react-relay'
import type { PostStateRejectedFragment$key } from '@//:artifacts/PostStateRejectedFragment.graphql'
import { ClickableBox, PageSectionDescription, PageSectionWrap, PostPlaceholder } from '@//:modules/content/PageLayout'
import { Box, Heading, Text } from '@chakra-ui/react'
import { RowItem, RowWrap } from '../../../../../components/ContentSelection'
import PostStateRejectedPreview from './PostStateRejectedPreview/PostStateRejectedPreview'
import { Trans } from '@lingui/macro'

interface Props {
  query: PostStateRejectedFragment$key
}

const Fragment = graphql`
  fragment PostStateRejectedFragment on Account
  @argumentDefinitions(
    first: {type: Int, defaultValue: 3}
    after: {type: String}
  )
  @refetchable(queryName: "RejectedPostsPaginationQuery" ) {
    rejectedPosts: posts (first: $first, after: $after, state: REJECTED)
    @connection(key: "RejectedPostsPaginationQuery_rejectedPosts") {
      edges {
        node {
          ...PostStateRejectedPreviewFragment
        }
      }
    }
  }
`

export default function PostStateRejected ({ query }: Props): JSX.Element {
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

  if (data.rejectedPosts.edges.length < 1) {
    return (
      <PostPlaceholder>
        <Box>
          <Heading color='gray.00' fontSize='4xl'>
            <Trans>
              No Rejected Posts
            </Trans>
          </Heading>
          <Text color='gray.200'>
            <Trans>
              If one of your posts is rejected, it will show up here.
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
            These posts were rejected from being visible to the public for violating the community guidelines.
          </Trans>
        </PageSectionDescription>
      </PageSectionWrap>
      <RowWrap spacing={0}>
        {data.rejectedPosts.edges.map((item, index) =>
          <RowItem key={index} h={100}>
            <PostStateRejectedPreview query={item.node} />
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
