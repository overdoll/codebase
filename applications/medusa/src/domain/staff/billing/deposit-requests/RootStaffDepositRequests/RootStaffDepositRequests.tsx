import { Suspense } from 'react'
import { PageSectionTitle, PageSectionWrap } from '@//:modules/content/PageLayout'
import type { PreloadedQuery } from 'react-relay/hooks'
import { useQueryLoader } from 'react-relay/hooks'
import type {
  StaffDepositRequestsQuery as StaffDepositRequestsQueryType
} from '@//:artifacts/StaffDepositRequestsQuery.graphql'
import StaffDepositRequestsQuery from '@//:artifacts/StaffDepositRequestsQuery.graphql'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { SkeletonStack } from '@//:modules/content/Placeholder'
import Head from 'next/head'
import { PageProps } from '@//:types/app'
import StaffDepositRequests from './StaffDepositRequests/StaffDepositRequests'
import { Trans } from '@lingui/macro'
import PageWrapperDesktop from '../../../../../common/components/PageWrapperDesktop/PageWrapperDesktop'

interface Props {
  queryRefs: {
    staffDepositRequests: PreloadedQuery<StaffDepositRequestsQueryType>
  }
}

const RootStaffDepositRequests: PageProps<Props> = (props: Props) => {
  const [queryRef, loadQuery] = useQueryLoader<StaffDepositRequestsQueryType>(
    StaffDepositRequestsQuery,
    props.queryRefs.staffDepositRequests
  )

  return (
    <>
      <Head>
        <title>
          Deposit Requests - Staff :: overdoll.com
        </title>
      </Head>
      <PageWrapperDesktop>
        <PageSectionWrap>
          <PageSectionTitle>
            <Trans>
              Deposit Requests
            </Trans>
          </PageSectionTitle>
        </PageSectionWrap>
        <QueryErrorBoundary loadQuery={() => loadQuery({})}>
          <Suspense fallback={<SkeletonStack />}>
            <StaffDepositRequests query={queryRef as PreloadedQuery<StaffDepositRequestsQueryType>} />
          </Suspense>
        </QueryErrorBoundary>
      </PageWrapperDesktop>
    </>
  )
}

export default RootStaffDepositRequests
