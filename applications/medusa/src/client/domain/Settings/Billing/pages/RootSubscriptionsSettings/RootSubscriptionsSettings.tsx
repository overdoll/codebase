import type { PreloadedQuery } from 'react-relay/hooks'
import { useQueryLoader } from 'react-relay/hooks'
import type {
  SubscriptionsSettingsQuery as SubscriptionsSettingsQueryType
} from '@//:artifacts/SubscriptionsSettingsQuery.graphql'
import SubscriptionsSettingsQuery from '@//:artifacts/SubscriptionsSettingsQuery.graphql'
import SkeletonStack from '@//:modules/content/Placeholder/Loading/SkeletonStack/SkeletonStack'
import { Suspense } from 'react'
import { PageSectionDescription, PageSectionTitle, PageSectionWrap, PageWrapper } from '@//:modules/content/PageLayout'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { Trans } from '@lingui/macro'
import { Helmet } from 'react-helmet-async'
import SubscriptionsSettings from './SubscriptionsSettings/SubscriptionsSettings'
import BackButton from '@//:modules/content/PageLayout/BuildingBlocks/BackButton/BackButton'

interface Props {
  prepared: {
    subscriptionsQuery: PreloadedQuery<SubscriptionsSettingsQueryType>
  }
}

export default function RootSubscriptionsSettings (props: Props): JSX.Element | null {
  const [queryRef, loadQuery] = useQueryLoader(
    SubscriptionsSettingsQuery,
    props.prepared.subscriptionsQuery
  )

  return (
    <>
      <Helmet>
        <title>
          My Subscriptions - Billing - Settings :: overdoll.com
        </title>
      </Helmet>
      <PageWrapper>
        <BackButton to='/settings/billing'>
          <Trans>
            Go back to billing
          </Trans>
        </BackButton>
        <PageSectionWrap>
          <PageSectionTitle colorScheme='green'>
            <Trans>
              My Subscriptions
            </Trans>
          </PageSectionTitle>
          <PageSectionDescription>
            <Trans>
              All of the clubs where you are a paid supporter and you have access to exclusive content.
            </Trans>
          </PageSectionDescription>
        </PageSectionWrap>
        <QueryErrorBoundary loadQuery={() => loadQuery({})}>
          <Suspense fallback={<SkeletonStack />}>
            <SubscriptionsSettings query={queryRef as PreloadedQuery<SubscriptionsSettingsQueryType>} />
          </Suspense>
        </QueryErrorBoundary>
      </PageWrapper>
    </>
  )
}
