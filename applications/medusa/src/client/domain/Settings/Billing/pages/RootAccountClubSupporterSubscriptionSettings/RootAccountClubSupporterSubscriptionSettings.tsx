import type { PreloadedQuery } from 'react-relay/hooks'
import { useQueryLoader } from 'react-relay/hooks'
import type {
  AccountClubSupporterSubscriptionSettingsQuery as AccountClubSupporterSubscriptionSettingsQueryType
} from '@//:artifacts/AccountClubSupporterSubscriptionSettingsQuery.graphql'
import AccountClubSupporterSubscriptionSettingsQuery
  from '@//:artifacts/AccountClubSupporterSubscriptionSettingsQuery.graphql'
import SkeletonStack from '@//:modules/content/Placeholder/Loading/SkeletonStack/SkeletonStack'
import { Suspense } from 'react'
import { PageWrapper } from '@//:modules/content/PageLayout'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { Trans } from '@lingui/macro'
import { Helmet } from 'react-helmet-async'
import BackButton from '@//:modules/content/PageLayout/BuildingBlocks/BackButton/BackButton'
import AccountClubSupporterSubscriptionSettings
  from './AccountClubSupporterSubscriptionSettings/AccountClubSupporterSubscriptionSettings'
import { useParams } from '@//:modules/routing'

interface Props {
  prepared: {
    query: PreloadedQuery<AccountClubSupporterSubscriptionSettingsQueryType>
  }
}

export default function RootAccountClubSupporterSubscriptionSettings (props: Props): JSX.Element | null {
  const [queryRef, loadQuery] = useQueryLoader(
    AccountClubSupporterSubscriptionSettingsQuery,
    props.prepared.query
  )

  const match = useParams()

  return (
    <>
      <Helmet title='view subscription' />
      <PageWrapper>
        <BackButton to='/settings/billing/subscriptions'>
          <Trans>
            Go back to My Subscriptions
          </Trans>
        </BackButton>
        <QueryErrorBoundary loadQuery={() => loadQuery({ reference: match.reference as string })}>
          <Suspense fallback={<SkeletonStack />}>
            <AccountClubSupporterSubscriptionSettings
              query={queryRef as PreloadedQuery<AccountClubSupporterSubscriptionSettingsQueryType>}
            />
          </Suspense>
        </QueryErrorBoundary>
      </PageWrapper>
    </>
  )
}
