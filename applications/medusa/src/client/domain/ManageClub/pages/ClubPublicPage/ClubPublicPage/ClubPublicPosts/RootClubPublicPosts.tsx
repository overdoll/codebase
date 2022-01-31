import { Helmet } from 'react-helmet-async'
import { Suspense } from 'react'
import { PreloadedQuery, useQueryLoader } from 'react-relay/hooks'
import QueryErrorBoundary from '@//:modules/relay/QueryErrorBoundary/QueryErrorBoundary'
import type { ClubPublicPostsQuery as ClubPublicPostsQueryType } from '@//:artifacts/ClubPublicPostsQuery.graphql'
import ClubPublicPostsQuery from '@//:artifacts/ClubPublicPostsQuery.graphql'
import { PageWrapper } from '@//:modules/content/PageLayout'
import SkeletonPost from '@//:modules/content/Placeholder/Skeleton/SkeletonPost/SkeletonPost'
import ClubPublicPosts from './ClubPublicPosts/ClubPublicPosts'
import { useParams } from '@//:modules/routing'
import useSearchButtonQueryArguments
  from '../../../../../../components/FloatingGeneralSearchButton/helpers/useSearchButtonQueryArguments'

interface Props {
  prepared: {
    query: PreloadedQuery<ClubPublicPostsQueryType>
  }
}

export default function RootClubPublicPosts (props: Props): JSX.Element {
  const [queryRef, loadQuery] = useQueryLoader(
    ClubPublicPostsQuery,
    props.prepared.query
  )

  const match = useParams()

  const loadQueryWithParams = useSearchButtonQueryArguments({
    queryLoader: loadQuery,
    extraParams: { slug: match.slug as string }
  })

  return (
    <>
      <Helmet title='club posts' />
      <PageWrapper fillPage>
        <QueryErrorBoundary loadQuery={loadQueryWithParams}>
          <Suspense fallback={<SkeletonPost />}>
            <ClubPublicPosts query={queryRef as PreloadedQuery<ClubPublicPostsQueryType>} />
          </Suspense>
        </QueryErrorBoundary>
      </PageWrapper>
    </>
  )
}
