import type { PreloadedQuery } from 'react-relay/hooks'
import { useQueryLoader } from 'react-relay/hooks'
import type { CurationSettingsQuery as CurationSettingsQueryType } from '@//:artifacts/CurationSettingsQuery.graphql'
import CurationSettingsQuery from '@//:artifacts/CurationSettingsQuery.graphql'
import SkeletonStack from '@//:modules/content/Placeholder/Loading/SkeletonStack/SkeletonStack'
import { Suspense } from 'react'
import { PageSectionDescription, PageSectionTitle, PageSectionWrap, PageWrapper } from '@//:modules/content/PageLayout'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { Trans } from '@lingui/macro'
import CurationSettings from './CurationSettings/CurationSettings'
import Head from 'next/head'
import { PageProps } from '@//:types/app'

interface Props {
  queryRefs: {
    curationQuery: PreloadedQuery<CurationSettingsQueryType>
  }
}

const RootCurationSettings: PageProps<Props> = (props: Props) => {
  const [queryRef, loadQuery] = useQueryLoader(
    CurationSettingsQuery,
    props.queryRefs.curationQuery
  )

  return (
    <>
      <Head>
        <title>
          Preference Settings - overdoll
        </title>
      </Head>
      <PageWrapper>
        <PageSectionWrap>
          <PageSectionTitle>
            <Trans>
              Content Curation
            </Trans>
          </PageSectionTitle>
          <PageSectionDescription>
            When you create your account, you'll have the ability to go through a curation flow to let us know what kind
            of content you'd like to see.
          </PageSectionDescription>
        </PageSectionWrap>
        <QueryErrorBoundary loadQuery={() => loadQuery({})}>
          <Suspense fallback={<SkeletonStack />}>
            <CurationSettings query={queryRef as PreloadedQuery<CurationSettingsQueryType>} />
          </Suspense>
        </QueryErrorBoundary>
      </PageWrapper>
    </>
  )
}

export default RootCurationSettings
