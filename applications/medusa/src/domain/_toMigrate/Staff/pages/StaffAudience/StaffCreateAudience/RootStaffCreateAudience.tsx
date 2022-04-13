import { Helmet } from 'react-helmet-async'
import { PageSectionTitle, PageWrapper } from '@//:modules/content/PageLayout'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { Suspense } from 'react'
import SkeletonStack from '@//:modules/content/Placeholder/Loading/SkeletonStack/SkeletonStack'
import { PreloadedQuery, useQueryLoader } from 'react-relay/hooks'
import StaffCreateAudienceQuery, {
  StaffCreateAudienceQuery as StaffCreateAudienceQueryType
} from '@//:artifacts/StaffCreateAudienceQuery.graphql'
import StaffCreateAudience from './StaffCreateAudience/StaffCreateAudience'
import { Trans } from '@lingui/macro'
import Head from 'next/head'

interface Props {
  prepared: {
    query: PreloadedQuery<StaffCreateAudienceQueryType>
  }
}

export default function RootStaffCreateAudience (props: Props): JSX.Element {
  const [queryRef, loadQuery] = useQueryLoader(
    StaffCreateAudienceQuery,
    props.prepared.query
  )

  return (
    <>
      <Head>
        <title>
          Create Audience - Staff :: overdoll.com
        </title>
      </Head>
      <PageWrapper>
        <PageSectionTitle>
          <Trans>
            Create Audience
          </Trans>
        </PageSectionTitle>
        <QueryErrorBoundary loadQuery={() => loadQuery({})}>
          <Suspense fallback={<SkeletonStack />}>
            <StaffCreateAudience
              query={queryRef as PreloadedQuery<StaffCreateAudienceQueryType>}
            />
          </Suspense>
        </QueryErrorBoundary>
      </PageWrapper>
    </>
  )
}
