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
import Head from 'next/head'
import { PageProps } from '@//:types/app'

interface Props {
  queryRefs: {
    createCancellationReasonQuery: PreloadedQuery<StaffCreateCancellationReasonQueryType>
  }
}

const RootStaffCreateCancellationReason: PageProps<Props> = (props: Props) => {
  const [queryRef, loadQuery] = useQueryLoader(
    StaffCreateCancellationReasonQuery,
    props.queryRefs.createCancellationReasonQuery
  )

  return (
    <>
      <Head>
        <title>
          Create Cancellation Reason - Staff :: overdoll.com
        </title>
      </Head>
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

export default RootStaffCreateCancellationReason
