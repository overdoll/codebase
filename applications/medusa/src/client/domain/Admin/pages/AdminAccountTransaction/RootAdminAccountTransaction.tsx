import { Suspense } from 'react'
import { Helmet } from 'react-helmet-async'
import { PageWrapper } from '@//:modules/content/PageLayout'
import type { PreloadedQuery } from 'react-relay/hooks'
import { useQueryLoader } from 'react-relay/hooks'
import type {
  AdminAccountTransactionQuery as AdminAccountTransactionQueryType
} from '@//:artifacts/AdminAccountTransactionQuery.graphql'
import AdminAccountTransactionQuery from '@//:artifacts/AdminAccountTransactionQuery.graphql'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { useParams } from '@//:modules/routing/useParams'
import { SkeletonStack } from '@//:modules/content/Placeholder'
import AdminAccountTransaction from './AdminAccountTransaction/AdminAccountTransaction'

interface Props {
  prepared: {
    query: PreloadedQuery<AdminAccountTransactionQueryType>
  }
}

export default function RootAdminClub (props: Props): JSX.Element {
  const [queryRef, loadQuery] = useQueryLoader<AdminAccountTransactionQueryType>(
    AdminAccountTransactionQuery,
    props.prepared.query
  )

  const match = useParams()

  return (
    <>
      <Helmet title='admin transaction' />
      <PageWrapper>
        <QueryErrorBoundary loadQuery={() => loadQuery({ reference: match.reference as string })}>
          <Suspense fallback={<SkeletonStack />}>
            <AdminAccountTransaction query={queryRef as PreloadedQuery<AdminAccountTransactionQueryType>} />
          </Suspense>
        </QueryErrorBoundary>
      </PageWrapper>
    </>
  )
}
