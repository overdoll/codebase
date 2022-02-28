import { Suspense } from 'react'
import { Helmet } from 'react-helmet-async'
import { PageWrapper } from '@//:modules/content/PageLayout'
import type { PreloadedQuery } from 'react-relay/hooks'
import { useQueryLoader } from 'react-relay/hooks'
import type { AdminClubQuery as AdminClubQueryType } from '@//:artifacts/AdminClubQuery.graphql'
import AdminClubQuery from '@//:artifacts/AdminClubQuery.graphql'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { useParams } from '@//:modules/routing/useParams'
import AdminClub from './AdminClub/AdminClub'
import { SkeletonStack } from '@//:modules/content/Placeholder'

interface Props {
  prepared: {
    query: PreloadedQuery<AdminClubQueryType>
  }
}

export default function RootAdminClub (props: Props): JSX.Element {
  const [queryRef, loadQuery] = useQueryLoader<AdminClubQueryType>(
    AdminClubQuery,
    props.prepared.query
  )

  const match = useParams()

  return (
    <>
      <Helmet title='admin club' />
      <PageWrapper>
        <QueryErrorBoundary loadQuery={() => loadQuery({ slug: match.slug as string })}>
          <Suspense fallback={<SkeletonStack />}>
            <AdminClub query={queryRef as PreloadedQuery<AdminClubQueryType>} />
          </Suspense>
        </QueryErrorBoundary>
      </PageWrapper>
    </>
  )
}
