import { Helmet } from 'react-helmet-async'
import { Suspense } from 'react'
import { PreloadedQuery, useQueryLoader } from 'react-relay/hooks'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import type { HomeQuery as HomeQueryType } from '@//:artifacts/HomeQuery.graphql'
import HomeQuery from '@//:artifacts/HomeQuery.graphql'
import Home from './Home/Home'
import { PageWrapper } from '@//:modules/content/PageLayout'
import SkeletonPost from '@//:modules/content/Placeholder/Loading/SkeletonPost/SkeletonPost'

interface Props {
  prepared: {
    query: PreloadedQuery<HomeQueryType>
  }
}

export default function RootHome (props: Props): JSX.Element {
  const [queryRef, loadQuery] = useQueryLoader(
    HomeQuery,
    props.prepared.query,
  )

  return (
    <>
      <Helmet title='home' />
      <PageWrapper fillPage>
        <QueryErrorBoundary loadQuery={() => loadQuery({})}>
          <Suspense fallback={<SkeletonPost />}>
            <Home query={queryRef as PreloadedQuery<HomeQueryType>} />
          </Suspense>
        </QueryErrorBoundary>
      </PageWrapper>
    </>
  )
}
