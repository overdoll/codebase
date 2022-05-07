import { Suspense } from 'react'
import { PageWrapper } from '@//:modules/content/PageLayout'
import type { PreloadedQuery } from 'react-relay/hooks'
import { useQueryLoader } from 'react-relay/hooks'
import type { StaffPaymentQuery as StaffPaymentQueryType } from '@//:artifacts/StaffPaymentQuery.graphql'
import StaffPaymentQuery from '@//:artifacts/StaffPaymentQuery.graphql'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { SkeletonStack } from '@//:modules/content/Placeholder'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { PageProps } from '@//:types/app'
import StaffPayment from './StaffPayment/StaffPayment'

interface Props {
  queryRefs: {
    staffPaymentQuery: PreloadedQuery<StaffPaymentQueryType>
  }
}

const RootStaffPayment: PageProps<Props> = (props: Props) => {
  const [queryRef, loadQuery] = useQueryLoader<StaffPaymentQueryType>(
    StaffPaymentQuery,
    props.queryRefs.staffPaymentQuery
  )

  const { query: { reference } } = useRouter()

  return (
    <>
      <Head>
        <title>
          Payment - Staff :: overdoll.com
        </title>
      </Head>
      <PageWrapper>
        <QueryErrorBoundary loadQuery={() => loadQuery({ reference: reference as string })}>
          <Suspense fallback={<SkeletonStack />}>
            <StaffPayment query={queryRef as PreloadedQuery<StaffPaymentQueryType>} />
          </Suspense>
        </QueryErrorBoundary>
      </PageWrapper>
    </>
  )
}

export default RootStaffPayment
