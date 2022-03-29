import { Helmet } from 'react-helmet-async'
import { Suspense } from 'react'
import { PreloadedQuery, useQueryLoader } from 'react-relay/hooks'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import type { ClubPublicPostsQuery as ClubPublicPostsQueryType } from '@//:artifacts/ClubPublicPostsQuery.graphql'
import ClubPublicPostsQuery from '@//:artifacts/ClubPublicPostsQuery.graphql'
import SkeletonPost from '@//:modules/content/Placeholder/Loading/SkeletonPost/SkeletonPost'
import ClubPublicPosts from './ClubPublicPosts/ClubPublicPosts'
import { useParams } from '@//:modules/routing'
import useGeneralSearchArguments from '../../components/PostsSearch/helpers/useGeneralSearchArguments'
import { PostOrderButton } from '../../components/PostsSearch'
import PostSearchButton from '../../components/PostsSearch/components/PostSearchButton/PostSearchButton'
import PageFixedHeader from '../../components/PageFixedHeader/PageFixedHeader'
import PageInfiniteScrollWrapper
  from '@//:modules/content/PageLayout/Wrappers/PageInfiniteScrollWrapper/PageInfiniteScrollWrapper'
import { Flex, HStack } from '@chakra-ui/react'
import FixedHeaderWrapper from '../../components/PageFixedHeader/FixedHeaderWrapper/FixedHeaderWrapper'
import PostSupporterStatusButton
  from '../../components/PostsSearch/components/PostSupporterStatusButton/PostSupporterStatusButton'

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

  useGeneralSearchArguments((params) => loadQuery({
    ...params,
    slug: match.slug as string
  }))

  return (
    <>
      <Helmet title='club posts' />
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
            <ClubPublicPosts query={queryRef as PreloadedQuery<ClubPublicPostsQueryType>} />
          </Suspense>
        </QueryErrorBoundary>
      </PageInfiniteScrollWrapper>
    </>
  )
}
