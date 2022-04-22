import { Suspense } from 'react'
import SkeletonStack from '@//:modules/content/Placeholder/Loading/SkeletonStack/SkeletonStack'
import MultiFactorTotpSetup from './MultiFactorTotpHeader/MultiFactorTotpHeader'
import { PreloadedQuery, useQueryLoader } from 'react-relay/hooks'
import type {
  MultiFactorTotpHeaderQuery as MultiFactorTotpHeaderQueryType
} from '@//:artifacts/MultiFactorTotpHeaderQuery.graphql'
import MultiFactorTotpHeaderQuery from '@//:artifacts/MultiFactorTotpHeaderQuery.graphql'
import { PageSectionDescription, PageSectionTitle, PageSectionWrap, PageWrapper } from '@//:modules/content/PageLayout'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { Trans } from '@lingui/macro'
import BackButton from '@//:modules/content/PageLayout/BuildingBlocks/BackButton/BackButton'
import Head from 'next/head'
import { PageProps } from '@//:types/app'

interface Props {
  queryRefs: {
    totpQuery: PreloadedQuery<MultiFactorTotpHeaderQueryType>
  }
}

const RootMultiFactorTotpSetup: PageProps<Props> = (props: Props) => {
  const [queryRef, loadQuery] = useQueryLoader(
    MultiFactorTotpHeaderQuery,
    props.queryRefs.totpQuery
  )

  return (
    <>
      <Head>
        <title>
          Authenticator Setup - Security - Settings :: overdoll.com
        </title>
      </Head>
      <PageWrapper>
        <BackButton href='/settings/security'>
          <Trans>
            Back to Security Settings
          </Trans>
        </BackButton>
        <PageSectionWrap>
          <PageSectionTitle colorScheme='green'>
            <Trans>
              Set up two-factor authentication
            </Trans>
          </PageSectionTitle>
          <PageSectionDescription>
            <Trans>
              Improve the security of your account in three easy steps by enabling two-factor authentication.
            </Trans>
          </PageSectionDescription>
        </PageSectionWrap>
        <QueryErrorBoundary loadQuery={() => loadQuery({})}>
          <Suspense fallback={<SkeletonStack />}>
            <MultiFactorTotpSetup query={queryRef as PreloadedQuery<MultiFactorTotpHeaderQueryType>} />
          </Suspense>
        </QueryErrorBoundary>
      </PageWrapper>
    </>
  )
}

export default RootMultiFactorTotpSetup
