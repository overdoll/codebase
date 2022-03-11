import { Helmet } from 'react-helmet-async'
import { PageSectionTitle, PageWrapper } from '@//:modules/content/PageLayout'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { Suspense } from 'react'
import SkeletonStack from '@//:modules/content/Placeholder/Loading/SkeletonStack/SkeletonStack'
import { PreloadedQuery, useQueryLoader } from 'react-relay/hooks'
import AdminCreateCancellationReasonQuery, {
  AdminCreateCancellationReasonQuery as AdminCreateCancellationReasonQueryType
} from '@//:artifacts/AdminCreateCancellationReasonQuery.graphql'
import AdminCreateCancellationReason from './AdminCreateCancellationReason/AdminCreateCancellationReason'
import { Trans } from '@lingui/macro'

interface Props {
  prepared: {
    query: PreloadedQuery<AdminCreateCancellationReasonQueryType>
  }
}

export default function RootAdminCreateCancellationReason (props: Props): JSX.Element {
  const [queryRef, loadQuery] = useQueryLoader(
    AdminCreateCancellationReasonQuery,
    props.prepared.query
  )

  return (
    <>
      <Helmet title='create cancellation reason' />
      <PageWrapper>
        <PageSectionTitle>
          <Trans>
            Create Cancellation Reason
          </Trans>
        </PageSectionTitle>
        <QueryErrorBoundary loadQuery={() => loadQuery({})}>
          <Suspense fallback={<SkeletonStack />}>
            <AdminCreateCancellationReason
              query={queryRef as PreloadedQuery<AdminCreateCancellationReasonQueryType>}
            />
          </Suspense>
        </QueryErrorBoundary>
      </PageWrapper>
    </>
  )
}
