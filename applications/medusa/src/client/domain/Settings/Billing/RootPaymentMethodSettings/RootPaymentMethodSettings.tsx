import type { PreloadedQuery } from 'react-relay/hooks'
import { useQueryLoader } from 'react-relay/hooks'
import type {
  PaymentMethodSettingsQuery as PaymentMethodSettingsQueryType
} from '@//:artifacts/PaymentMethodSettingsQuery.graphql'
import PaymentMethodSettingsQuery from '@//:artifacts/PaymentMethodSettingsQuery.graphql'
import SkeletonStack from '@//:modules/content/Placeholder/Loading/SkeletonStack/SkeletonStack'
import { Suspense } from 'react'
import { PageSectionDescription, PageSectionTitle, PageSectionWrap, PageWrapper } from '@//:modules/content/PageLayout'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { Trans } from '@lingui/macro'
import { Helmet } from 'react-helmet-async'
import PaymentMethodSettings from './PaymentMethodSettings/PaymentMethodSettings'

interface Props {
  prepared: {
    paymentMethodsQuery: PreloadedQuery<PaymentMethodSettingsQueryType>
  }
}

export default function RootPaymentMethodSettings (props: Props): JSX.Element | null {
  const [queryRef, loadQuery] = useQueryLoader(
    PaymentMethodSettingsQuery,
    props.prepared.paymentMethodsQuery
  )

  return (
    <>
      <Helmet title='payment methods' />
      <PageWrapper>
        <PageSectionWrap>
          <PageSectionTitle colorScheme='teal'>
            <Trans>
              Payment Methods
            </Trans>
          </PageSectionTitle>
          <PageSectionDescription>
            <Trans>
              When you become a club supporter, you'll have the option to remember the payment method for next time.
            </Trans>
          </PageSectionDescription>
        </PageSectionWrap>
        <QueryErrorBoundary loadQuery={() => loadQuery({})}>
          <Suspense fallback={<SkeletonStack />}>
            <PaymentMethodSettings query={queryRef as PreloadedQuery<PaymentMethodSettingsQueryType>} />
          </Suspense>
        </QueryErrorBoundary>
      </PageWrapper>
    </>
  )
}
