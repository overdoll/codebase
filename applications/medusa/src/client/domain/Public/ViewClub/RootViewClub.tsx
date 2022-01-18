import { PreloadedQuery, useQueryLoader } from 'react-relay/hooks'
import { Helmet } from 'react-helmet-async'
import { PageWrapper } from '@//:modules/content/PageLayout'
import QueryErrorBoundary from '@//:modules/relay/QueryErrorBoundary/QueryErrorBoundary'
import { Suspense } from 'react'
import type { ViewClubQuery as ViewClubQueryType } from '@//:artifacts/ViewClubQuery.graphql'
import ViewClubQuery from '@//:artifacts/ViewClubQuery.graphql'
import { useParams } from '@//:modules/routing/useParams'
import ViewClub from './ViewClub/ViewClub'
import SkeletonStack from '@//:modules/content/Skeleton/SkeletonStack/SkeletonStack'
import PageContents from '../../Root/PageContents/PageContents'

interface Props {
  prepared: {
    query: PreloadedQuery<ViewClubQueryType>
  }
}

export default function RootViewClub (props: Props): JSX.Element {
  const [queryRef, loadQuery] = useQueryLoader(
    ViewClubQuery,
    props.prepared.query
  )

  const match = useParams()

  return (
    <>
      <Helmet title='club' />
      <PageWrapper fillPage>
        <QueryErrorBoundary loadQuery={() => loadQuery({ slug: match.slug as string })}>
          <Suspense fallback={<SkeletonStack />}>
            <ViewClub query={queryRef as PreloadedQuery<ViewClubQueryType>} />
          </Suspense>
        </QueryErrorBoundary>
      </PageWrapper>
    </>
  )
}
