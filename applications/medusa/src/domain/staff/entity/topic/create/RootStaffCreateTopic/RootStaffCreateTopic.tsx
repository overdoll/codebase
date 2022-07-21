import { PageSectionTitle, PageWrapper } from '@//:modules/content/PageLayout'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { Suspense } from 'react'
import SkeletonStack from '@//:modules/content/Placeholder/Loading/SkeletonStack/SkeletonStack'
import { PreloadedQuery, useQueryLoader } from 'react-relay/hooks'
import StaffCreateTopicQuery, {
  StaffCreateTopicQuery as StaffCreateTopicQueryType
} from '@//:artifacts/StaffCreateTopicQuery.graphql'
import StaffCreateTopic from './StaffCreateTopic/StaffCreateTopic'
import { Trans } from '@lingui/macro'
import Head from 'next/head'
import { PageProps } from '@//:types/app'

interface Props {
  queryRefs: {
    staffCreateTopicQuery: PreloadedQuery<StaffCreateTopicQueryType>
  }
}

const RootStaffCreateTopic: PageProps<Props> = (props: Props) => {
  const [queryRef, loadQuery] = useQueryLoader(
    StaffCreateTopicQuery,
    props.queryRefs.staffCreateTopicQuery
  )

  return (
    <>
      <Head>
        <title>
          Create Topic - Staff · overdoll.com
        </title>
      </Head>
      <PageWrapper>
        <PageSectionTitle>
          <Trans>
            Create Topic
          </Trans>
        </PageSectionTitle>
        <QueryErrorBoundary loadQuery={() => loadQuery({})}>
          <Suspense fallback={<SkeletonStack />}>
            <StaffCreateTopic
              query={queryRef as PreloadedQuery<StaffCreateTopicQueryType>}
            />
          </Suspense>
        </QueryErrorBoundary>
      </PageWrapper>
    </>
  )
}

export default RootStaffCreateTopic
