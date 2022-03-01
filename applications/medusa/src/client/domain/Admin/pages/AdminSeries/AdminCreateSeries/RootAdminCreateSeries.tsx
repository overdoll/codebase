import { Helmet } from 'react-helmet-async'
import { PageSectionTitle, PageWrapper } from '@//:modules/content/PageLayout'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { Suspense } from 'react'
import SkeletonStack from '@//:modules/content/Placeholder/Loading/SkeletonStack/SkeletonStack'
import { PreloadedQuery, useQueryLoader } from 'react-relay/hooks'
import AdminCreateSeriesQuery, {
  AdminCreateSeriesQuery as AdminCreateSeriesQueryType
} from '@//:artifacts/AdminCreateSeriesQuery.graphql'
import AdminCreateSeries from './AdminCreateSeries/AdminCreateSeries'
import { Trans } from '@lingui/macro'

interface Props {
  prepared: {
    query: PreloadedQuery<AdminCreateSeriesQueryType>
  }
}

export default function RootAdminCreateSeries (props: Props): JSX.Element {
  const [queryRef, loadQuery] = useQueryLoader(
    AdminCreateSeriesQuery,
    props.prepared.query
  )

  return (
    <>
      <Helmet title='create series' />
      <PageWrapper>
        <PageSectionTitle>
          <Trans>
            Create Series
          </Trans>
        </PageSectionTitle>
        <QueryErrorBoundary loadQuery={() => loadQuery({})}>
          <Suspense fallback={<SkeletonStack />}>
            <AdminCreateSeries
              query={queryRef as PreloadedQuery<AdminCreateSeriesQueryType>}
            />
          </Suspense>
        </QueryErrorBoundary>
      </PageWrapper>
    </>
  )
}
