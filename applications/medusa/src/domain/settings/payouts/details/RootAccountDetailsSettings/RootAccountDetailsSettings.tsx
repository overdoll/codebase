import type { PreloadedQuery } from 'react-relay/hooks'
import { useQueryLoader } from 'react-relay/hooks'
import type {
  AccountDetailsSettingsQuery as AccountDetailsSettingsQueryType
} from '@//:artifacts/AccountDetailsSettingsQuery.graphql'
import AccountDetailsSettingsQuery from '@//:artifacts/AccountDetailsSettingsQuery.graphql'
import { PageSectionDescription, PageSectionTitle, PageSectionWrap, PageWrapper } from '@//:modules/content/PageLayout'
import Head from 'next/head'
import { PageProps } from '@//:types/app'
import AccountDetailsSettings from './AccountDetailsSettings/AccountDetailsSettings'
import SkeletonStack from '../../../../../modules/content/Placeholder/Loading/SkeletonStack/SkeletonStack'
import { Suspense } from 'react'
import { QueryErrorBoundary } from '@//:modules/content/Placeholder'
import { Trans } from '@lingui/macro'
import BackButton from '@//:modules/content/PageLayout/BuildingBlocks/BackButton/BackButton'

interface Props {
  queryRefs: {
    accountDetailsSettingsQuery: PreloadedQuery<AccountDetailsSettingsQueryType>
  }
}

const RootAccountDetailsSettings: PageProps<Props> = (props: Props) => {
  const [queryRef, loadQuery] = useQueryLoader(
    AccountDetailsSettingsQuery,
    props.queryRefs.accountDetailsSettingsQuery
  )

  return (
    <>
      <Head>
        <title>
          Payout Details - overdoll
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
              Payout Details
            </Trans>
          </PageSectionTitle>
          <PageSectionDescription>
            Enter your personal information. This information will be kept confidential.
          </PageSectionDescription>
        </PageSectionWrap>
        <QueryErrorBoundary loadQuery={() => loadQuery({})}>
          <Suspense fallback={<SkeletonStack />}>
            <AccountDetailsSettings query={queryRef as PreloadedQuery<AccountDetailsSettingsQueryType>} />
          </Suspense>
        </QueryErrorBoundary>
      </PageWrapper>
    </>
  )
}

export default RootAccountDetailsSettings
