/**
 * @flow
 */
import type { Node } from 'react'
import type DraftPostsQuery from '@//:artifacts/DraftPostsQuery.graphql'
import { graphql, usePreloadedQuery } from 'react-relay/hooks'
import { PageSectionTitle, PageSectionWrap } from '@//:modules/content/PageLayout'
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { useFragment, usePaginationFragment } from 'react-relay'
import FileUploader from './FileUploader/FileUploader'
import type { DraftPostsFragment$key } from '@//:artifacts/DraftPostsFragment.graphql'
import { StringParam, useQueryParam } from 'use-query-params'
import OpenDraftPosts from './OpenDraftPosts/OpenDraftPosts'

type Props = {}

const DraftPostsQueryGQL = graphql`
  query DraftPostsQuery  {
    viewer {
      ...OpenDraftPostsFragment
    }
  }
`

export default function DraftPosts (props: Props): Node {
  const queryData = usePreloadedQuery<DraftPostsQuery>(
    DraftPostsQueryGQL,
    props.query
  )

  const [t] = useTranslation('manage')

  const CreatePostComponent = () => <FileUploader />

  return (
    <>
      <PageSectionWrap>
        <PageSectionTitle>{t('posts.title')}</PageSectionTitle>
      </PageSectionWrap>
      <Tabs defaultIndex={0} isFitted variant='soft-rounded' colorScheme='gray'>
        <TabList>
          <Tab ml={0}>{t('posts.flow.create.title')}</Tab>
          <Tab mr={0}>{t('posts.flow.drafts.title')}</Tab>
        </TabList>
        <TabPanels pt={4}>
          <TabPanel p={0}>
            <CreatePostComponent />
          </TabPanel>
          <TabPanel p={0}>
            <OpenDraftPosts query={queryData.viewer} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  )
}
