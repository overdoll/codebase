import { Suspense } from 'react'
import { PageWrapper } from '@//:modules/content/PageLayout'
import type { PreloadedQuery } from 'react-relay/hooks'
import { useQueryLoader } from 'react-relay/hooks'
import type { ClubPostsQuery as ClubPostsQueryType, PostState } from '@//:artifacts/ClubPostsQuery.graphql'
import ClubPostsQuery from '@//:artifacts/ClubPostsQuery.graphql'
import ClubPosts from './ClubPosts/ClubPosts'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { Stack } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import SkeletonRectangleGrid from '@//:modules/content/Placeholder/Loading/SkeletonRectangleGrid/SkeletonRectangleGrid'
import { useSearch } from '@//:modules/content/HookedComponents/Search'
import SearchSelect from '@//:modules/content/HookedComponents/Search/components/SearchSelect/SearchSelect'
import { PageProps } from '@//:types/app'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { useQueryParam } from 'use-query-params'

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

  const [state, setState] = useQueryParam<PostState | null | undefined>('state')

  const { query: { slug } } = useRouter()

  const {
    searchArguments,
    register
  } = useSearch<SearchProps>({
    defaultValue: {
      slug: slug as string,
      state: state ?? null
    },
    onChange: (args) => {
      loadQuery({ ...args.variables })
      args.variables?.state != null ? setState(args.variables.state) : (state != null && setState(undefined))
    }
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
          <SearchSelect
            variant='solid'
            placeholder='All Posts'
            defaultValue={state ?? undefined as any}
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
            <option value='SUBMITTED'>
              <Trans>
                Submitted
              </Trans>
            </option>
          </SearchSelect>
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
