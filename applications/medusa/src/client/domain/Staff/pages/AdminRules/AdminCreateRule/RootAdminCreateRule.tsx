import { Helmet } from 'react-helmet-async'
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

interface Props {
  prepared: {
    query: PreloadedQuery<StaffCreateRuleQueryType>
  }
}

export default function RootStaffCreateRule (props: Props): JSX.Element {
  const [queryRef, loadQuery] = useQueryLoader(
    StaffCreateRuleQuery,
    props.prepared.query
  )

  return (
    <>
      <Helmet title='create rule' />
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
