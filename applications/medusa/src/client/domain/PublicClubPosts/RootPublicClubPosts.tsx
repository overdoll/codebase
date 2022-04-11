import { Helmet } from 'react-helmet-async'
import { Suspense } from 'react'
import { PreloadedQuery, useQueryLoader } from 'react-relay/hooks'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import type { PublicClubPostsQuery as PublicClubPostsQueryType } from '@//:artifacts/PublicClubPostsQuery.graphql'
import PublicClubPostsQuery from '@//:artifacts/PublicClubPostsQuery.graphql'
import SkeletonPost from '@//:modules/content/Placeholder/Loading/SkeletonPost/SkeletonPost'
import PublicClubPosts from './PublicClubPosts/PublicClubPosts'
import { useParams } from '@//:modules/routing'
import useGeneralSearchArguments from '../../../modules/content/Posts/components/PostNavigation/PostsSearch/support/useGeneralSearchArguments'
import { PostOrderButton } from '../../../modules/content/Posts/components/PostNavigation/PostsSearch'
import PostSearchButton from '../../../modules/content/Posts/components/PostNavigation/PostsSearch/components/PostSearchButton/PostSearchButton'
import PageFixedHeader from '../../../modules/content/PageLayout/Wrappers/PageFixedHeader/PageFixedHeader'
import PageInfiniteScrollWrapper
  from '@//:modules/content/PageLayout/Wrappers/PageInfiniteScrollWrapper/PageInfiniteScrollWrapper'
import { Flex, HStack } from '@chakra-ui/react'
import FixedHeaderWrapper from '../../../modules/content/PageLayout/Wrappers/PageFixedHeader/FixedHeaderWrapper/FixedHeaderWrapper'
import PostSupporterStatusButton
  from '../../../modules/content/Posts/components/PostNavigation/PostsSearch/components/PostSupporterStatusButton/PostSupporterStatusButton'

interface Props {
  prepared: {
    query: PreloadedQuery<PublicClubPostsQueryType>
  }
}

export default function RootPublicClubPosts (props: Props): JSX.Element {
  const [queryRef, loadQuery] = useQueryLoader(
    PublicClubPostsQuery,
    props.prepared.query
  )

  const match = useParams()

  useGeneralSearchArguments((params) => loadQuery({
    ...params,
    slug: match.slug as string
  }))

  return (
    <>
      <Helmet>
        <title>
          Club Posts :: overdoll
        </title>
      </Helmet>
      <PageFixedHeader>
        <FixedHeaderWrapper>
          <Flex justify='space-between'>
            <HStack spacing={2}>
              <PostOrderButton />
              <PostSupporterStatusButton />
            </HStack>
            <PostSearchButton routeTo={`/${match.slug as string}/posts`} />
          </Flex>
        </FixedHeaderWrapper>
      </PageFixedHeader>
      <PageInfiniteScrollWrapper>
        <QueryErrorBoundary loadQuery={() => loadQuery({
          sortBy: 'TOP',
          slug: match.slug as string
        })}
        >
          <Suspense fallback={<SkeletonPost />}>
            <PublicClubPosts query={queryRef as PreloadedQuery<PublicClubPostsQueryType>} />
          </Suspense>
        </QueryErrorBoundary>
      </PageInfiniteScrollWrapper>
    </>
  )
}
