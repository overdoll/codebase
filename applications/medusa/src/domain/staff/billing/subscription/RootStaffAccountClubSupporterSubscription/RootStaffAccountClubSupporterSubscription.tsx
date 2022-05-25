import { Suspense } from 'react'
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
import { PageProps } from '@//:types/app'
import PageWrapperDesktop from '../../../../../common/components/PageWrapperDesktop/PageWrapperDesktop'

interface Props {
  queryRefs: {
    staffSubscriptionQuery: PreloadedQuery<StaffAccountClubSupporterSubscriptionQueryType>
  }
}

const RootStaffAccountClubSupporterSubscription: PageProps<Props> = (props: Props) => {
  const [queryRef, loadQuery] = useQueryLoader<StaffAccountClubSupporterSubscriptionQueryType>(
    StaffAccountClubSupporterSubscriptionQuery,
    props.queryRefs.staffSubscriptionQuery
  )

  const { query: { reference } } = useRouter()

  return (
    <>
      <Head>
        <title>
          Subscription - Staff :: overdoll.com
        </title>
      </Head>
      <PageWrapperDesktop>
        <QueryErrorBoundary loadQuery={() => loadQuery({ reference: reference as string })}>
          <Suspense fallback={<SkeletonStack />}>
            <StaffAccountClubSupporterSubscription
              query={queryRef as PreloadedQuery<StaffAccountClubSupporterSubscriptionQueryType>}
            />
          </Suspense>
        </QueryErrorBoundary>
      </PageWrapperDesktop>
    </>
  )
}

export default RootStaffAccountClubSupporterSubscription
