import { Suspense } from 'react'
import { Helmet } from 'react-helmet-async'
import { PageWrapper } from '@//:modules/content/PageLayout'
import type { PreloadedQuery } from 'react-relay/hooks'
import { useQueryLoader } from 'react-relay/hooks'
import type {
  AdminViewCancellationReasonQuery as AdminViewCancellationReasonQueryType
} from '@//:artifacts/AdminViewCancellationReasonQuery.graphql'
import AdminViewCancellationReasonQuery from '@//:artifacts/AdminViewCancellationReasonQuery.graphql'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { useParams } from '@//:modules/routing/useParams'
import { Stack } from '@chakra-ui/react'
import AdminViewCancellationReason from './AdminViewCancellationReason/AdminViewCancellationReason'
import { SkeletonStack } from '@//:modules/content/Placeholder'
import AdminBackButton from '../../../components/AdminBackButton/AdminBackButton'

interface Props {
  prepared: {
    query: PreloadedQuery<AdminViewCancellationReasonQueryType>
  }
}

export default function RootAdminViewCancellationReason (props: Props): JSX.Element {
  const [queryRef, loadQuery] = useQueryLoader(
    AdminViewCancellationReasonQuery,
    props.prepared.query
  )

  const match = useParams()

  return (
    <>
      <Helmet title='view cancellation reason' />
      <PageWrapper>
        <Stack spacing={2}>
          <AdminBackButton to='/admin/cancellation-reason/search' />
          <QueryErrorBoundary loadQuery={() => loadQuery({
            reference: match.reference as string
          })}
          >
            <Suspense fallback={<SkeletonStack />}>
              <AdminViewCancellationReason query={queryRef as PreloadedQuery<AdminViewCancellationReasonQueryType>} />
            </Suspense>
          </QueryErrorBoundary>
        </Stack>
      </PageWrapper>
    </>
  )
}
