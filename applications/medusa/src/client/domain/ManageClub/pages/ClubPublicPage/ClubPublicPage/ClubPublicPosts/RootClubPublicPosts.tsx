import { Helmet } from 'react-helmet-async'
import { Suspense } from 'react'
import { PreloadedQuery, useQueryLoader } from 'react-relay/hooks'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import type { ClubPublicPostsQuery as ClubPublicPostsQueryType } from '@//:artifacts/ClubPublicPostsQuery.graphql'
import ClubPublicPostsQuery from '@//:artifacts/ClubPublicPostsQuery.graphql'
import { PageWrapper } from '@//:modules/content/PageLayout'
import SkeletonPost from '@//:modules/content/Placeholder/Loading/SkeletonPost/SkeletonPost'
import ClubPublicPosts from './ClubPublicPosts/ClubPublicPosts'
import { useParams } from '@//:modules/routing'
import useGeneralSearchArguments from '../../../../../../components/PostsSearch/helpers/useGeneralSearchArguments'
import { PostOrderButton } from '../../../../../../components/PostsSearch'
import PostSearchButton from '../../../../../../components/PostsSearch/components/PostSearchButton/PostSearchButton'
import PageFixedHeader from '../../../../../../components/PageFixedHeader/PageFixedHeader'

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

  useGeneralSearchArguments((params) => loadQuery(params))

  return (
    <>
      <Helmet title='club posts' />
      <PageFixedHeader>
        <PostOrderButton />
        <PostSearchButton routeTo={`/${match.slug as string}/posts`} />
      </PageFixedHeader>
      <PageWrapper fillPage>
        <QueryErrorBoundary loadQuery={() => loadQuery({
          sortBy: 'TOP',
          slug: match.slug as string
        })}
        >
          <Suspense fallback={<SkeletonPost />}>
            <ClubPublicPosts query={queryRef as PreloadedQuery<ClubPublicPostsQueryType>} />
          </Suspense>
        </QueryErrorBoundary>
      </PageWrapper>
    </>
  )
}
