import type { PreloadedQuery } from 'react-relay/hooks'
import { useQueryLoader } from 'react-relay/hooks'
import type {
  TransactionsSettingsQuery as TransactionsSettingsQueryType
} from '@//:artifacts/TransactionsSettingsQuery.graphql'
import TransactionsSettingsQuery from '@//:artifacts/TransactionsSettingsQuery.graphql'
import SkeletonStack from '@//:modules/content/Placeholder/Loading/SkeletonStack/SkeletonStack'
import { Suspense } from 'react'
import { PageSectionDescription, PageSectionTitle, PageSectionWrap, PageWrapper } from '@//:modules/content/PageLayout'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { Trans } from '@lingui/macro'
import { Helmet } from 'react-helmet-async'
import BackButton from '@//:modules/content/PageLayout/BuildingBlocks/BackButton/BackButton'
import TransactionsSettings from './TransactionsSettings/TransactionsSettings'
import HighlightInline from '../../../../../components/ContentHints/HighlightInline/HighlightInline'
import LockedAccountAlert from '../../../../../components/LockedAccount/LockedAccountAlert/LockedAccountAlert'

interface Props {
  prepared: {
    query: PreloadedQuery<TransactionsSettingsQueryType>
  }
}

export default function RootSubscriptionsSettings (props: Props): JSX.Element | null {
  const [queryRef, loadQuery] = useQueryLoader(
    TransactionsSettingsQuery,
    props.prepared.query
  )

  return (
    <>
      <Helmet>
        <title>
          Transaction History - Billing - Settings :: overdoll.com
        </title>
      </Helmet>
      <PageWrapper>
        <BackButton to='/settings/billing'>
          <Trans>
            Go back to billing
          </Trans>
        </BackButton>
        <PageSectionWrap>
          <PageSectionTitle colorScheme='purple'>
            <Trans>
              Transaction History
            </Trans>
          </PageSectionTitle>
          <PageSectionDescription>
            <Trans>
              A list of charges that occurred for your club supporter subscriptions.{' '}
              <HighlightInline color='purple.200'>CCBill.com
                *overdoll Inc.
              </HighlightInline> will appear on your Cardholder
              statement.
            </Trans>
          </PageSectionDescription>
        </PageSectionWrap>
        <QueryErrorBoundary loadQuery={() => loadQuery({})}>
          <Suspense fallback={<SkeletonStack />}>
            <TransactionsSettings query={queryRef as PreloadedQuery<TransactionsSettingsQueryType>} />
          </Suspense>
        </QueryErrorBoundary>
      </PageWrapper>
    </>
  )
}
