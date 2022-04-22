import { Suspense } from 'react'
import { PageWrapper } from '@//:modules/content/PageLayout'
import type { PreloadedQuery } from 'react-relay/hooks'
import { useQueryLoader } from 'react-relay/hooks'
import type {
  StaffViewCancellationReasonQuery as StaffViewCancellationReasonQueryType
} from '@//:artifacts/StaffViewCancellationReasonQuery.graphql'
import StaffViewCancellationReasonQuery from '@//:artifacts/StaffViewCancellationReasonQuery.graphql'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { Stack } from '@chakra-ui/react'
import StaffViewCancellationReason from './StaffViewCancellationReason/StaffViewCancellationReason'
import { SkeletonStack } from '@//:modules/content/Placeholder'
import { Trans } from '@lingui/macro'
import BackButton from '@//:modules/content/PageLayout/BuildingBlocks/BackButton/BackButton'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { PageProps } from '@//:types/app'

interface Props {
  queryRefs: {
    staffViewCancellationReasonQuery: PreloadedQuery<StaffViewCancellationReasonQueryType>
  }
}

const RootStaffViewCancellationReason: PageProps<Props> = (props: Props) => {
  const [queryRef, loadQuery] = useQueryLoader(
    StaffViewCancellationReasonQuery,
    props.queryRefs.staffViewCancellationReasonQuery
  )

  const { query: { reference } } = useRouter()

  return (
    <>
      <Head>
        <title>
          View Cancellation Reason - Staff :: overdoll.com
        </title>
      </Head>
      <PageWrapper>
        <Stack spacing={2}>
          <BackButton href='/staff/entity/cancellation-reason/search'>
            <Trans>
              Back to search
            </Trans>
          </BackButton>
          <QueryErrorBoundary loadQuery={() => loadQuery({
            reference: reference as string
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

export default RootStaffViewCancellationReason
