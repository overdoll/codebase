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
import { PageProps } from '@//:types/app'

interface Props {
  queryRefs: {
    staffCreateAudienceQuery: PreloadedQuery<StaffCreateAudienceQueryType>
  }
}

const RootStaffCreateAudience: PageProps<Props> = (props: Props) => {
  const [queryRef, loadQuery] = useQueryLoader(
    StaffCreateAudienceQuery,
    props.queryRefs.staffCreateAudienceQuery
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

export default RootStaffCreateAudience
