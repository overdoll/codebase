import { Suspense } from 'react'
import { PreloadedQuery, useQueryLoader } from 'react-relay/hooks'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import type { PublicClubPostsQuery as PublicClubPostsQueryType } from '@//:artifacts/PublicClubPostsQuery.graphql'
import PublicClubPostsQuery from '@//:artifacts/PublicClubPostsQuery.graphql'
import SkeletonPost from '@//:modules/content/Placeholder/Loading/SkeletonPost/SkeletonPost'
import PublicClubPosts from './PublicClubPosts/PublicClubPosts'
import useGeneralSearchArguments
  from '@//:modules/content/Posts/components/PostNavigation/PostsSearch/support/useGeneralSearchArguments'
import { PostOrderButton } from '@//:modules/content/Posts/components/PostNavigation/PostsSearch'
import PostSearchButton
  from '@//:modules/content/Posts/components/PostNavigation/PostsSearch/components/PostSearchButton/PostSearchButton'
import PageFixedHeader from '@//:modules/content/PageLayout/Wrappers/PageFixedHeader/PageFixedHeader'
import PageInfiniteScrollWrapper
  from '@//:modules/content/PageLayout/Wrappers/PageInfiniteScrollWrapper/PageInfiniteScrollWrapper'
import { Flex, HStack } from '@chakra-ui/react'
import FixedHeaderWrapper
  from '@//:modules/content/PageLayout/Wrappers/PageFixedHeader/FixedHeaderWrapper/FixedHeaderWrapper'
import PostSupporterStatusButton
  from '@//:modules/content/Posts/components/PostNavigation/PostsSearch/components/PostSupporterStatusButton/PostSupporterStatusButton'
import Head from 'next/head'
import { PageProps } from '@//:types/app'
import { useRouter } from 'next/router'

interface Props {
  queryRefs: {
    publicClubPosts: PreloadedQuery<PublicClubPostsQueryType>
  }
}

const RootPublicClubPosts: PageProps<Props> = (props: Props) => {
  const [queryRef, loadQuery] = useQueryLoader(
    PublicClubPostsQuery,
    props.queryRefs.publicClubPosts
  )

  const { query: { slug } } = useRouter()

  useGeneralSearchArguments((params) => loadQuery({
    ...params,
    slug: slug as string
  }))

  return (
    <>
      <Head>
        <title>
          Club Posts :: overdoll
        </title>
      </Head>
      <PageFixedHeader>
        <FixedHeaderWrapper>
          <Flex justify='space-between'>
            <HStack spacing={2}>
              <PostOrderButton />
              <PostSupporterStatusButton />
            </HStack>
            <PostSearchButton routeTo={{
              pathname: '[slug]/posts',
              query: {
                slug: slug
              }
            }}
            />
          </Flex>
        </FixedHeaderWrapper>
      </PageFixedHeader>
      <PageInfiniteScrollWrapper>
        <QueryErrorBoundary loadQuery={() => loadQuery({
          sortBy: 'TOP',
          slug: slug as string
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

export default RootPublicClubPosts
