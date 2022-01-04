import { Helmet } from 'react-helmet-async'
import { PageWrapper } from '@//:modules/content/PageLayout'
import SkeletonStack from '@//:modules/content/SkeletonStack/SkeletonStack'
import { PreloadedQuery, useQueryLoader } from 'react-relay/hooks'
import QueryErrorBoundary from '@//:modules/relay/QueryErrorBoundary/QueryErrorBoundary'
import { Suspense } from 'react'
import type { MyClubsQuery as MyClubsQueryType } from '@//:artifacts/MyClubsQuery.graphql'
import MyClubsQuery from '@//:artifacts/MyClubsQuery.graphql'
import MyClubs from './MyClubs/MyClubs'

interface Props {
  prepared: {
    clubsQuery: PreloadedQuery<MyClubsQueryType>
  }
}

export default function ManageClubs (props: Props): JSX.Element {
  const [queryRef, loadQuery] = useQueryLoader(
    MyClubsQuery,
    props.prepared.clubsQuery
  )

  return (
    <>
      <Helmet title='manage clubs' />
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
