import { Suspense } from 'react'
import { PreloadedQuery, useQueryLoader } from 'react-relay/hooks'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import type { LikedPostsQuery as LikedPostsQueryType } from '@//:artifacts/LikedPostsQuery.graphql'
import LikedPostsQuery from '@//:artifacts/LikedPostsQuery.graphql'
import SkeletonPost from '@//:modules/content/Placeholder/Loading/SkeletonPost/SkeletonPost'
import { PageProps } from '@//:types/app'
import LikedPosts from './LikedPosts/LikedPosts'
import { PageWrapper } from '@//:modules/content/PageLayout'
import LikedPostsRichObject from '@//:common/rich-objects/clubs/liked-posts/LikedPostsRichObject'

interface Props {
  queryRefs: {
    likedPostsQuery: PreloadedQuery<LikedPostsQueryType>
  }
}

const RootLikedPosts: PageProps<Props> = (props: Props) => {
  const [queryRef, loadQuery] = useQueryLoader(
    LikedPostsQuery,
    props.queryRefs.likedPostsQuery
  )

  return (
    <>
      <LikedPostsRichObject />
      <PageWrapper>
        <QueryErrorBoundary loadQuery={() => loadQuery({})}>
          <Suspense fallback={<SkeletonPost />}>
            <LikedPosts query={queryRef as PreloadedQuery<LikedPostsQueryType>} />
          </Suspense>
        </QueryErrorBoundary>
      </PageWrapper>
    </>
  )
}

export default RootLikedPosts
