import { Suspense } from 'react'
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

  const onChange = (e): void => {
    loadQuery({
      slug: match.slug as string,
      state: e.target.value
    })
  }

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
            <Select placeholder='' onChange={onChange}>
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
