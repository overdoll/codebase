import { Suspense } from 'react'
import { PreloadedQuery, useQueryLoader } from 'react-relay/hooks'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import type { PublicClubPostsQuery as PublicClubPostsQueryType } from '@//:artifacts/PublicClubPostsQuery.graphql'
import PublicClubPostsQuery from '@//:artifacts/PublicClubPostsQuery.graphql'
import SkeletonPost from '@//:modules/content/Placeholder/Loading/SkeletonPost/SkeletonPost'
import PublicClubPosts from './PublicClubPosts/PublicClubPosts'
import { Stack } from '@chakra-ui/react'
import { PageProps } from '@//:types/app'
import { useRouter } from 'next/router'
import { PageWrapper } from '@//:modules/content/PageLayout'
import useSearchSortArguments
  from '../../../../common/components/PageHeader/SearchButton/support/useSearchSortArguments'

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

  useSearchSortArguments((params) => loadQuery({
    ...params,
    slug: slug as string
  }))

  return (
    <>
      <PageWrapper>
        <Stack spacing={8}>
          <QueryErrorBoundary loadQuery={() => loadQuery({
            sortBy: 'ALGORITHM',
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
