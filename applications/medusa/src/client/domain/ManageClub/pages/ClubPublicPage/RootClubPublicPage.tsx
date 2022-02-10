import { PreloadedQuery, useQueryLoader } from 'react-relay/hooks'
import { Helmet } from 'react-helmet-async'
import { PageWrapper } from '@//:modules/content/PageLayout'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { Suspense } from 'react'
import ClubPublicPageQuery, {
  ClubPublicPageQuery as ClubPublicPageQueryType
} from '@//:artifacts/ClubPublicPageQuery.graphql'
import { useParams } from '@//:modules/routing/useParams'
import ClubPublicPage from './ClubPublicPage/ClubPublicPage'
import SkeletonPost from '@//:modules/content/Placeholder/Loading/SkeletonPost/SkeletonPost'

interface Props {
  prepared: {
    query: PreloadedQuery<ClubPublicPageQueryType>
  }
}

export default function RootClubPublicPage (props: Props): JSX.Element {
  const [queryRef, loadQuery] = useQueryLoader(
    ClubPublicPageQuery,
    props.prepared.query
  )

  const match = useParams()

  return (
    <>
      <Helmet title='club' />
      <PageWrapper>
        <QueryErrorBoundary loadQuery={() => loadQuery({ slug: match.slug as string })}>
          <Suspense fallback={<SkeletonPost />}>
            <ClubPublicPage query={queryRef as PreloadedQuery<ClubPublicPageQueryType>} />
          </Suspense>
        </QueryErrorBoundary>
      </PageWrapper>
    </>
  )
}
