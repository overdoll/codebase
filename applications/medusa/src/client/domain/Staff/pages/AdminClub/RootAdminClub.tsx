import { Suspense } from 'react'
import { Helmet } from 'react-helmet-async'
import { PageWrapper } from '@//:modules/content/PageLayout'
import type { PreloadedQuery } from 'react-relay/hooks'
import { useQueryLoader } from 'react-relay/hooks'
import type { StaffClubQuery as StaffClubQueryType } from '@//:artifacts/StaffClubQuery.graphql'
import StaffClubQuery from '@//:artifacts/StaffClubQuery.graphql'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { useParams } from '@//:modules/routing/useParams'
import StaffClub from './StaffClub/StaffClub'
import { SkeletonStack } from '@//:modules/content/Placeholder'

interface Props {
  prepared: {
    query: PreloadedQuery<StaffClubQueryType>
  }
}

export default function RootStaffClub (props: Props): JSX.Element {
  const [queryRef, loadQuery] = useQueryLoader<StaffClubQueryType>(
    StaffClubQuery,
    props.prepared.query
  )

  const match = useParams()

  return (
    <>
      <Helmet title='staff club' />
      <PageWrapper>
        <QueryErrorBoundary loadQuery={() => loadQuery({ slug: match.slug as string })}>
          <Suspense fallback={<SkeletonStack />}>
            <StaffClub query={queryRef as PreloadedQuery<StaffClubQueryType>} />
          </Suspense>
        </QueryErrorBoundary>
      </PageWrapper>
    </>
  )
}
