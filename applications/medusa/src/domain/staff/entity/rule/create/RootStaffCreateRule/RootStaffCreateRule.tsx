import { PageSectionTitle, PageWrapper } from '@//:modules/content/PageLayout'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { Suspense } from 'react'
import SkeletonStack from '@//:modules/content/Placeholder/Loading/SkeletonStack/SkeletonStack'
import { PreloadedQuery, useQueryLoader } from 'react-relay/hooks'
import StaffCreateRuleQuery, {
  StaffCreateRuleQuery as StaffCreateRuleQueryType
} from '@//:artifacts/StaffCreateRuleQuery.graphql'
import StaffCreateRule from './StaffCreateRule/StaffCreateRule'
import { Trans } from '@lingui/macro'
import Head from 'next/head'
import { PageProps } from '@//:types/app'

interface Props {
  queryRefs: {
    staffCreateRuleQuery: PreloadedQuery<StaffCreateRuleQueryType>
  }
}

const RootStaffCreateRule: PageProps<Props> = (props: Props) => {
  const [queryRef, loadQuery] = useQueryLoader(
    StaffCreateRuleQuery,
    props.queryRefs.staffCreateRuleQuery
  )

  return (
    <>
      <Head>
        <title>
          Create Rule - Staff · overdoll.com
        </title>
      </Head>
      <PageWrapper>
        <PageSectionTitle>
          <Trans>
            Create Rule
          </Trans>
        </PageSectionTitle>
        <QueryErrorBoundary loadQuery={() => loadQuery({})}>
          <Suspense fallback={<SkeletonStack />}>
            <StaffCreateRule
              query={queryRef as PreloadedQuery<StaffCreateRuleQueryType>}
            />
          </Suspense>
        </QueryErrorBoundary>
      </PageWrapper>
    </>
  )
}

export default RootStaffCreateRule
