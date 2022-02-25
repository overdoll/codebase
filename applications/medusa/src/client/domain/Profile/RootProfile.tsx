import { PreloadedQuery, useQueryLoader } from 'react-relay/hooks'
import { Helmet } from 'react-helmet-async'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { Suspense } from 'react'
import type { ProfileQuery as ProfileQueryType } from '@//:artifacts/ProfileQuery.graphql'
import ProfileQuery from '@//:artifacts/ProfileQuery.graphql'
import { useParams } from '@//:modules/routing/useParams'
import { PageWrapper } from '@//:modules/content/PageLayout'
import SkeletonPost from '@//:modules/content/Placeholder/Loading/SkeletonPost/SkeletonPost'
import Profile from './Profile/Profile'

interface Props {
  prepared: {
    query: PreloadedQuery<ProfileQueryType>
  }
}

export default function RootProfile (props: Props): JSX.Element {
  const [queryRef, loadQuery] = useQueryLoader(
    ProfileQuery,
    props.prepared.query
  )

  const params = useParams()

  return (
    <>
      <Helmet title='profile' />
      <PageWrapper>
        <QueryErrorBoundary loadQuery={() => loadQuery({ username: params?.username ?? '' })}>
          <Suspense fallback={<SkeletonPost />}>
            <Profile query={queryRef as PreloadedQuery<ProfileQueryType>} />
          </Suspense>
        </QueryErrorBoundary>
      </PageWrapper>
    </>
  )
}
