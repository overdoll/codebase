import { Helmet } from 'react-helmet-async'
import { PageWrapper } from '@//:modules/content/PageLayout'
import QueryErrorBoundary from '@//:modules/relay/QueryErrorBoundary/QueryErrorBoundary'
import { Suspense } from 'react'
import SkeletonStack from '@//:modules/content/SkeletonStack/SkeletonStack'
import { PreloadedQuery, useQueryLoader } from 'react-relay/hooks'
import ClubSettingsQuery, { ClubSettingsQuery as ClubSettingsQueryType } from '@//:artifacts/ClubSettingsQuery.graphql'
import ClubSettings from './ClubSettings/ClubSettings'
import { matchPath } from 'react-router'

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

  const match = matchPath(location.pathname, {
    path: '/club/:slug'
  })

  return (
    <>
      <Helmet title='club settings' />
      <PageWrapper>
        <QueryErrorBoundary loadQuery={() => loadQuery({ slug: match.params.slug })}>
          <Suspense fallback={<SkeletonStack />}>
            <ClubSettings query={queryRef as PreloadedQuery<ClubSettingsQueryType>} />
          </Suspense>
        </QueryErrorBoundary>
      </PageWrapper>
    </>
  )
}
