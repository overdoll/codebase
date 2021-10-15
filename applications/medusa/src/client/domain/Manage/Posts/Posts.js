/**
 * @flow
 */
import type { Node } from 'react'
import { Helmet } from 'react-helmet-async'
import { PageSectionTitle, PageSectionWrap, PageWrapper } from '../../../components/PageLayout'
import { useTranslation } from 'react-i18next'
import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel
} from '@chakra-ui/react'

export default function Posts (): Node {
  const [t] = useTranslation('manage')

  return (
    <>
      <Helmet title='posts' />
      <PageWrapper>
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
              <p>upload to start</p>
            </TabPanel>
            <TabPanel>
              <p>click to open draft</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </PageWrapper>
    </>
  )
}
