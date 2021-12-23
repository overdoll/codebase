import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import type { MyPostsQuery } from '@//:artifacts/MyPostsQuery.graphql'
import { Flex, SimpleGrid, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import PostStateDraft from './PostStateDraft/PostStateDraft'
import PostStateReview from './PostStateReview/PostStateReview'
import Icon from '@//:modules/content/Icon/Icon'
import { ContentBrushPen, LoginKeys } from '../../../../../assets/icons/navigation'
import { CheckCircle, DeleteCircle } from '../../../../../assets/icons/interface'
import PostStatePublished from './PostStatePublished/PostStatePublished'
import PostStateRejected from './PostStateRejected/PostStateRejected'
import { PostStateDraftFragment$key } from '@//:artifacts/PostStateDraftFragment.graphql'
import { PostStateReviewFragment$key } from '@//:artifacts/PostStateReviewFragment.graphql'
import { PostStatePublishedFragment$key } from '@//:artifacts/PostStatePublishedFragment.graphql'
import { PostStateRejectedFragment$key } from '@//:artifacts/PostStateRejectedFragment.graphql'
import { Trans } from '@lingui/macro'

interface Props {
  query: PreloadedQuery<MyPostsQuery>
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

export default function MyPosts ({ query }: Props): JSX.Element {
  const queryData = usePreloadedQuery<MyPostsQuery>(
    MyPostsQueryGQL,
    query
  )

  return (
    <Tabs isFitted variant='soft-rounded' colorScheme='gray'>
      <TabList>
        <SimpleGrid align='center' w='100%' columns={2}>
          <Tab _selected={{
            color: 'teal.400',
            bg: 'gray.800'
          }}
          >
            <Flex align='center' direction='column'>
              <Icon mb={1} icon={ContentBrushPen} fill='inherit' w={4} h={4} />
              <Trans>
                Drafts
              </Trans>
            </Flex>
          </Tab>
          <Tab _selected={{
            color: 'purple.400',
            bg: 'gray.800'
          }}
          >
            <Flex align='center' direction='column'>
              <Icon mb={1} icon={LoginKeys} fill='inherit' w={4} h={4} />
              <Trans>
                In Review
              </Trans>
            </Flex>
          </Tab>
          <Tab _selected={{
            color: 'green.400',
            bg: 'gray.800'
          }}
          >
            <Flex align='center' direction='column'>
              <Icon mb={1} icon={CheckCircle} fill='inherit' w={4} h={4} />
              <Trans>
                Published
              </Trans>
            </Flex>
          </Tab>
          <Tab _selected={{
            color: 'orange.400',
            bg: 'gray.800'
          }}
          >
            <Flex align='center' direction='column'>
              <Icon mb={1} icon={DeleteCircle} fill='inherit' w={4} h={4} />
              <Trans>
                Rejected
              </Trans>
            </Flex>
          </Tab>
        </SimpleGrid>
      </TabList>
      <TabPanels>
        <TabPanel>
          <PostStateDraft query={queryData?.viewer as PostStateDraftFragment$key} />
        </TabPanel>
        <TabPanel>
          <PostStateReview query={queryData?.viewer as PostStateReviewFragment$key} />
        </TabPanel>
        <TabPanel>
          <PostStatePublished query={queryData?.viewer as PostStatePublishedFragment$key} />
        </TabPanel>
        <TabPanel>
          <PostStateRejected query={queryData?.viewer as PostStateRejectedFragment$key} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}
