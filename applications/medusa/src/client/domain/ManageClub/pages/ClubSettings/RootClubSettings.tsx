import { Helmet } from 'react-helmet-async'
import { PageWrapper } from '@//:modules/content/PageLayout'
import QueryErrorBoundary from '@//:modules/relay/QueryErrorBoundary/QueryErrorBoundary'
import { Suspense } from 'react'
import SkeletonStack from '@//:modules/content/Placeholder/Skeleton/SkeletonStack/SkeletonStack'
import { PreloadedQuery, useQueryLoader } from 'react-relay/hooks'
import ClubSettingsQuery, { ClubSettingsQuery as ClubSettingsQueryType } from '@//:artifacts/ClubSettingsQuery.graphql'
import ClubSettings from './ClubSettings/ClubSettings'
import { useParams } from '@//:modules/routing/useParams'

interface Props {
  prepared: {
    query: PreloadedQuery<ClubSettingsQueryType>
  }
}

export default function RootClubSettings (props: Props): JSX.Element {
  const [queryRef, loadQuery] = useQueryLoader(
    ClubSettingsQuery,
    props.prepared.query
  )

  const match = useParams()

  return (
    <>
      <Helmet title='club settings' />
      <PageWrapper>
        <QueryErrorBoundary loadQuery={() => loadQuery({ slug: match.slug as string })}>
          <Suspense fallback={<SkeletonStack />}>
            <ClubSettings query={queryRef as PreloadedQuery<ClubSettingsQueryType>} />
          </Suspense>
        </QueryErrorBoundary>
      </PageWrapper>
    </>
  )
}
