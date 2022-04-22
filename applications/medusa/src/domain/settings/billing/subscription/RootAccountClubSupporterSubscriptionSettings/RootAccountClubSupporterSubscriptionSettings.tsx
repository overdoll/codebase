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
import BackButton from '@//:modules/content/PageLayout/BuildingBlocks/BackButton/BackButton'
import AccountClubSupporterSubscriptionSettings
  from './AccountClubSupporterSubscriptionSettings/AccountClubSupporterSubscriptionSettings'
import { PageProps } from '@//:types/app'
import { useRouter } from 'next/router'
import Head from 'next/head'

interface Props {
  queryRefs: {
    subscriptionQuery: PreloadedQuery<AccountClubSupporterSubscriptionSettingsQueryType>
  }
}

const RootAccountClubSupporterSubscriptionSettings: PageProps<Props> = (props: Props) => {
  const [queryRef, loadQuery] = useQueryLoader(
    AccountClubSupporterSubscriptionSettingsQuery,
    props.queryRefs.subscriptionQuery
  )

  const { query } = useRouter()

  return (
    <>
      <Head>
        <title>
          Subscription - Billing - Settings :: overdoll.com
        </title>
      </Head>
      <PageWrapper>
        <BackButton href='/settings/billing/subscriptions'>
          <Trans>
            Go back to My Subscriptions
          </Trans>
        </BackButton>
        <QueryErrorBoundary loadQuery={() => loadQuery({ reference: query.reference as string })}>
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

export default RootAccountClubSupporterSubscriptionSettings
