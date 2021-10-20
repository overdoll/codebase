/**
 * @flow
 */
import type { Node } from 'react'
import type DraftPostsQuery from '@//:artifacts/DraftPostsQuery.graphql'
import { graphql, usePreloadedQuery } from 'react-relay/hooks'
import { PageSectionTitle, PageSectionWrap } from '../../../../components/PageLayout'
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { usePaginationFragment } from 'react-relay'
import FileUploader from './FileUploader/FileUploader'
import type { DraftPostsFragment$key } from '@//:artifacts/DraftPostsFragment.graphql'

type Props = {
  query: DraftPostsQuery
}
const DraftPostsQueryGQL = graphql`
  query DraftPostsQuery {
    viewer {
      ...DraftPostsFragment
    }
  }
`

const DraftPostsFragmentGQL = graphql`
  fragment DraftPostsFragment on Account
  @argumentDefinitions(
    first: {type: Int, defaultValue: 4}
    after: {type: String}
  )
  @refetchable(queryName: "DraftPostsPaginationQuery" ) {
    posts (first: $first, after: $after)
    @connection(key: "DraftPostsPaginationQuery_posts") {
      edges {
        node {
          id
          state
        }
      }
    }
  }
`

export default function DraftPosts (props: Props): Node {
  const queryData = usePreloadedQuery<DraftPostsQuery>(
    DraftPostsQueryGQL,
    props.query
  )

  const { data, loadNext, hasNext, isLoadingNext } = usePaginationFragment<DraftPostsFragment$key,
    _>(
      DraftPostsFragmentGQL,
      queryData?.viewer
    )

  const [t] = useTranslation('manage')

  const posts = data?.posts.edges

  const CreatePostComponent = () => <FileUploader />

  console.log(data)

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
