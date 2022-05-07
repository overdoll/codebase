import { Suspense } from 'react'
import { PageWrapper } from '@//:modules/content/PageLayout'
import type { PreloadedQuery } from 'react-relay/hooks'
import { useQueryLoader } from 'react-relay/hooks'
import type { StaffPayoutQuery as StaffPayoutQueryType } from '@//:artifacts/StaffPayoutQuery.graphql'
import StaffPayoutQuery from '@//:artifacts/StaffPayoutQuery.graphql'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { SkeletonStack } from '@//:modules/content/Placeholder'
import StaffPayout from './StaffPayout/StaffPayout'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { PageProps } from '@//:types/app'

interface Props {
  queryRefs: {
    staffPayoutQuery: PreloadedQuery<StaffPayoutQueryType>
  }
}

const RootStaffPayout: PageProps<Props> = (props: Props) => {
  const [queryRef, loadQuery] = useQueryLoader<StaffPayoutQueryType>(
    StaffPayoutQuery,
    props.queryRefs.staffPayoutQuery
  )

  const { query: { reference } } = useRouter()

  return (
    <>
      <Head>
        <title>
          Payout - Staff :: overdoll.com
        </title>
      </Head>
      <PageWrapper>
        <QueryErrorBoundary loadQuery={() => loadQuery({ reference: reference as string })}>
          <Suspense fallback={<SkeletonStack />}>
            <StaffPayout query={queryRef as PreloadedQuery<StaffPayoutQueryType>} />
          </Suspense>
        </QueryErrorBoundary>
      </PageWrapper>
    </>
  )
}

export default RootStaffPayout
