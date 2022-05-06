import { Suspense } from 'react'
import { PageWrapper } from '@//:modules/content/PageLayout'
import type { PreloadedQuery } from 'react-relay/hooks'
import { useQueryLoader } from 'react-relay/hooks'
import type {
  StaffDepositRequestQuery as StaffDepositRequestQueryType
} from '@//:artifacts/StaffDepositRequestQuery.graphql'
import StaffDepositRequestQuery from '@//:artifacts/StaffDepositRequestQuery.graphql'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { SkeletonStack } from '@//:modules/content/Placeholder'
import StaffDepositRequest from './StaffDepositRequest/StaffDepositRequest'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { PageProps } from '@//:types/app'

interface Props {
  queryRefs: {
    staffDepositRequestQuery: PreloadedQuery<StaffDepositRequestQueryType>
  }
}

const RootStaffDepositRequest: PageProps<Props> = (props: Props) => {
  const [queryRef, loadQuery] = useQueryLoader<StaffDepositRequestQueryType>(
    StaffDepositRequestQuery,
    props.queryRefs.staffDepositRequestQuery
  )

  const { query: { reference } } = useRouter()

  return (
    <>
      <Head>
        <title>
          Deposit Request - Staff :: overdoll.com
        </title>
      </Head>
      <PageWrapper>
        <QueryErrorBoundary loadQuery={() => loadQuery({ reference: reference as string })}>
          <Suspense fallback={<SkeletonStack />}>
            <StaffDepositRequest query={queryRef as PreloadedQuery<StaffDepositRequestQueryType>} />
          </Suspense>
        </QueryErrorBoundary>
      </PageWrapper>
    </>
  )
}

export default RootStaffDepositRequest
