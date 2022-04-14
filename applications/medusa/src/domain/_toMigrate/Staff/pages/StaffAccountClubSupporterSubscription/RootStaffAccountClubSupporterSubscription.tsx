import { Suspense } from 'react'
import { PageWrapper } from '@//:modules/content/PageLayout'
import type { PreloadedQuery } from 'react-relay/hooks'
import { useQueryLoader } from 'react-relay/hooks'
import type {
  StaffAccountClubSupporterSubscriptionQuery as StaffAccountClubSupporterSubscriptionQueryType
} from '@//:artifacts/StaffAccountClubSupporterSubscriptionQuery.graphql'
import StaffAccountClubSupporterSubscriptionQuery
  from '@//:artifacts/StaffAccountClubSupporterSubscriptionQuery.graphql'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { SkeletonStack } from '@//:modules/content/Placeholder'
import StaffAccountClubSupporterSubscription
  from './StaffAccountClubSupporterSubscription/StaffAccountClubSupporterSubscription'
import Head from 'next/head'
import { useRouter } from 'next/router'

interface Props {
  prepared: {
    query: PreloadedQuery<StaffAccountClubSupporterSubscriptionQueryType>
  }
}

export default function RootStaffAccountClubSupporterSubscription (props: Props): JSX.Element {
  const [queryRef, loadQuery] = useQueryLoader<StaffAccountClubSupporterSubscriptionQueryType>(
    StaffAccountClubSupporterSubscriptionQuery,
    props.prepared.query
  )

  const { query: { reference } } = useRouter()

  return (
    <>
      <Head>
        <title>
          Subscription - Staff :: overdoll.com
        </title>
      </Head>
      <PageWrapper>
        <QueryErrorBoundary loadQuery={() => loadQuery({ reference: reference as string })}>
          <Suspense fallback={<SkeletonStack />}>
            <StaffAccountClubSupporterSubscription
              query={queryRef as PreloadedQuery<StaffAccountClubSupporterSubscriptionQueryType>}
            />
          </Suspense>
        </QueryErrorBoundary>
      </PageWrapper>
    </>
  )
}
