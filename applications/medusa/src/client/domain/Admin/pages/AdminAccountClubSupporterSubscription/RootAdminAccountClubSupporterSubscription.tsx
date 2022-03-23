import { Suspense } from 'react'
import { Helmet } from 'react-helmet-async'
import { PageWrapper } from '@//:modules/content/PageLayout'
import type { PreloadedQuery } from 'react-relay/hooks'
import { useQueryLoader } from 'react-relay/hooks'
import type {
  AdminAccountClubSupporterSubscriptionQuery as AdminAccountClubSupporterSubscriptionQueryType
} from '@//:artifacts/AdminAccountClubSupporterSubscriptionQuery.graphql'
import AdminAccountClubSupporterSubscriptionQuery
  from '@//:artifacts/AdminAccountClubSupporterSubscriptionQuery.graphql'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { useParams } from '@//:modules/routing/useParams'
import { SkeletonStack } from '@//:modules/content/Placeholder'
import AdminAccountClubSupporterSubscription
  from './AdminAccountClubSupporterSubscription/AdminAccountClubSupporterSubscription'

interface Props {
  prepared: {
    query: PreloadedQuery<AdminAccountClubSupporterSubscriptionQueryType>
  }
}

export default function RootAdminClub (props: Props): JSX.Element {
  const [queryRef, loadQuery] = useQueryLoader<AdminAccountClubSupporterSubscriptionQueryType>(
    AdminAccountClubSupporterSubscriptionQuery,
    props.prepared.query
  )

  const match = useParams()

  return (
    <>
      <Helmet title='admin subscription' />
      <PageWrapper>
        <QueryErrorBoundary loadQuery={() => loadQuery({ reference: match.reference as string })}>
          <Suspense fallback={<SkeletonStack />}>
            <AdminAccountClubSupporterSubscription
              query={queryRef as PreloadedQuery<AdminAccountClubSupporterSubscriptionQueryType>}
            />
          </Suspense>
        </QueryErrorBoundary>
      </PageWrapper>
    </>
  )
}
