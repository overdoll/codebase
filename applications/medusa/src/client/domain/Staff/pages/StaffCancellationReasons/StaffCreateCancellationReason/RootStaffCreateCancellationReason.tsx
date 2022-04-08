import { Helmet } from 'react-helmet-async'
import { PageSectionTitle, PageWrapper } from '@//:modules/content/PageLayout'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { Suspense } from 'react'
import SkeletonStack from '@//:modules/content/Placeholder/Loading/SkeletonStack/SkeletonStack'
import { PreloadedQuery, useQueryLoader } from 'react-relay/hooks'
import StaffCreateCancellationReasonQuery, {
  StaffCreateCancellationReasonQuery as StaffCreateCancellationReasonQueryType
} from '@//:artifacts/StaffCreateCancellationReasonQuery.graphql'
import StaffCreateCancellationReason from './StaffCreateCancellationReason/StaffCreateCancellationReason'
import { Trans } from '@lingui/macro'

interface Props {
  prepared: {
    query: PreloadedQuery<StaffCreateCancellationReasonQueryType>
  }
}

export default function RootStaffCreateCancellationReason (props: Props): JSX.Element {
  const [queryRef, loadQuery] = useQueryLoader(
    StaffCreateCancellationReasonQuery,
    props.prepared.query
  )

  return (
    <>
      <Helmet>
        <title>
          Create Cancellation Reason - Staff :: overdoll.com
        </title>
      </Helmet>
      <PageWrapper>
        <PageSectionTitle>
          <Trans>
            Create Cancellation Reason
          </Trans>
        </PageSectionTitle>
        <QueryErrorBoundary loadQuery={() => loadQuery({})}>
          <Suspense fallback={<SkeletonStack />}>
            <StaffCreateCancellationReason
              query={queryRef as PreloadedQuery<StaffCreateCancellationReasonQueryType>}
            />
          </Suspense>
        </QueryErrorBoundary>
      </PageWrapper>
    </>
  )
}
