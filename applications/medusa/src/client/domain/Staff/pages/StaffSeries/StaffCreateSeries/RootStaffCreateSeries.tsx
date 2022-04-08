import { Helmet } from 'react-helmet-async'
import { PageSectionTitle, PageWrapper } from '@//:modules/content/PageLayout'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { Suspense } from 'react'
import SkeletonStack from '@//:modules/content/Placeholder/Loading/SkeletonStack/SkeletonStack'
import { PreloadedQuery, useQueryLoader } from 'react-relay/hooks'
import StaffCreateSeriesQuery, {
  StaffCreateSeriesQuery as StaffCreateSeriesQueryType
} from '@//:artifacts/StaffCreateSeriesQuery.graphql'
import StaffCreateSeries from './StaffCreateSeries/StaffCreateSeries'
import { Trans } from '@lingui/macro'

interface Props {
  prepared: {
    query: PreloadedQuery<StaffCreateSeriesQueryType>
  }
}

export default function RootStaffCreateSeries (props: Props): JSX.Element {
  const [queryRef, loadQuery] = useQueryLoader(
    StaffCreateSeriesQuery,
    props.prepared.query
  )

  return (
    <>
      <Helmet>
        <title>
          Create Series - Staff :: overdoll.com
        </title>
      </Helmet>
      <PageWrapper>
        <PageSectionTitle>
          <Trans>
            Create Series
          </Trans>
        </PageSectionTitle>
        <QueryErrorBoundary loadQuery={() => loadQuery({})}>
          <Suspense fallback={<SkeletonStack />}>
            <StaffCreateSeries
              query={queryRef as PreloadedQuery<StaffCreateSeriesQueryType>}
            />
          </Suspense>
        </QueryErrorBoundary>
      </PageWrapper>
    </>
  )
}
