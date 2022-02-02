import { Helmet } from 'react-helmet-async'
import { Suspense } from 'react'
import SkeletonStack from '@//:modules/content/Placeholder/Skeleton/SkeletonStack/SkeletonStack'
import { PreloadedQuery, useQueryLoader } from 'react-relay/hooks'
import type {
  RecoveryCodesSetupQuery as RecoveryCodesSetupQueryType
} from '@//:artifacts/RecoveryCodesSetupQuery.graphql'
import RecoveryCodesSetupQuery from '@//:artifacts/RecoveryCodesSetupQuery.graphql'
import { PageSectionDescription, PageSectionTitle, PageSectionWrap, PageWrapper } from '@//:modules/content/PageLayout'
import RecoveryCodesSetup from './RecoveryCodesSetup/RecoveryCodesSetup'
import QueryErrorBoundary from '@//:modules/relay/QueryErrorBoundary/QueryErrorBoundary'
import { Trans } from '@lingui/macro'
import ConfigureBackButton from '../../../../../../../../modules/content/PageLayout/BuildingBlocks/ConfigureBackButton/ConfigureBackButton'

interface Props {
  prepared: {
    recoveryCodesQuery: PreloadedQuery<RecoveryCodesSetupQueryType>
  }
}

export default function RootRecoveryCodesSetup (props: Props): JSX.Element | null {
  const [queryRef, loadQuery] = useQueryLoader(
    RecoveryCodesSetupQuery,
    props.prepared.recoveryCodesQuery
  )

  return (
    <>
      <Helmet title='recovery setup' />
      <PageWrapper>
        <ConfigureBackButton to='/settings/security' />
        <PageSectionWrap>
          <PageSectionTitle colorScheme='teal'>
            <Trans>
              Set up recovery codes
            </Trans>
          </PageSectionTitle>
          <PageSectionDescription>
            <Trans>
              In the event that you lose access to your device and cannot use the two-factor authentication codes, you
              can use a recovery code to gain access to your account.
            </Trans>
          </PageSectionDescription>
        </PageSectionWrap>
        <QueryErrorBoundary loadQuery={() => loadQuery({})}>
          <Suspense fallback={<SkeletonStack />}>
            <RecoveryCodesSetup query={queryRef as PreloadedQuery<RecoveryCodesSetupQueryType>} />
          </Suspense>
        </QueryErrorBoundary>
      </PageWrapper>
    </>
  )
}
