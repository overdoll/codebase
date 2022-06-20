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
import { PageProps } from '@//:types/app'
import Head from 'next/head'

interface Props {
  queryRefs: {
    curationQuery: PreloadedQuery<CurationProfileSetupQueryType>
  }
}

const RootMultiFactorTotpSetup: PageProps<Props> = (props: Props) => {
  const [queryRef, loadQuery] = useQueryLoader(
    CurationProfileSetupQuery,
    props.queryRefs.curationQuery
  )

  return (
    <>
      <Head>
        <title>
          Curation Profile - overdoll
        </title>
      </Head>
      <PageWrapper>
        <BackButton href='/settings/preferences'>
          <Trans>
            Back to Preference Settings
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

export default RootMultiFactorTotpSetup
