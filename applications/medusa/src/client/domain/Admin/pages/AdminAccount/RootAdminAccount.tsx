import { Suspense } from 'react'
import { Helmet } from 'react-helmet-async'
import type { PreloadedQuery } from 'react-relay/hooks'
import { useQueryLoader } from 'react-relay/hooks'
import type { AdminAccountQuery as AdminAccountQueryType } from '@//:artifacts/AdminAccountQuery.graphql'
import AdminAccountQuery from '@//:artifacts/AdminAccountQuery.graphql'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { useParams } from '@//:modules/routing/useParams'
import AdminAccount from './AdminAccount/AdminAccount'
import { SkeletonStack } from '@//:modules/content/Placeholder'
import PageWrapperDesktop from '../../components/PageWrapperDesktop/PageWrapperDesktop'

interface Props {
  prepared: {
    query: PreloadedQuery<AdminAccountQueryType>
  }
}

export default function RootAdminAccount (props: Props): JSX.Element {
  const [queryRef, loadQuery] = useQueryLoader<AdminAccountQueryType>(
    AdminAccountQuery,
    props.prepared.query
  )

  const match = useParams()

  return (
    <>
      <Helmet title='admin account' />
      <PageWrapperDesktop>
        <QueryErrorBoundary loadQuery={() => loadQuery({ username: match.username as string })}>
          <Suspense fallback={<SkeletonStack />}>
            <AdminAccount query={queryRef as PreloadedQuery<AdminAccountQueryType>} />
          </Suspense>
        </QueryErrorBoundary>
      </PageWrapperDesktop>
    </>
  )
}
