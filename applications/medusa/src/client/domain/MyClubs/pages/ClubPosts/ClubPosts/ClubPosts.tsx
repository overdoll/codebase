import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import { usePaginationFragment } from 'react-relay'
import { ClubPostsQuery } from '@//:artifacts/ClubPostsQuery.graphql'
import { GridWrap, LargeGridItem } from '../../../../../components/ContentSelection'
import { ClickableBox } from '@//:modules/content/PageLayout'
import { Heading } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import PostPreviewContent from '../../../../../components/Posts/PostPreviewContent/PostPreviewContent'

interface Props {
  query: PreloadedQuery<ClubPostsQuery>
}

const Query = graphql`
  query ClubPostsQuery($slug: String!, $state: PostState)  {
    club(slug: $slug) {
      id
    }
    viewer {
      ...ClubPostsFragment
    }
  }
`

const Fragment = graphql`
  fragment ClubPostsFragment on Account
  @argumentDefinitions(
    first: {type: Int, defaultValue: 3}
    after: {type: String}
  )
  @refetchable(queryName: "ClubPostsPaginationQuery" ) {
    posts (first: $first, after: $after, state: $state)
    @connection (key: "ClubPosts_posts") {
      edges {
        node {
          reference
          state
          ...PostPreviewContentFragment
        }
      }
    }
  }
`

// TODO club posts need to be filterable by each category

export default function ClubPosts ({ query }: Props): JSX.Element {
  const queryData = usePreloadedQuery<ClubPostsQuery>(
    Query,
    query
  )

  const {
    data,
    loadNext,
    hasNext,
    isLoadingNext
  } = usePaginationFragment<ClubPostsQuery, any>(
    Fragment,
    queryData.viewer
  )

  return (
    <GridWrap spacing={0}>
      {data.posts.edges.map((item, index) =>
        <LargeGridItem h={230} key={index}>
          <PostPreviewContent query={item.node} />
        </LargeGridItem>
      )}
      {hasNext &&
        <LargeGridItem>
          <ClickableBox
            borderRadius='md'
            isLoading={isLoadingNext}
            onClick={() => loadNext(4)}
            h={230}
          >
            <Heading fontSize='lg' textAlign='center' color='gray.00'>
              <Trans>
                Load More
              </Trans>
            </Heading>
          </ClickableBox>
        </LargeGridItem>}
    </GridWrap>
  )

  /*

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
          <PostStatePublished query={queryData?.club as PostStatePublishedFragment$key} />
        </TabPanel>
        <TabPanel>
          <PostStateRejected query={queryData?.viewer as PostStateRejectedFragment$key} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  )

   */
}
