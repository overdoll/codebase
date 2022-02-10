import { Helmet } from 'react-helmet-async'
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
import ConfigureBackButton from '../../../../../../../../modules/content/PageLayout/BuildingBlocks/ConfigureBackButton/ConfigureBackButton'

interface Props {
  prepared: {
    totpQuery: PreloadedQuery<MultiFactorTotpHeaderQueryType>
  }
}

export default function RootMultiFactorTotpSetup (props: Props): JSX.Element | null {
  const [queryRef, loadQuery] = useQueryLoader(
    MultiFactorTotpHeaderQuery,
    props.prepared.totpQuery
  )

  return (
    <>
      <Helmet title='authenticator setup' />
      <PageWrapper>
        <ConfigureBackButton to='/settings/security' />
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
