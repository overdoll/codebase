import type { PreloadedQuery } from 'react-relay/hooks'
import { useQueryLoader } from 'react-relay/hooks'
import type { PayoutsSettingsQuery as PayoutsSettingsQueryType } from '@//:artifacts/PayoutsSettingsQuery.graphql'
import PayoutsSettingsQuery from '@//:artifacts/PayoutsSettingsQuery.graphql'
import { PageSectionTitle, PageSectionWrap, PageWrapper } from '@//:modules/content/PageLayout'
import Head from 'next/head'
import { PageProps } from '@//:types/app'
import PayoutsSettings from './PayoutsSettings/PayoutsSettings'
import SkeletonStack from '../../../../../modules/content/Placeholder/Loading/SkeletonStack/SkeletonStack'
import { Suspense } from 'react'
import { QueryErrorBoundary } from '@//:modules/content/Placeholder'
import { Trans } from '@lingui/macro'

interface Props {
  queryRefs: {
    payoutsSettingsQuery: PreloadedQuery<PayoutsSettingsQueryType>
  }
}

const RootSecuritySettings: PageProps<Props> = (props: Props) => {
  const [queryRef, loadQuery] = useQueryLoader(
    PayoutsSettingsQuery,
    props.queryRefs.payoutsSettingsQuery
  )

  return (
    <>
      <Head>
        <title>
          Payouts - overdoll
        </title>
      </Head>
      <PageWrapper>
        <PageSectionWrap>
          <PageSectionTitle>
            <Trans>
              Payouts Settings
            </Trans>
          </PageSectionTitle>
        </PageSectionWrap>
        <QueryErrorBoundary loadQuery={() => loadQuery({})}>
          <Suspense fallback={<SkeletonStack />}>
            <PayoutsSettings query={queryRef as PreloadedQuery<PayoutsSettingsQueryType>} />
          </Suspense>
        </QueryErrorBoundary>
      </PageWrapper>
    </>
  )
}

export default RootSecuritySettings
