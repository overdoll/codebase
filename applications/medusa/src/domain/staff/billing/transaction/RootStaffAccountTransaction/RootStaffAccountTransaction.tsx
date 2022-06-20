import { Suspense } from 'react'
import type { PreloadedQuery } from 'react-relay/hooks'
import { useQueryLoader } from 'react-relay/hooks'
import type {
  StaffAccountTransactionQuery as StaffAccountTransactionQueryType
} from '@//:artifacts/StaffAccountTransactionQuery.graphql'
import StaffAccountTransactionQuery from '@//:artifacts/StaffAccountTransactionQuery.graphql'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { SkeletonStack } from '@//:modules/content/Placeholder'
import StaffAccountTransaction from './StaffAccountTransaction/StaffAccountTransaction'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { PageProps } from '@//:types/app'
import PageWrapperDesktop from '../../../../../common/components/PageWrapperDesktop/PageWrapperDesktop'

interface Props {
  queryRefs: {
    staffTransactionQuery: PreloadedQuery<StaffAccountTransactionQueryType>
  }
}

const RootStaffAccountTransaction: PageProps<Props> = (props: Props) => {
  const [queryRef, loadQuery] = useQueryLoader<StaffAccountTransactionQueryType>(
    StaffAccountTransactionQuery,
    props.queryRefs.staffTransactionQuery
  )

  const { query: { reference } } = useRouter()

  return (
    <>
      <Head>
        <title>
          Transaction - Staff · overdoll.com
        </title>
      </Head>
      <PageWrapperDesktop>
        <QueryErrorBoundary loadQuery={() => loadQuery({ reference: reference as string })}>
          <Suspense fallback={<SkeletonStack />}>
            <StaffAccountTransaction query={queryRef as PreloadedQuery<StaffAccountTransactionQueryType>} />
          </Suspense>
        </QueryErrorBoundary>
      </PageWrapperDesktop>
    </>
  )
}

export default RootStaffAccountTransaction
