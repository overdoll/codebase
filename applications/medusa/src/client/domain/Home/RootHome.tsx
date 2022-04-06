import { Suspense } from 'react'
import { PreloadedQuery, useQueryLoader } from 'react-relay/hooks'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import type { HomeQuery as HomeQueryType } from '@//:artifacts/HomeQuery.graphql'
import HomeQuery from '@//:artifacts/HomeQuery.graphql'
import Home from './Home/Home'
import SkeletonPost from '@//:modules/content/Placeholder/Loading/SkeletonPost/SkeletonPost'
import PageInfiniteScrollWrapper
  from '../../../modules/content/PageLayout/Wrappers/PageInfiniteScrollWrapper/PageInfiniteScrollWrapper'

interface Props {
  prepared: {
    query: PreloadedQuery<HomeQueryType>
  }
}

export default function RootHome (props: Props): JSX.Element {
  const [queryRef, loadQuery] = useQueryLoader(
    HomeQuery,
    props.prepared.query
  )

  return (
    <>
      <PageInfiniteScrollWrapper>
        <QueryErrorBoundary loadQuery={() => loadQuery({})}>
          <Suspense fallback={<SkeletonPost />}>
            <Home query={queryRef as PreloadedQuery<HomeQueryType>} />
          </Suspense>
        </QueryErrorBoundary>
      </PageInfiniteScrollWrapper>
    </>
  )
}
