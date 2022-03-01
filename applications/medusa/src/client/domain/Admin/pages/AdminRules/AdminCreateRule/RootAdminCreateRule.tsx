import { Helmet } from 'react-helmet-async'
import { PageSectionTitle, PageWrapper } from '@//:modules/content/PageLayout'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { Suspense } from 'react'
import SkeletonStack from '@//:modules/content/Placeholder/Loading/SkeletonStack/SkeletonStack'
import { PreloadedQuery, useQueryLoader } from 'react-relay/hooks'
import AdminCreateRuleQuery, {
  AdminCreateRuleQuery as AdminCreateRuleQueryType
} from '@//:artifacts/AdminCreateRuleQuery.graphql'
import AdminCreateRule from './AdminCreateRule/AdminCreateRule'
import { Trans } from '@lingui/macro'

interface Props {
  prepared: {
    query: PreloadedQuery<AdminCreateRuleQueryType>
  }
}

export default function RootAdminCreateRule (props: Props): JSX.Element {
  const [queryRef, loadQuery] = useQueryLoader(
    AdminCreateRuleQuery,
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
            <AdminCreateRule
              query={queryRef as PreloadedQuery<AdminCreateRuleQueryType>}
            />
          </Suspense>
        </QueryErrorBoundary>
      </PageWrapper>
    </>
  )
}
