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
import BackButton from '@//:modules/content/PageLayout/BuildingBlocks/BackButton/BackButton'
import TransactionsSettings from './TransactionsSettings/TransactionsSettings'
import HighlightInline from '@//:modules/content/ContentHints/HighlightInline/HighlightInline'
import { PageProps } from '@//:types/app'
import Head from 'next/head'

interface Props {
  queryRefs: {
    transactionsQuery: PreloadedQuery<TransactionsSettingsQueryType>
  }
}

const RootSubscriptionsSettings: PageProps<Props> = (props: Props) => {
  const [queryRef, loadQuery] = useQueryLoader(
    TransactionsSettingsQuery,
    props.queryRefs.transactionsQuery
  )

  return (
    <>
      <Head>
        <title>
          Transaction History - overdoll
        </title>
      </Head>
      <PageWrapper>
        <BackButton href='/settings/billing'>
          <Trans>
            Go back to Billing Settings
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
                *overdoll Inc
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

export default RootSubscriptionsSettings
