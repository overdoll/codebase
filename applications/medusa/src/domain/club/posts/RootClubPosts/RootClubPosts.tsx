import { Suspense } from 'react'
import { PageSectionTitle, PageSectionWrap, PageWrapper } from '@//:modules/content/PageLayout'
import type { PreloadedQuery } from 'react-relay/hooks'
import { useQueryLoader } from 'react-relay/hooks'
import type { ClubPostsQuery as ClubPostsQueryType, PostState } from '@//:artifacts/ClubPostsQuery.graphql'
import ClubPostsQuery from '@//:artifacts/ClubPostsQuery.graphql'
import ClubPosts from './ClubPosts/ClubPosts'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { Box, Stack } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import SkeletonRectangleGrid from '@//:modules/content/Placeholder/Loading/SkeletonRectangleGrid/SkeletonRectangleGrid'
import { useSearch } from '@//:modules/content/HookedComponents/Search'
import SearchSelect from '@//:modules/content/HookedComponents/Search/components/SearchSelect/SearchSelect'
import { PageProps } from '@//:types/app'
import { useRouter } from 'next/router'
import Head from 'next/head'

interface Props {
  queryRefs: {
    clubPostsQuery: PreloadedQuery<ClubPostsQueryType>
  }
}

interface SearchProps {
  slug: string
  state: PostState | null | undefined
}

const RootClubPosts: PageProps<Props> = (props: Props) => {
  const [queryRef, loadQuery] = useQueryLoader(
    ClubPostsQuery,
    props.queryRefs.clubPostsQuery
  )

  const { query: { slug } } = useRouter()

  const {
    searchArguments,
    register
  } = useSearch<SearchProps>({
    defaultValue: {
      slug: slug as string,
      state: null
    },
    onChange: (args) => loadQuery({ ...args.variables })
  })

  return (
    <>
      <Head>
        <title>
          My Posts - overdoll
        </title>
      </Head>
      <PageWrapper>
        <Stack spacing={2}>
          <Box>
            <PageSectionWrap>
              <PageSectionTitle colorScheme='teal'>
                Club Posts
              </PageSectionTitle>
            </PageSectionWrap>
            <SearchSelect
              variant='outline'
              placeholder='All Posts'
              {...register('state', 'change')}
            >
              <option value='PUBLISHED'>
                <Trans>
                  Published
                </Trans>
              </option>
              <option value='DRAFT'>
                <Trans>
                  Draft
                </Trans>
              </option>
              <option value='ARCHIVED'>
                <Trans>
                  Archived
                </Trans>
              </option>
              <option value='REVIEW'>
                <Trans>
                  In Review
                </Trans>
              </option>
              <option value='REJECTED'>
                <Trans>
                  Rejected
                </Trans>
              </option>
              <option value='REMOVED'>
                <Trans>
                  Removed
                </Trans>
              </option>
            </SearchSelect>
          </Box>
          <QueryErrorBoundary loadQuery={() => loadQuery({ ...searchArguments.variables })}>
            <Suspense fallback={<SkeletonRectangleGrid />}>
              <ClubPosts query={queryRef as PreloadedQuery<ClubPostsQueryType>} />
            </Suspense>
          </QueryErrorBoundary>
        </Stack>
      </PageWrapper>
    </>
  )
}

export default RootClubPosts
