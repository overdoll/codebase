import { Helmet } from 'react-helmet-async'
import { PageWrapper } from '@//:modules/content/PageLayout'
import SkeletonStack from '@//:modules/content/SkeletonStack/SkeletonStack'
import { PreloadedQuery, useQueryLoader } from 'react-relay/hooks'
import QueryErrorBoundary from '@//:modules/relay/QueryErrorBoundary/QueryErrorBoundary'
import { Suspense } from 'react'
import type { ManageClubsQuery as ManageClubsQueryType } from '@//:artifacts/ManageClubsQuery.graphql'
import ManageClubsQuery from '@//:artifacts/ManageClubsQuery.graphql'
import ManageClubs from './ManageClubs/ManageClubs'

interface Props {
  prepared: {
    manageClubsQuery: PreloadedQuery<ManageClubsQueryType>
  }
}

export default function RootManageClubs (props: Props): JSX.Element {
  const [queryRef, loadQuery] = useQueryLoader(
    ManageClubsQuery,
    props.prepared.manageClubsQuery
  )

  return (
    <>
      <Helmet title='manage clubs' />
      <PageWrapper>
        <QueryErrorBoundary loadQuery={() => loadQuery({})}>
          <Suspense fallback={<SkeletonStack />}>
            <ManageClubs query={queryRef as PreloadedQuery<ManageClubsQueryType>} />
          </Suspense>
        </QueryErrorBoundary>
      </PageWrapper>
    </>
  )
}
