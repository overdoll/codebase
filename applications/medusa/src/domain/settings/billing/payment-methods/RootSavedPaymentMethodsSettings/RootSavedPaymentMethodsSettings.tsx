import type { PreloadedQuery } from 'react-relay/hooks'
import { useQueryLoader } from 'react-relay/hooks'
import type {
  SavedPaymentMethodsSettingsQuery as SavedPaymentMethodsSettingsQueryType
} from '@//:artifacts/SavedPaymentMethodsSettingsQuery.graphql'
import SavedPaymentMethodsSettingsQuery from '@//:artifacts/SavedPaymentMethodsSettingsQuery.graphql'
import SkeletonStack from '@//:modules/content/Placeholder/Loading/SkeletonStack/SkeletonStack'
import { Suspense } from 'react'
import { PageSectionDescription, PageSectionTitle, PageSectionWrap, PageWrapper } from '@//:modules/content/PageLayout'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { Trans } from '@lingui/macro'
import SavedPaymentMethodsSettings from './SavedPaymentMethodsSettings/SavedPaymentMethodsSettings'
import BackButton from '@//:modules/content/PageLayout/BuildingBlocks/BackButton/BackButton'
import { PageProps } from '@//:types/app'
import Head from 'next/head'

interface Props {
  queryRefs: {
    paymentMethodsQuery: PreloadedQuery<SavedPaymentMethodsSettingsQueryType>
  }
}

const RootSavedPaymentMethodsSettings: PageProps<Props> = (props: Props) => {
  const [queryRef, loadQuery] = useQueryLoader(
    SavedPaymentMethodsSettingsQuery,
    props.queryRefs.paymentMethodsQuery
  )

  return (
    <>
      <Head>
        <title>
          Saved Payment Methods - Billing - Settings :: overdoll.com
        </title>
      </Head>
      <PageWrapper>
        <BackButton href='/settings/billing'>
          <Trans>
            Go back to Billing Settings
          </Trans>
        </BackButton>
        <PageSectionWrap>
          <PageSectionTitle colorScheme='teal'>
            <Trans>
              Payment Methods
            </Trans>
          </PageSectionTitle>
          <PageSectionDescription>
            <Trans>
              When you become a club supporter, you'll have the option to remember the payment method for next time.
              Note that you can only modify a payment method through the My Subscriptions page.
            </Trans>
          </PageSectionDescription>
        </PageSectionWrap>
        <QueryErrorBoundary loadQuery={() => loadQuery({})}>
          <Suspense fallback={<SkeletonStack />}>
            <SavedPaymentMethodsSettings query={queryRef as PreloadedQuery<SavedPaymentMethodsSettingsQueryType>} />
          </Suspense>
        </QueryErrorBoundary>
      </PageWrapper>
    </>
  )
}

export default RootSavedPaymentMethodsSettings
