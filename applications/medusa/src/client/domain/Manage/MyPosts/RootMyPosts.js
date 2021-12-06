/**
 * @flow
 */
import type { Node } from 'react'
import { Helmet } from 'react-helmet-async'
import { PageWrapper } from '@//:modules/content/PageLayout'
import SkeletonStack from '@//:modules/content/SkeletonStack/SkeletonStack'
import ErrorBoundary from '@//:modules/utilities/ErrorBoundary'
import ErrorFallback from '@//:modules/content/ErrorFallback/ErrorFallback'
import { Suspense } from 'react'
import { graphql, useQueryLoader } from 'react-relay/hooks'
import type { DraftPostsQuery as DraftPostsQueryType } from '@//:artifacts/DraftPostsQuery.graphql'
import PostsQuery from '@//:artifacts/PostsQuery.graphql'
import MyPosts from './MyPosts/MyPosts'

type Props = {
  prepared: {
    myPostsQuery: DraftPostsQueryType
  }
}

export default function RootMyPosts (props: Props): Node {
  const [queryRef, loadQuery] = useQueryLoader(
    PostsQuery,
    props.prepared.myPostsQuery
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
            <MyPosts query={queryRef} />
          </ErrorBoundary>
        </Suspense>
      </PageWrapper>
    </>
  )
}
