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
import SkeletonStack from '@//:modules/content/SkeletonStack/SkeletonStack'
import ErrorBoundary from '@//:modules/utilities/ErrorBoundary'
import ErrorFallback from '@//:modules/content/ErrorFallback/ErrorFallback'
import { Suspense } from 'react'
import { useQueryLoader } from 'react-relay/hooks'
import type { ViewerDraftPostsQuery as ViewerDraftPostsQueryType } from '@//:artifacts/ViewerDraftPostsQuery.graphql'
import ViewerDraftPostsQuery from '@//:artifacts/ViewerDraftPostsQuery.graphql'
import ViewerDraftPosts from './ViewerDraftPosts/ViewerDraftPosts'

type Props = {
  prepared: {
    viewerDraftPostsQuery: ViewerDraftPostsQueryType
  }
}

export default function RootPosts (props: Props): Node {
  const [queryRef, loadQuery] = useQueryLoader(
    ViewerDraftPostsQuery,
    props.prepared.viewerDraftPostsQuery
  )

  return (
    <>
      <Helmet title='posts' />
      <PageWrapper>
        <Suspense fallback={<SkeletonStack />}>
          <ErrorBoundary
            fallback={({ error, reset }) => (
              <ErrorFallback error={error} reset={reset} refetch={loadQuery} />
            )}
          >
            <ViewerDraftPosts query={queryRef} />
          </ErrorBoundary>
        </Suspense>
      </PageWrapper>
    </>
  )
}
