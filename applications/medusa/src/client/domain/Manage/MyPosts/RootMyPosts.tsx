import { Suspense } from 'react'
import { Helmet } from 'react-helmet-async'
import { PageWrapper } from '@//:modules/content/PageLayout'
import SkeletonStack from '@//:modules/content/SkeletonStack/SkeletonStack'
import ErrorBoundary from '@//:modules/operations/ErrorBoundary'
import ErrorFallback from '@//:modules/content/ErrorFallback/ErrorFallback'
import type { PreloadedQuery } from 'react-relay/hooks'
import { useQueryLoader } from 'react-relay/hooks'
import type { MyPostsQuery as MyPostsQueryType } from '@//:artifacts/MyPostsQuery.graphql'
import MyPostsQuery from '@//:artifacts/MyPostsQuery.graphql'
import MyPosts from './MyPosts/MyPosts'

interface Props {
  prepared: {
    myPostsQuery: PreloadedQuery<MyPostsQueryType>
  }
}

export default function RootMyPosts (props: Props): JSX.Element {
  const [queryRef, loadQuery] = useQueryLoader(
    MyPostsQuery,
    props.prepared.myPostsQuery
  )

  return (
    <>
      <Helmet title='my posts' />
      <PageWrapper>
        <Suspense fallback={<SkeletonStack />}>
          <ErrorBoundary
            fallback={({
              error,
              reset
            }) => (
              <ErrorFallback error={error} reset={reset} refetch={loadQuery as () => void} />
            )}
          >
            <MyPosts query={queryRef as PreloadedQuery<MyPostsQueryType>} />
          </ErrorBoundary>
        </Suspense>
      </PageWrapper>
    </>
  )
}
