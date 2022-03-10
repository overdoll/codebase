import { Suspense } from 'react'
import { Helmet } from 'react-helmet-async'
import { PageWrapper } from '@//:modules/content/PageLayout'
import type { PreloadedQuery } from 'react-relay/hooks'
import { useQueryLoader } from 'react-relay/hooks'
import type {
  AdminCCBillSubscriptionDetailsQuery as AdminCCBillSubscriptionDetailsQueryType
} from '@//:artifacts/AdminCCBillSubscriptionDetailsQuery.graphql'
import AdminisFittedCCBillSubscriptionDetailsQuery from '@//:artifacts/AdminCCBillSubscriptionDetailsQuery.graphql'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { useParams } from '@//:modules/routing/useParams'
import { SkeletonStack } from '@//:modules/content/Placeholder'
import AdminCCBillSubscriptionDetails from './AdminCCBillSubscriptionDetails/AdminCCBillSubscriptionDetails'

interface Props {
  prepared: {
    query: PreloadedQuery<AdminCCBillSubscriptionDetailsQueryType>
  }
}

export default function RootAdminAccount (props: Props): JSX.Element {
  const [queryRef, loadQuery] = useQueryLoader<AdminCCBillSubscriptionDetailsQueryType>(
    AdminisFittedCCBillSubscriptionDetailsQuery,
    props.prepared.query
  )

  const match = useParams()

  return (
    <>
      <Helmet title='subscription details' />
      <PageWrapper>
        <QueryErrorBoundary loadQuery={() => loadQuery({ ccbillSubscriptionId: match.id as string })}>
          <Suspense fallback={<SkeletonStack />}>
            <AdminCCBillSubscriptionDetails
              query={queryRef as PreloadedQuery<AdminCCBillSubscriptionDetailsQueryType>}
            />
          </Suspense>
        </QueryErrorBoundary>
      </PageWrapper>
    </>
  )
}
