import type { PreloadedQuery } from 'react-relay/hooks'
import { useQueryLoader } from 'react-relay/hooks'
import type {
  SubscriptionSettingsQuery as SubscriptionSettingsQueryType
} from '@//:artifacts/SubscriptionSettingsQuery.graphql'
import SubscriptionSettingsQuery from '@//:artifacts/SubscriptionSettingsQuery.graphql'
import SkeletonStack from '@//:modules/content/Placeholder/Loading/SkeletonStack/SkeletonStack'
import { Suspense } from 'react'
import { PageSectionDescription, PageSectionTitle, PageSectionWrap, PageWrapper } from '@//:modules/content/PageLayout'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { Trans } from '@lingui/macro'
import SubscriptionSettings from './SubscriptionSettings/SubscriptionSettings'
import { Helmet } from 'react-helmet-async'
import ConfigureBackButton
  from '../../../../../modules/content/PageLayout/BuildingBlocks/ConfigureBackButton/ConfigureBackButton'

interface Props {
  prepared: {
    subscriptionsQuery: PreloadedQuery<SubscriptionSettingsQueryType>
  }
}

export default function RootSubscriptionSettings (props: Props): JSX.Element | null {
  const [queryRef, loadQuery] = useQueryLoader(
    SubscriptionSettingsQuery,
    props.prepared.subscriptionsQuery
  )

  return (
    <>
      <Helmet title='my subscriptions' />
      <PageWrapper>
        <ConfigureBackButton to='/settings/billing'>
          <Trans>
            Go back to billing
          </Trans>
        </ConfigureBackButton>
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
            <SubscriptionSettings query={queryRef as PreloadedQuery<SubscriptionSettingsQueryType>} />
          </Suspense>
        </QueryErrorBoundary>
      </PageWrapper>
    </>
  )
}
