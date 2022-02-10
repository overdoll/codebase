import { Helmet } from 'react-helmet-async'
import { PageWrapper } from '@//:modules/content/PageLayout'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { Suspense } from 'react'
import SkeletonStack from '@//:modules/content/Placeholder/Loading/SkeletonStack/SkeletonStack'
import { PreloadedQuery, useQueryLoader } from 'react-relay/hooks'
import ClubHomeQuery, { ClubHomeQuery as ClubHomeQueryType } from '@//:artifacts/ClubHomeQuery.graphql'
import { useParams } from '@//:modules/routing/useParams'
import ClubHome from './ClubHome/ClubHome'

interface Props {
  prepared: {
    query: PreloadedQuery<ClubHomeQueryType>
  }
}

export default function RootClubSettings (props: Props): JSX.Element {
  const [queryRef, loadQuery] = useQueryLoader(
    ClubHomeQuery,
    props.prepared.query
  )

  const match = useParams()

  return (
    <>
      <Helmet title='club home' />
      <PageWrapper>
        <QueryErrorBoundary loadQuery={() => loadQuery({ slug: match.slug as string })}>
          <Suspense fallback={<SkeletonStack />}>
            <ClubHome query={queryRef as PreloadedQuery<ClubHomeQueryType>} />
          </Suspense>
        </QueryErrorBoundary>
      </PageWrapper>
    </>
  )
}
