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
import { Heading, HStack, Stack } from '@chakra-ui/react'
import PostSupporterStatusButton
  from '@//:modules/content/Posts/components/PostNavigation/PostsSearch/components/PostSupporterStatusButton/PostSupporterStatusButton'
import { PageProps } from '@//:types/app'
import { useRouter } from 'next/router'
import { PageWrapper } from '@//:modules/content/PageLayout'
import { Trans } from '@lingui/macro'
import RootPublicClubPostsRichObject
  from '../../../../common/rich-objects/slug/RootPublicClubPostsRichObject/RootPublicClubPostsRichObject'

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
      <RootPublicClubPostsRichObject />
      <PageWrapper>
        <Stack spacing={8}>
          <Stack spacing={2}>
            <HStack spacing={2} justify='space-between'>
              <Heading color='gray.00' fontSize='2xl'>
                <Trans>
                  Club Posts Search
                </Trans>
              </Heading>
              <PostSearchButton routeTo={{
                pathname: '[slug]/posts',
                query: {
                  slug: slug
                }
              }}
              />
            </HStack>
            <HStack spacing={2}>
              <PostOrderButton />
              <PostSupporterStatusButton />
            </HStack>
          </Stack>
          <QueryErrorBoundary loadQuery={() => loadQuery({
            sortBy: 'TOP',
            slug: slug as string
          })}
          >
            <Suspense fallback={<SkeletonPost />}>
              <PublicClubPosts query={queryRef as PreloadedQuery<PublicClubPostsQueryType>} />
            </Suspense>
          </QueryErrorBoundary>
        </Stack>
      </PageWrapper>
    </>
  )
}

export default RootPublicClubPosts
