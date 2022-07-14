import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import { SearchCharacterQuery } from '@//:artifacts/SearchCharacterQuery.graphql'
import { NotFoundCharacter } from '@//:modules/content/Placeholder'
import { HStack, Stack } from '@chakra-ui/react'
import { GlobalVideoManagerProvider } from '@//:modules/content/Posts'
import PostsInfiniteScroll
  from '@//:modules/content/Posts/components/PostNavigation/PostsInfiniteScroll/PostsInfiniteScroll'
import { usePaginationFragment } from 'react-relay'
import { Trans } from '@lingui/macro'
import SearchSummary from '../../../../../common/components/PageHeader/SearchSummary/SearchSummary'
import PostOrderButton from '../../../../../common/components/PageHeader/PostOrderButton/PostOrderButton'
import SearchButton from '../../../../../common/components/PageHeader/SearchButton/SearchButton'
import SearchCharacterRecommendations from './SearchCharacterRecommendations/SearchCharacterRecommendations'
import SearchCharacterRichObject
  from '../../../../../common/rich-objects/search/SearchCharacterRichObject/SearchCharacterRichObject'

interface Props {
  query: PreloadedQuery<SearchCharacterQuery>
}

const Query = graphql`
  query SearchCharacterQuery(
    $sortBy: PostsSort!,
    $seriesSlug: String,
    $characterSlug: String!,
  ) @preloadable {
    character(seriesSlug: $seriesSlug, slug: $characterSlug) {
      name
      totalPosts
      totalLikes
      ...SearchCharacterRecommendationsFragment
      ...SearchCharacterFragment
      ...SearchCharacterRichObjectFragment
    }
    viewer {
      ...PostsInfiniteScrollViewerFragment
    }
  }
`

const Fragment = graphql`
  fragment SearchCharacterFragment on Character
  @argumentDefinitions(
    first: {type: Int, defaultValue: 9}
    after: {type: String}
  )
  @refetchable(queryName: "SearchCharacterPostsPaginationQuery" ) {
    posts (
      first: $first,
      after: $after,
      sortBy: $sortBy,
    )
    @connection (key: "SearchCharacterPosts_posts") {
      edges {
        __typename
      }
      ...PostsInfiniteScrollFragment
    }
  }
`

export default function SearchCharacter ({ query }: Props): JSX.Element {
  const queryData = usePreloadedQuery<SearchCharacterQuery>(
    Query,
    query
  )

  const {
    data,
    loadNext,
    hasNext,
    isLoadingNext
  } = usePaginationFragment<SearchCharacterQuery, any>(
    Fragment,
    queryData.character
  )

  if (queryData?.character == null) {
    return <NotFoundCharacter />
  }

  return (
    <>
      <SearchCharacterRichObject query={queryData.character} />
      <Stack spacing={8}>
        <Stack spacing={2}>
          <SearchSummary
            title={queryData.character.name}
            type={<Trans>Character</Trans>}
            totalPosts={queryData.character.totalPosts}
            totalLikes={queryData.character.totalLikes}
          />
          <SearchCharacterRecommendations query={queryData.character} />
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
