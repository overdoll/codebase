/**
 * @flow
 */
import type { Node } from 'react'
import { graphql, usePreloadedQuery } from 'react-relay/hooks'
import type { MyPostsQuery } from '@//:artifacts/MyPostsQuery.graphql'
import { PageSectionWrap, PageSectionDescription } from '@//:modules/content/PageLayout'
import { Tabs, TabList, TabPanels, Tab, TabPanel, Flex, SimpleGrid } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import PostStateDraft from './PostStateDraft/PostStateDraft'
import PostStateReview from './PostStateReview/PostStateReview'
import Icon from '@//:modules/content/Icon/Icon'
import { LoginKeys, ContentBrushPen } from '../../../../../assets/icons/navigation'
import { CheckCircle, DeleteCircle } from '../../../../../assets/icons/interface'
import PostStatePublished from './PostStatePublished/PostStatePublished'
import PostStateRejected from './PostStateRejected/PostStateRejected'

type Props = {
  query: MyPostsQuery
}
const MyPostsQueryGQL = graphql`
  query MyPostsQuery  {
    viewer {
      ...PostStateDraftFragment
      ...PostStateReviewFragment
      ...PostStatePublishedFragment
      ...PostStateRejectedFragment
    }
  }
`

export default function MyPosts ({ query }: Props): Node {
  const queryData = usePreloadedQuery<MyPostsQuery>(
    MyPostsQueryGQL,
    query
  )

  const [t] = useTranslation('manage')

  return (
    <Tabs isFitted variant='soft-rounded' colorScheme='gray'>
      <TabList>
        <SimpleGrid align='center' w='100%' columns={2}>
          <Tab _selected={{ color: 'teal.400', bg: 'gray.800' }}>
            <Flex align='center' direction='column'>
              <Icon mb={1} icon={ContentBrushPen} fill='inherit' w={4} h={4} />
              {t('my_posts.drafts.tab')}
            </Flex>
          </Tab>
          <Tab _selected={{ color: 'purple.400', bg: 'gray.800' }}>
            <Flex align='center' direction='column'>
              <Icon mb={1} icon={LoginKeys} fill='inherit' w={4} h={4} />
              {t('my_posts.review.tab')}
            </Flex>
          </Tab>
          <Tab _selected={{ color: 'green.400', bg: 'gray.800' }}>
            <Flex align='center' direction='column'>
              <Icon mb={1} icon={CheckCircle} fill='inherit' w={4} h={4} />
              {t('my_posts.published.tab')}
            </Flex>
          </Tab>
          <Tab _selected={{ color: 'orange.400', bg: 'gray.800' }}>
            <Flex align='center' direction='column'>
              <Icon mb={1} icon={DeleteCircle} fill='inherit' w={4} h={4} />
              {t('my_posts.rejected.tab')}
            </Flex>
          </Tab>
        </SimpleGrid>
      </TabList>
      <TabPanels>
        <TabPanel>
          <PostStateDraft query={queryData.viewer} />
        </TabPanel>
        <TabPanel>
          <PostStateReview query={queryData.viewer} />
        </TabPanel>
        <TabPanel>
          <PostStatePublished query={queryData.viewer} />
        </TabPanel>
        <TabPanel>
          <PostStateRejected query={queryData.viewer} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}
