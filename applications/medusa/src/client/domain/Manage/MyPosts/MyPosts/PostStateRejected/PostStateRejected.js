/**
 * @flow
 */
import type { Node } from 'react'
import { graphql } from 'react-relay/hooks'
import { usePaginationFragment } from 'react-relay'
import type { PostStateRejectedFragment$key } from '@//:artifacts/PostStateRejectedFragment.graphql'
import { ClickableBox, PageSectionDescription, PageSectionWrap, PostPlaceholder } from '@//:modules/content/PageLayout'
import { Box, Heading, Text } from '@chakra-ui/react'
import { RowItem, RowWrap } from '../../../../../components/ContentSelection'
import PostStateRejectedPreview from './PostStateRejectedPreview/PostStateRejectedPreview'

type Props = {
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

export default function PostStateRejected ({ query }: Props): Node {
  const {
    data,
    loadNext,
    hasNext,
    isLoadingNext,
  } = usePaginationFragment<PostStateRejectedFragment$key,
    _>(
    Fragment,
    query,
  )

  if (data.rejectedPosts.edges.length < 1) {
    return (
      <PostPlaceholder>
        <Box>
          <Heading color='gray.00' fontSize='4xl'>
            {t('my_posts.rejected.empty.title')}
          </Heading>
          <Text color='gray.200'>
            {t('my_posts.rejected.empty.title')}
          </Text>
        </Box>
      </PostPlaceholder>
    )
  }

  return (
    <>
      <PageSectionWrap>
        <PageSectionDescription>
          {t('my_posts.rejected.description')}
        </PageSectionDescription>
      </PageSectionWrap>
      <RowWrap spacing={0}>
        {data.rejectedPosts.edges.map((item, index) =>
          <RowItem key={index} h={100}>
            <PostStateRejectedPreview query={item.node} />
          </RowItem>,
        )}
        {hasNext &&
          <RowItem>
            <ClickableBox
              isLoading={isLoadingNext}
              onClick={() => loadNext(3)}
              h={100}
            >
              <Heading fontSize='lg' textAlign='center' color='gray.00'>
                {t('my_posts.review.load')}
              </Heading>
            </ClickableBox>
          </RowItem>}
      </RowWrap>
    </>
  )
}
