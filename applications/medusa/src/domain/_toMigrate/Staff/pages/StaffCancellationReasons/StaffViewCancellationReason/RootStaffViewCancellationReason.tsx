import { Suspense } from 'react'
import { Helmet } from 'react-helmet-async'
import { PageWrapper } from '@//:modules/content/PageLayout'
import type { PreloadedQuery } from 'react-relay/hooks'
import { useQueryLoader } from 'react-relay/hooks'
import type {
  StaffViewCancellationReasonQuery as StaffViewCancellationReasonQueryType
} from '@//:artifacts/StaffViewCancellationReasonQuery.graphql'
import StaffViewCancellationReasonQuery from '@//:artifacts/StaffViewCancellationReasonQuery.graphql'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { useParams } from '@//:modules/routing/useParams'
import { Stack } from '@chakra-ui/react'
import StaffViewCancellationReason from './StaffViewCancellationReason/StaffViewCancellationReason'
import { SkeletonStack } from '@//:modules/content/Placeholder'
import { Trans } from '@lingui/macro'
import BackButton from '@//:modules/content/PageLayout/BuildingBlocks/BackButton/BackButton'

interface Props {
  prepared: {
    query: PreloadedQuery<StaffViewCancellationReasonQueryType>
  }
}

export default function RootStaffViewCancellationReason (props: Props): JSX.Element {
  const [queryRef, loadQuery] = useQueryLoader(
    StaffViewCancellationReasonQuery,
    props.prepared.query
  )

  const match = useParams()

  return (
    <>
      <Helmet>
        <title>
          View Cancellation Reason - Staff :: overdoll.com
        </title>
      </Helmet>
      <PageWrapper>
        <Stack spacing={2}>
          <BackButton to='/staff/cancellation-reason/search'>
            <Trans>
              Back to search
            </Trans>
          </BackButton>
          <QueryErrorBoundary loadQuery={() => loadQuery({
            reference: match.reference as string
          })}
          >
            <Suspense fallback={<SkeletonStack />}>
              <StaffViewCancellationReason query={queryRef as PreloadedQuery<StaffViewCancellationReasonQueryType>} />
            </Suspense>
          </QueryErrorBoundary>
        </Stack>
      </PageWrapper>
    </>
  )
}
