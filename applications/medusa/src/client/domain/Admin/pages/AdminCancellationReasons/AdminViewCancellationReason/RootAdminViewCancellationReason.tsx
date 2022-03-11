import { Suspense } from 'react'
import { Helmet } from 'react-helmet-async'
import { PageWrapper } from '@//:modules/content/PageLayout'
import type { PreloadedQuery } from 'react-relay/hooks'
import { useQueryLoader } from 'react-relay/hooks'
import type { AdminViewRuleQuery as AdminViewRuleQueryType } from '@//:artifacts/AdminViewRuleQuery.graphql'
import AdminViewRuleQuery from '@//:artifacts/AdminViewRuleQuery.graphql'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { useParams } from '@//:modules/routing/useParams'
import { Stack } from '@chakra-ui/react'
import AdminViewCancellationReason from './AdminViewCancellationReason/AdminViewCancellationReason'
import { SkeletonStack } from '@//:modules/content/Placeholder'
import AdminBackButton from '../../../components/AdminBackButton/AdminBackButton'

interface Props {
  prepared: {
    query: PreloadedQuery<AdminViewRuleQueryType>
  }
}

export default function RootAdminViewCancellationReason (props: Props): JSX.Element {
  const [queryRef, loadQuery] = useQueryLoader(
    AdminViewRuleQuery,
    props.prepared.query
  )

  const match = useParams()

  return (
    <>
      <Helmet title='view rule' />
      <PageWrapper>
        <Stack spacing={2}>
          <AdminBackButton to='/admin/rule/search' />
          <QueryErrorBoundary loadQuery={() => loadQuery({
            reference: match.reference as string
          })}
          >
            <Suspense fallback={<SkeletonStack />}>
              <AdminViewCancellationReason query={queryRef as PreloadedQuery<AdminViewRuleQueryType>} />
            </Suspense>
          </QueryErrorBoundary>
        </Stack>
      </PageWrapper>
    </>
  )
}
