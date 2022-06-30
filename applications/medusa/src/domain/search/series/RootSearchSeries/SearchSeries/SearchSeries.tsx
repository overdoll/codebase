import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import { SearchSeriesQuery } from '@//:artifacts/SearchSeriesQuery.graphql'
import { NotFoundSerial } from '@//:modules/content/Placeholder'
import { HStack, Stack } from '@chakra-ui/react'
import { GlobalVideoManagerProvider } from '@//:modules/content/Posts'
import PostsInfiniteScroll
  from '@//:modules/content/Posts/components/PostNavigation/PostsInfiniteScroll/PostsInfiniteScroll'
import { usePaginationFragment } from 'react-relay'
import { Trans } from '@lingui/macro'
import SearchSummary from '../../../../../common/components/PageHeader/SearchSummary/SearchSummary'
import PostOrderButton from '../../../../../common/components/PageHeader/PostOrderButton/PostOrderButton'
import SearchButton from '../../../../../common/components/PageHeader/SearchButton/SearchButton'
import SearchSeriesRecommendations from './SearchSeriesRecommendations/SearchSeriesRecommendations'
import SearchSeriesRichObject
  from '../../../../../common/rich-objects/search/SearchSeriesRichObject/SearchSeriesRichObject'

interface Props {
  query: PreloadedQuery<SearchSeriesQuery>
}

const Query = graphql`
  query SearchSeriesQuery(
    $sortBy: PostsSort!,
    $seriesSlug: String!
  ) @preloadable {
    serial(slug: $seriesSlug) {
      title
      totalPosts
      totalLikes
      ...SearchSeriesFragment
      ...SearchSeriesRichObjectFragment
    }
    viewer {
      ...PostsInfiniteScrollViewerFragment
    }
    ...SearchSeriesRecommendationsFragment
  }
`

const Fragment = graphql`
  fragment SearchSeriesFragment on Series
  @argumentDefinitions(
    first: {type: Int, defaultValue: 9}
    after: {type: String}
  )
  @refetchable(queryName: "SearchSeriesPostsPaginationQuery" ) {
    posts (
      first: $first,
      after: $after,
      sortBy: $sortBy,
    )
    @connection (key: "SearchSeriesPosts_posts") {
      edges {
        __typename
      }
      ...PostsInfiniteScrollFragment
    }
  }
`

export default function SearchSeries ({ query }: Props): JSX.Element {
  const queryData = usePreloadedQuery<SearchSeriesQuery>(
    Query,
    query
  )

  const {
    data,
    loadNext,
    hasNext,
    isLoadingNext
  } = usePaginationFragment<SearchSeriesQuery, any>(
    Fragment,
    queryData.serial
  )

  if (queryData?.serial == null) {
    return <NotFoundSerial />
  }

  return (
    <>
      <SearchSeriesRichObject query={queryData.serial} />
      <Stack spacing={8}>
        <Stack spacing={2}>
          <SearchSummary
            title={queryData.serial.title}
            type={<Trans>Series</Trans>}
            totalPosts={queryData.serial.totalPosts}
            totalLikes={queryData.serial.totalLikes}
          />
          <SearchSeriesRecommendations query={queryData} />
          <HStack justify='space-between' spacing={2}>
            <PostOrderButton />
            <SearchButton />
          </HStack>
        </Stack>
        <GlobalVideoManagerProvider>
          <PostsInfiniteScroll
            hasNext={hasNext}
            isLoadingNext={isLoadingNext}
            loadNext={loadNext}
            query={data.posts}
            viewerQuery={queryData.viewer}
          />
        </GlobalVideoManagerProvider>
      </Stack>
    </>
  )
}
