import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import { ModerationPostQuery } from '@//:artifacts/ModerationPostQuery.graphql'
import { Box, Stack } from '@chakra-ui/react'
import { NotFoundPublicPost } from '@//:modules/content/Placeholder'
import { PageSectionTitle, PageSectionWrap } from '@//:modules/content/PageLayout'
import { Trans } from '@lingui/macro'
import { PostHeaderClub, PostHeaderContributor } from '@//:modules/content/Posts'
import { useSearch } from '@//:modules/content/HookedComponents/Search'
import SearchDateRange, {
  getDateRangeDefault,
  SearchDateRangeProps
} from '@//:modules/content/HookedComponents/Search/components/SearchDateRange/SearchDateRange'
import QueryErrorBoundary
  from '../../../../../../modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import SkeletonStack from '../../../../../../modules/content/Placeholder/Loading/SkeletonStack/SkeletonStack'
import { Suspense } from 'react'
import ViewPostReports from './ViewPostReports/ViewPostReports'

interface Props {
  query: PreloadedQuery<ModerationPostQuery>
}

interface SearchProps {
  dateRange: SearchDateRangeProps
  reference: string
}

const Query = graphql`
  query ModerationPostQuery($reference: String!) {
    post(reference: $reference) @required(action: THROW) {
      __typename
      reference
      ...PostHeaderClubFragment
      ...PostHeaderContributorFragment
    }
  }
`

export default function ModerationPost ({ query }: Props): JSX.Element {
  const queryData = usePreloadedQuery<ModerationPostQuery>(
    Query,
    query
  )

  if (queryData?.post == null) {
    return <NotFoundPublicPost />
  }

  const {
    searchArguments,
    register,
    loadQuery
  } = useSearch<SearchProps>({
    defaultValue: {
      ...getDateRangeDefault(),
      reference: queryData.post.reference
    }
  })

  return (
    <Stack spacing={6}>
      <Box>
        <PageSectionWrap>
          <PageSectionTitle colorScheme='purple'>
            <Trans>
              Club
            </Trans>
          </PageSectionTitle>
          <PostHeaderClub query={queryData.post} />
        </PageSectionWrap>
      </Box>
      <Box>
        <PageSectionWrap>
          <PageSectionTitle colorScheme='purple'>
            <Trans>
              Contributor
            </Trans>
          </PageSectionTitle>
          <PostHeaderContributor query={queryData.post} />
        </PageSectionWrap>
      </Box>
      <Box>
        <PageSectionWrap>
          <PageSectionTitle colorScheme='purple'>
            <Trans>
              Reports
            </Trans>
          </PageSectionTitle>
          <Stack spacing={2}>
            <SearchDateRange {...register('dateRange', 'change')} />
            <QueryErrorBoundary loadQuery={loadQuery}>
              <Suspense fallback={<SkeletonStack />}>
                <ViewPostReports searchArguments={searchArguments} />
              </Suspense>
            </QueryErrorBoundary>
          </Stack>
        </PageSectionWrap>
      </Box>
    </Stack>
  )
}
