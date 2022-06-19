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
import SubscriptionsSettings from './SubscriptionsSettings/SubscriptionsSettings'
import BackButton from '@//:modules/content/PageLayout/BuildingBlocks/BackButton/BackButton'
import { PageProps } from '@//:types/app'
import Head from 'next/head'

interface Props {
  queryRefs: {
    subscriptionsQuery: PreloadedQuery<SubscriptionsSettingsQueryType>
  }
}

const RootSubscriptionsSettings: PageProps<Props> = (props: Props) => {
  const [queryRef, loadQuery] = useQueryLoader(
    SubscriptionsSettingsQuery,
    props.queryRefs.subscriptionsQuery
  )

  return (
    <>
      <Head>
        <title>
          My Subscriptions - overdoll
        </title>
      </Head>
      <PageWrapper>
        <BackButton href='/settings/billing'>
          <Trans>
            Go back to Billing Settings
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

export default RootSubscriptionsSettings
