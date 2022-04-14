import { Suspense } from 'react'
import { PageWrapper } from '@//:modules/content/PageLayout'
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

interface Props {
  prepared: {
    query: PreloadedQuery<StaffAccountTransactionQueryType>
  }
}

export default function RootStaffAccountTransaction (props: Props): JSX.Element {
  const [queryRef, loadQuery] = useQueryLoader<StaffAccountTransactionQueryType>(
    StaffAccountTransactionQuery,
    props.prepared.query
  )

  const { query: { reference } } = useRouter()

  return (
    <>
      <Head>
        <title>
          Transaction - Staff :: overdoll.com
        </title>
      </Head>
      <PageWrapper>
        <QueryErrorBoundary loadQuery={() => loadQuery({ reference: reference as string })}>
          <Suspense fallback={<SkeletonStack />}>
            <StaffAccountTransaction query={queryRef as PreloadedQuery<StaffAccountTransactionQueryType>} />
          </Suspense>
        </QueryErrorBoundary>
      </PageWrapper>
    </>
  )
}
