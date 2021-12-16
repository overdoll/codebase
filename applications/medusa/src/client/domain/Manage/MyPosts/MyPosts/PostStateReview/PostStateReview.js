/**
 * @flow
 */
import type { Node } from 'react'
import { graphql, usePreloadedQuery } from 'react-relay/hooks'
import { usePaginationFragment } from 'react-relay'
import type { PostStateReviewFragment$key } from '@//:artifacts/PostStateReviewFragment.graphql'
import { ClickableBox, PageSectionDescription, PageSectionWrap, PostPlaceholder } from '@//:modules/content/PageLayout'
import { Text, Tabs, TabList, TabPanels, Tab, TabPanel, Heading, Button, Box } from '@chakra-ui/react'
import { RowItem, RowWrap } from '../../../../../components/ContentSelection'
import { useTranslation } from 'react-i18next'
import PostStateReviewPreview from './PostStateReviewPreview/PostStateReviewPreview'
import { Link } from '@//:modules/routing'

type Props = {
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

export default function PostStateReview ({ query }: Props): Node {
  const { data, loadNext, hasNext, isLoadingNext } = usePaginationFragment<PostStateReviewFragment$key,
    _>(
      Fragment,
      query
    )

  const [t] = useTranslation('manage')

  if (data.reviewPosts.edges.length < 1) {
    return (
      <PostPlaceholder>
        <Box>
          <Heading color='gray.00' fontSize='4xl'>
            {t('my_posts.review.empty.title')}
          </Heading>
          <Text color='gray.200'>
            {t('my_posts.review.empty.title')}
          </Text>
        </Box>
      </PostPlaceholder>
    )
  }

  return (
    <>
      <PageSectionWrap>
        <PageSectionDescription>
          {t('my_posts.review.description')}
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
                {t('my_posts.review.load')}
              </Heading>
            </ClickableBox>
          </RowItem>}
      </RowWrap>
    </>
  )
}
