/**
 * @flow
 */
import type { Node } from 'react'
import { Suspense } from 'react'
import { Helmet } from 'react-helmet-async'
import { PageSectionTitle, PageSectionWrap, PageWrapper } from '@//:modules/content/PageLayout'
import SkeletonStack from '@//:modules/content/SkeletonStack/SkeletonStack'
import ErrorBoundary from '@//:modules/utilities/ErrorBoundary'
import ErrorFallback from '@//:modules/content/ErrorFallback/ErrorFallback'
import { useQueryLoader } from 'react-relay/hooks'
import type { MyPostsQuery as MyPostsQueryType } from '@//:artifacts/MyPostsQuery.graphql'
import MyPostsQuery from '@//:artifacts/MyPostsQuery.graphql'
import MyPosts from './MyPosts/MyPosts'
import { useTranslation } from 'react-i18next'

type Props = {
  prepared: {
    myPostsQuery: MyPostsQueryType
  }
}

export default function RootMyPosts (props: Props): Node {
  const [queryRef, loadQuery] = useQueryLoader(
    MyPostsQuery,
    props.prepared.myPostsQuery
  )

  const [t] = useTranslation('manage')

  return (
    <>
      <Helmet title='my posts' />
      <PageWrapper>
        <Suspense fallback={<SkeletonStack />}>
          <ErrorBoundary
            fallback={({ error, reset }) => (
              <ErrorFallback error={error} reset={reset} refetch={loadQuery} />
            )}
          >
            <MyPosts query={queryRef} />
          </ErrorBoundary>
        </Suspense>
      </PageWrapper>
    </>
  )
}
