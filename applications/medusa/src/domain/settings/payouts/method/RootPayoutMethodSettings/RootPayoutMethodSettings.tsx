import type { PreloadedQuery } from 'react-relay/hooks'
import { useQueryLoader } from 'react-relay/hooks'
import type {
  PayoutMethodSettingsQuery as PayoutMethodSettingsQueryType
} from '@//:artifacts/PayoutMethodSettingsQuery.graphql'
import PayoutMethodSettingsQuery from '@//:artifacts/PayoutMethodSettingsQuery.graphql'
import { PageSectionDescription, PageSectionTitle, PageSectionWrap, PageWrapper } from '@//:modules/content/PageLayout'
import Head from 'next/head'
import { PageProps } from '@//:types/app'
import PayoutMethodSettings from './PayoutMethodSettings/PayoutMethodSettings'
import SkeletonStack from '../../../../../modules/content/Placeholder/Loading/SkeletonStack/SkeletonStack'
import { Suspense } from 'react'
import { QueryErrorBoundary } from '@//:modules/content/Placeholder'
import { Trans } from '@lingui/macro'
import BackButton from '@//:modules/content/PageLayout/BuildingBlocks/BackButton/BackButton'

interface Props {
  queryRefs: {
    payoutMethodSettingsQuery: PreloadedQuery<PayoutMethodSettingsQueryType>
  }
}

const RootPayoutMethodSettings: PageProps<Props> = (props: Props) => {
  const [queryRef, loadQuery] = useQueryLoader(
    PayoutMethodSettingsQuery,
    props.queryRefs.payoutMethodSettingsQuery
  )

  return (
    <>
      <Head>
        <title>
          Payout Method - Settings :: overdoll.com
        </title>
      </Head>
      <PageWrapper>
        <BackButton href='/settings/payouts'>
          <Trans>
            Back to Payouts Settings
          </Trans>
        </BackButton>
        <PageSectionWrap>
          <PageSectionTitle>
            <Trans>
              Payout Method
            </Trans>
          </PageSectionTitle>
          <PageSectionDescription>
            Select a payout method that works best for you.
          </PageSectionDescription>
        </PageSectionWrap>
        <QueryErrorBoundary loadQuery={() => loadQuery({})}>
          <Suspense fallback={<SkeletonStack />}>
            <PayoutMethodSettings query={queryRef as PreloadedQuery<PayoutMethodSettingsQueryType>} />
          </Suspense>
        </QueryErrorBoundary>
      </PageWrapper>
    </>
  )
}

export default RootPayoutMethodSettings
