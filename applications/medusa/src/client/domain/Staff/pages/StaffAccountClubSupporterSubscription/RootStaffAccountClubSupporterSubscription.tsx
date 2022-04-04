import { Suspense } from 'react'
import { Helmet } from 'react-helmet-async'
import { PageWrapper } from '@//:modules/content/PageLayout'
import type { PreloadedQuery } from 'react-relay/hooks'
import { useQueryLoader } from 'react-relay/hooks'
import type {
  StaffAccountClubSupporterSubscriptionQuery as StaffAccountClubSupporterSubscriptionQueryType
} from '@//:artifacts/StaffAccountClubSupporterSubscriptionQuery.graphql'
import StaffAccountClubSupporterSubscriptionQuery
  from '@//:artifacts/StaffAccountClubSupporterSubscriptionQuery.graphql'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { useParams } from '@//:modules/routing/useParams'
import { SkeletonStack } from '@//:modules/content/Placeholder'
import StaffAccountClubSupporterSubscription
  from './StaffAccountClubSupporterSubscription/StaffAccountClubSupporterSubscription'

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

  const match = useParams()

  return (
    <>
      <Helmet title='staff subscription' />
      <PageWrapper>
        <QueryErrorBoundary loadQuery={() => loadQuery({ reference: match.reference as string })}>
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
