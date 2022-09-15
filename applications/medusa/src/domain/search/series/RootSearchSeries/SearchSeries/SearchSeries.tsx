import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import { SearchSeriesQuery } from '@//:artifacts/SearchSeriesQuery.graphql'
import { NotFoundSerial } from '@//:modules/content/Placeholder'
import { HStack, Stack } from '@chakra-ui/react'
import { GlobalVideoManagerProvider } from '@//:modules/content/Posts'
import { usePaginationFragment } from 'react-relay'
import { Trans } from '@lingui/macro'
import SearchSummary from '../../../../../common/components/PageHeader/SearchSummary/SearchSummary'
import SearchButton from '../../../../../common/components/PageHeader/SearchButton/SearchButton'
import SearchSeriesRecommendations from './SearchSeriesRecommendations/SearchSeriesRecommendations'
import SearchSeriesRichObject
  from '../../../../../common/rich-objects/search/SearchSeriesRichObject/SearchSeriesRichObject'
import FullSimplePost
  from '@//:modules/content/Posts/components/PostNavigation/PostInfiniteScroll/FullSimplePost/FullSimplePost'
import PostInfiniteScroll
  from '@//:modules/content/Posts/components/PostNavigation/PostInfiniteScroll/PostInfiniteScroll'
import PlatformPromoteAlert from '@//:common/components/PlatformPromoteAlert/PlatformPromoteAlert'
import SearchSeriesCopyLinkButton from './SearchSeriesCopyLinkButton/SearchSeriesCopyLinkButton'
import SearchSeriesShareDiscordButton from './SearchSeriesShareDiscordButton/SearchSeriesShareDiscordButton'
import SearchSeriesShareRedditButton from './SearchSeriesShareRedditButton/SearchSeriesShareRedditButton'
import SearchSeriesShareTwitterButton from './SearchSeriesShareTwitterButton/SearchSeriesShareTwitterButton'

interface Props {
  query: PreloadedQuery<SearchSeriesQuery>
}

const Query = graphql`
  query SearchSeriesQuery(
    $sortBy: PostsSort!,
    $seriesSlug: String!,
    $seed: String
  ) @preloadable {
    serial(slug: $seriesSlug) {
      title
      totalPosts
      totalLikes
      ...SearchSeriesFragment
      ...SearchSeriesRichObjectFragment
      ...SearchSeriesCopyLinkButtonFragment
      ...SearchSeriesShareDiscordButtonFragment
      ...SearchSeriesShareRedditButtonFragment
      ...SearchSeriesShareTwitterButtonFragment
    }
    viewer {
      ...FullSimplePostViewerFragment
    }
    ...SearchSeriesRecommendationsFragment
  }
`

const Fragment = graphql`
  fragment SearchSeriesFragment on Series
  @argumentDefinitions(
    first: {type: Int, defaultValue: 5}
    after: {type: String}
  )
  @refetchable(queryName: "SearchSeriesPostsPaginationQuery" ) {
    posts (
      first: $first,
      after: $after,
      sortBy: $sortBy,
      seed: $seed
    )
    @connection (key: "SearchSeriesPosts_posts") {
      edges {
        node {
          ...FullSimplePostFragment
        }
      }
      ...PostInfiniteScrollFragment
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
            <HStack spacing={1}>
              <SearchSeriesCopyLinkButton query={queryData.serial} />
              <SearchSeriesShareDiscordButton query={queryData.serial} />
              <SearchSeriesShareRedditButton query={queryData.serial} />
              <SearchSeriesShareTwitterButton query={queryData.serial} />
            </HStack>
            <SearchButton />
          </HStack>
        </Stack>
        <GlobalVideoManagerProvider>
          <PostInfiniteScroll
            query={data.posts}
            hasNext={hasNext}
            loadNext={loadNext}
            isLoadingNext={isLoadingNext}
            endOfTree={<PlatformPromoteAlert />}
          >
            {({ index, key }) => (
              <FullSimplePost
                key={key}
                query={data.posts.edges[index].node}
                viewerQuery={queryData.viewer}
              />
            )}
          </PostInfiniteScroll>
        </GlobalVideoManagerProvider>
      </Stack>
    </>
  )
}
