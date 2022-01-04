import { Suspense } from 'react'
import { Helmet } from 'react-helmet-async'
import { PageWrapper } from '@//:modules/content/PageLayout'
import SkeletonStack from '@//:modules/content/SkeletonStack/SkeletonStack'
import type { PreloadedQuery } from 'react-relay/hooks'
import { useQueryLoader } from 'react-relay/hooks'
import type { MyPostsQuery as MyPostsQueryType } from '@//:artifacts/MyPostsQuery.graphql'
import MyPostsQuery from '@//:artifacts/MyPostsQuery.graphql'
import MyPosts from './MyPosts/MyPosts'
import QueryErrorBoundary from '@//:modules/relay/QueryErrorBoundary/QueryErrorBoundary'

interface Props {
  prepared: {
    myPostsQuery: PreloadedQuery<MyPostsQueryType>
  }
}

export default function RootMyPosts (props: Props): JSX.Element {
  const [queryRef, loadQuery] = useQueryLoader(
    MyPostsQuery,
    props.prepared.myPostsQuery,
  )

  return (
    <>
      <Helmet title='my posts' />
      <PageWrapper>
        <QueryErrorBoundary loadQuery={() => loadQuery({})}>
          <Suspense fallback={<SkeletonStack />}>
            <MyPosts query={queryRef as PreloadedQuery<MyPostsQueryType>} />
          </Suspense>
        </QueryErrorBoundary>
      </PageWrapper>
    </>
  )
}
