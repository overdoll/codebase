/**
 * @flow
 */
import type { Node } from 'react'
import { Helmet } from 'react-helmet-async'
import { PageWrapper } from '../../../../modules/content/PageLayout'
import SkeletonStack from '@//:modules/content/SkeletonStack/SkeletonStack'
import ErrorBoundary from '@//:modules/utilities/ErrorBoundary'
import ErrorFallback from '@//:modules/content/ErrorFallback/ErrorFallback'
import { Suspense } from 'react'
import { useQueryLoader } from 'react-relay/hooks'
import type { DraftPostsQuery as DraftPostsQueryType } from '@//:artifacts/DraftPostsQuery.graphql'
import PostsQuery from '@//:artifacts/PostsQuery.graphql'
import DraftPosts from './DraftPosts/DraftPosts'

type Props = {
  prepared: {
    draftPostsQuery: DraftPostsQueryType
  }
}

export default function Posts (props: Props): Node {
  const [queryRef, loadQuery] = useQueryLoader(
    PostsQuery,
    props.prepared.draftPostsQuery
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
            <DraftPosts query={queryRef} />
          </ErrorBoundary>
        </Suspense>
      </PageWrapper>
    </>
  )
}
