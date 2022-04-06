import { Helmet } from 'react-helmet-async'
import { Suspense } from 'react'
import SkeletonStack from '@//:modules/content/Placeholder/Loading/SkeletonStack/SkeletonStack'
import { PreloadedQuery, useQueryLoader } from 'react-relay/hooks'
import type {
  CurationProfileSetupQuery as CurationProfileSetupQueryType
} from '@//:artifacts/CurationProfileSetupQuery.graphql'
import CurationProfileSetupQuery from '@//:artifacts/CurationProfileSetupQuery.graphql'
import { PageSectionDescription, PageSectionTitle, PageSectionWrap, PageWrapper } from '@//:modules/content/PageLayout'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { Trans } from '@lingui/macro'
import CurationProfileSetup from './CurationProfileSetup/CurationProfileSetup'
import BackButton from '@//:modules/content/PageLayout/BuildingBlocks/BackButton/BackButton'

interface Props {
  prepared: {
    curationQuery: PreloadedQuery<CurationProfileSetupQueryType>
  }
}

export default function RootMultiFactorTotpSetup (props: Props): JSX.Element | null {
  const [queryRef, loadQuery] = useQueryLoader(
    CurationProfileSetupQuery,
    props.prepared.curationQuery
  )

  return (
    <>
      <Helmet>
        <title>
          Curation Profile - Preferences - Settings :: overdoll.com
        </title>
      </Helmet>
      <PageWrapper>
        <BackButton to='/settings/billing'>
          <Trans>
            Back to settings
          </Trans>
        </BackButton>
        <PageSectionWrap>
          <PageSectionTitle colorScheme='orange'>
            <Trans>
              Set up curation profile
            </Trans>
          </PageSectionTitle>
          <PageSectionDescription>
            <Trans>
              Tell us the type of content you want to see
            </Trans>
          </PageSectionDescription>
        </PageSectionWrap>
        <QueryErrorBoundary loadQuery={() => loadQuery({})}>
          <Suspense fallback={<SkeletonStack />}>
            <CurationProfileSetup query={queryRef as PreloadedQuery<CurationProfileSetupQueryType>} />
          </Suspense>
        </QueryErrorBoundary>
      </PageWrapper>
    </>
  )
}
