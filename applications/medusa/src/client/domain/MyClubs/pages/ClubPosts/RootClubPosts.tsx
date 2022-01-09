import { Suspense, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { PageSectionTitle, PageSectionWrap, PageWrapper } from '@//:modules/content/PageLayout'
import SkeletonStack from '@//:modules/content/Skeleton/SkeletonStack/SkeletonStack'
import type { PreloadedQuery } from 'react-relay/hooks'
import { useQueryLoader } from 'react-relay/hooks'
import type { ClubPostsQuery as ClubPostsQueryType } from '@//:artifacts/ClubPostsQuery.graphql'
import ClubPostsQuery from '@//:artifacts/ClubPostsQuery.graphql'
import ClubPosts from './ClubPosts/ClubPosts'
import QueryErrorBoundary from '@//:modules/relay/QueryErrorBoundary/QueryErrorBoundary'
import { useParams } from '@//:modules/routing/useParams'
import { Box, Select, Stack } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import { useQueryParam } from 'use-query-params'
import { PostState } from '@//:artifacts/ClubPostsFragment.graphql'

interface Props {
  prepared: {
    query: PreloadedQuery<ClubPostsQueryType>
  }
}

export default function RootClubPosts (props: Props): JSX.Element {
  const [queryRef, loadQuery] = useQueryLoader(
    ClubPostsQuery,
    props.prepared.query
  )

  const match = useParams()

  const [postState, setPostState] = useQueryParam<PostState | null | undefined>('state')

  const onChange = (e): void => {
    setPostState(e.target.value)
  }

  useEffect(() => {
    loadQuery({
      slug: match.slug as string,
      state: postState
    })
  }, [postState])

  return (
    <>
      <Helmet title='my posts' />
      <PageWrapper>
        <Stack spacing={2}>
          <Box>
            <PageSectionWrap>
              <PageSectionTitle colorScheme='teal'>
                Club Posts
              </PageSectionTitle>
            </PageSectionWrap>
            <Select placeholder='' defaultValue={postState ?? 'PUBLISHED'} onChange={onChange}>
              <option value='PUBLISHED'><Trans>
                Published
              </Trans>
              </option>
              <option value='DRAFT'><Trans>
                Draft
              </Trans>
              </option>
              <option value='REVIEW'><Trans>
                In Review
              </Trans>
              </option>
              <option value='REJECTED'><Trans>
                Rejected
              </Trans>
              </option>
            </Select>
          </Box>
          <QueryErrorBoundary loadQuery={() => loadQuery({ slug: match.slug as string })}>
            <Suspense fallback={<SkeletonStack />}>
              <ClubPosts query={queryRef as PreloadedQuery<ClubPostsQueryType>} />
            </Suspense>
          </QueryErrorBoundary>
        </Stack>
      </PageWrapper>
    </>
  )
}
