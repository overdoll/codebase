import { PageSectionTitle, PageWrapper } from '@//:modules/content/PageLayout'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { Suspense } from 'react'
import SkeletonStack from '@//:modules/content/Placeholder/Loading/SkeletonStack/SkeletonStack'
import { PreloadedQuery, useQueryLoader } from 'react-relay/hooks'
import StaffCreateSeriesQuery, {
  StaffCreateSeriesQuery as StaffCreateSeriesQueryType
} from '@//:artifacts/StaffCreateSeriesQuery.graphql'
import StaffCreateSeries from './StaffCreateSeries/StaffCreateSeries'
import { Trans } from '@lingui/macro'
import Head from 'next/head'
import { PageProps } from '@//:types/app'

interface Props {
  queryRefs: {
    staffCreateSeriesQuery: PreloadedQuery<StaffCreateSeriesQueryType>
  }
}

const RootStaffCreateSeries: PageProps<Props> = (props: Props) => {
  const [queryRef, loadQuery] = useQueryLoader(
    StaffCreateSeriesQuery,
    props.queryRefs.staffCreateSeriesQuery
  )

  return (
    <>
      <Head>
        <title>
          Create Series - Staff · overdoll.com
        </title>
      </Head>
      <PageWrapper>
        <PageSectionTitle>
          <Trans>
            Create Series
          </Trans>
        </PageSectionTitle>
        <QueryErrorBoundary loadQuery={() => loadQuery({})}>
          <Suspense fallback={<SkeletonStack />}>
            <StaffCreateSeries
              query={queryRef as PreloadedQuery<StaffCreateSeriesQueryType>}
            />
          </Suspense>
        </QueryErrorBoundary>
      </PageWrapper>
    </>
  )
}

export default RootStaffCreateSeries
