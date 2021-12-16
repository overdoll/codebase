/**
 * @flow
 */
import type { Node } from 'react'
import { graphql, usePreloadedQuery } from 'react-relay/hooks'
import { usePaginationFragment } from 'react-relay'
import type { PostStateDraftFragment$key } from '@//:artifacts/PostStateDraftFragment.graphql'
import { ClickableBox, PageSectionDescription, PageSectionWrap, PostPlaceholder } from '@//:modules/content/PageLayout'
import { Text, Tabs, TabList, TabPanels, Tab, TabPanel, Heading, Box, Button, Stack } from '@chakra-ui/react'
import { GridWrap, LargeGridItem } from '../../../../../components/ContentSelection'
import PostStateDraftPreview from './PostStateDraftPreview/PostStateDraftPreview'
import { useTranslation } from 'react-i18next'
import Icon from '@//:modules/content/Icon/Icon'
import { PauseCircle } from '../../../../../../assets/icons/interface'
import { Link } from '@//:modules/routing'

type Props = {
  query: PostStateDraftFragment$key
}

const Fragment = graphql`
  fragment PostStateDraftFragment on Account
  @argumentDefinitions(
    first: {type: Int, defaultValue: 3}
    after: {type: String}
  )
  @refetchable(queryName: "DraftPostsPaginationQuery" ) {
    draftPosts: posts (first: $first, after: $after, state: DRAFT)
    @connection(key: "DraftPostsPaginationQuery_draftPosts") {
      edges {
        node {
          ...PostStateDraftPreviewFragment
        }
      }
    }
  }
`

export default function PostStateDraft ({ query }: Props): Node {
  const { data, loadNext, hasNext, isLoadingNext } = usePaginationFragment<PostStateDraftFragment$key,
    _>(
      Fragment,
      query
    )

  const [t] = useTranslation('manage')

  if (data.draftPosts.edges.length < 1) {
    return (
      <PostPlaceholder>
        <Heading color='gray.00' fontSize='4xl'>
          {t('my_posts.drafts.empty.title')}
        </Heading>
        <Link to='/configure/create-post'>
          <Button
            colorScheme='teal' variant='solid'
            size='lg'
          >{t('my_posts.drafts.empty.button')}
          </Button>
        </Link>
      </PostPlaceholder>
    )
  }

  return (
    <>
      <PageSectionWrap>
        <PageSectionDescription>
          {t('my_posts.drafts.description')}
        </PageSectionDescription>
      </PageSectionWrap>
      <GridWrap spacing={0}>
        {data.draftPosts.edges.map((item, index) =>
          <LargeGridItem key={index} h={230}>
            <PostStateDraftPreview query={item.node} />
          </LargeGridItem>
        )}
        {hasNext &&
          <LargeGridItem>
            <ClickableBox
              isLoading={isLoadingNext}
              onClick={() => loadNext(4)}
              h={230}
            >
              <Heading fontSize='lg' textAlign='center' color='gray.00'>
                {t('my_posts.drafts.load')}
              </Heading>
            </ClickableBox>
          </LargeGridItem>}
      </GridWrap>
    </>
  )
}
