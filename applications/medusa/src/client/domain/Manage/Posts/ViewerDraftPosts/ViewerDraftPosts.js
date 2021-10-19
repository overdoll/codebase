/**
 * @flow
 */
import type { Node } from 'react'
import type ViewerDraftPostsQuery from '@//:artifacts/ViewerDraftPostsQuery.graphql'
import { graphql, usePreloadedQuery } from 'react-relay/hooks'
import { PageSectionTitle, PageSectionWrap, PageWrapper } from '../../../../components/PageLayout'
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import CreatePost from './CreatePost/CreatePost'
import { usePaginationFragment } from 'react-relay'
import type { ViewerDraftPostsFragment$key } from '@//:artifacts/ViewerDraftPostsFragment.graphql'

type Props = {
  query: ViewerDraftPostsQuery
}
const ViewerDraftPostsQueryGQL = graphql`
    query ViewerDraftPostsQuery {
        viewer {
            ...ViewerDraftPostsFragment
        }
    }
`

const ViewerDraftPostsFragmentGQL = graphql`
    fragment ViewerDraftPostsFragment on Account
    @argumentDefinitions(
        first: {type: Int, defaultValue: 4}
        after: {type: String}
    )
    @refetchable(queryName: "DraftPostsQueryQuery" ) {
        contributions (first: $first, after: $after)
        @connection(key: "contributions_contributions") {
            edges {
                node {
                    id
                }
            }
        }
    }
`

export default function ViewerDraftPosts (props: Props): Node {
  const queryData = usePreloadedQuery<ViewerDraftPostsQuery>(
    ViewerDraftPostsQueryGQL,
    props.query
  )

  const { data, loadNext, hasNext, isLoadingNext } = usePaginationFragment<ViewerDraftPostsFragment$key,
    _>(
      ViewerDraftPostsFragmentGQL,
      queryData?.viewer
    )

  const [t] = useTranslation('manage')

  const posts = data?.contributions.edges

  console.log(data)

  const CreatePostComponent = () => <CreatePost />

  if (posts.length < 1) {
    return CreatePostComponent()
  }

  return (
    <>
      <PageSectionWrap>
        <PageSectionTitle>{t('posts.title')}</PageSectionTitle>
      </PageSectionWrap>
      <Tabs defaultIndex={0} isFitted variant='soft-rounded' colorScheme='gray'>
        <TabList>
          <Tab>{t('posts.create.title')}</Tab>
          <Tab>{t('posts.draft.title')}</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <CreatePostComponent />
          </TabPanel>
          <TabPanel>
            <p>click to open draft</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  )
}
