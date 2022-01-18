import { Helmet } from 'react-helmet-async'
import { Suspense } from 'react'
import SkeletonStack from '@//:modules/content/Skeleton/SkeletonStack/SkeletonStack'
import { PreloadedQuery, useQueryLoader } from 'react-relay/hooks'
import QueryErrorBoundary from '@//:modules/relay/QueryErrorBoundary/QueryErrorBoundary'
import type { MyClubsQuery as MyClubsQueryType } from '@//:artifacts/MyClubsQuery.graphql'
import MyClubsQuery from '@//:artifacts/MyClubsQuery.graphql'
import MyClubs from './MyClubs/MyClubs'
import { PageWrapper } from '@//:modules/content/PageLayout'

interface Props {
  prepared: {
    query: PreloadedQuery<MyClubsQueryType>
  }
}

export default function RootHome (props: Props): JSX.Element {
  const [queryRef, loadQuery] = useQueryLoader(
    MyClubsQuery,
    props.prepared.query
  )

  return (
    <>
      <Helmet title='my clubs' />
      <PageWrapper>
        <QueryErrorBoundary loadQuery={() => loadQuery({})}>
          <Suspense fallback={<SkeletonStack />}>
            <MyClubs query={queryRef as PreloadedQuery<MyClubsQueryType>} />
          </Suspense>
        </QueryErrorBoundary>
      </PageWrapper>
    </>
  )
}
