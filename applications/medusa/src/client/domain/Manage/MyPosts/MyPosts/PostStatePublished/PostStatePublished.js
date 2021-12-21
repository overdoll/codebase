/**
 * @flow
 */
import type { Node } from 'react'
import { graphql, usePreloadedQuery } from 'react-relay/hooks'
import { usePaginationFragment } from 'react-relay'
import type { PostStatePublishedFragment$key } from '@//:artifacts/PostStatePublishedFragment.graphql'
import {
  ClickableBox,
  ListSpacer,
  PageSectionDescription,
  PageSectionWrap,
  PostPlaceholder
} from '@//:modules/content/PageLayout'
import { Text, Tabs, TabList, TabPanels, Tab, TabPanel, Heading, Button } from '@chakra-ui/react'
import { RowItem, RowWrap } from '../../../../../components/ContentSelection'
import { useTranslation } from 'react-i18next'
import PostStatePublishedPreview from './PostStatePublishedPreview/PostStatePublishedPreview'
import { Link } from '@//:modules/routing'

type Props = {
  query: PostStatePublishedFragment$key
}

const Fragment = graphql`
  fragment PostStatePublishedFragment on Account
  @argumentDefinitions(
    first: {type: Int, defaultValue: 3}
    after: {type: String}
  )
  @refetchable(queryName: "PublishedPostsPaginationQuery" ) {
    publishedPosts: posts (first: $first, after: $after, state: PUBLISHED)
    @connection(key: "PublishedPostsPaginationQuery_publishedPosts") {
      edges {
        node {
          ...PostStatePublishedPreviewFragment
        }
      }
    }
  }
`

export default function PostStateReview ({ query }: Props): Node {
  const { data, loadNext, hasNext, isLoadingNext } = usePaginationFragment<PostStatePublishedFragment$key,
    _>(
      Fragment,
      query
    )

  const [t] = useTranslation('manage')

  if (data.publishedPosts.edges.length < 1) {
    return (
      <PostPlaceholder>
        <Heading color='gray.00' fontSize='4xl'>
          {t('my_posts.published.empty.title')}
        </Heading>
        <Link to='/configure/create-post'>
          <Button
            colorScheme='green' variant='solid'
            size='lg'
          >{t('my_posts.published.empty.button')}
          </Button>
        </Link>
      </PostPlaceholder>
    )
  }

  return (
    <>
      <PageSectionWrap>
        <PageSectionDescription>
          {t('my_posts.published.description')}
        </PageSectionDescription>
      </PageSectionWrap>
      <ListSpacer>
        {data.publishedPosts.edges.map((item, index) =>
          <PostStatePublishedPreview key={index} query={item.node} />
        )}
        {hasNext &&
          <ClickableBox
            isLoading={isLoadingNext}
            onClick={() => loadNext(3)}
            h={100}
          >
            <Heading fontSize='lg' textAlign='center' color='gray.00'>
              {t('my_posts.review.load')}
            </Heading>
          </ClickableBox>}
      </ListSpacer>
    </>
  )
}
