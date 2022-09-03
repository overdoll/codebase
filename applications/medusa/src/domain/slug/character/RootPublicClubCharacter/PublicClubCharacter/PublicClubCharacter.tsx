import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import { PublicClubCharacterQuery } from '@//:artifacts/PublicClubCharacterQuery.graphql'
import { NotFoundCharacter } from '@//:modules/content/Placeholder'
import { HStack, Stack } from '@chakra-ui/react'
import { GlobalVideoManagerProvider } from '@//:modules/content/Posts'
import { usePaginationFragment } from 'react-relay'
import { Trans } from '@lingui/macro'
import SearchSummary from '../../../../../common/components/PageHeader/SearchSummary/SearchSummary'
import SearchButton from '../../../../../common/components/PageHeader/SearchButton/SearchButton'
import ClubCharacterRecommendations from './ClubCharacterRecommendations/ClubCharacterRecommendations'
import PublicClubCharacterRichObject
  from '../../../../../common/rich-objects/slug/PublicClubCharacterRichObject/PublicClubCharacterRichObject'
import FullSimplePost
  from '@//:modules/content/Posts/components/PostNavigation/PostInfiniteScroll/FullSimplePost/FullSimplePost'
import PostInfiniteScroll
  from '@//:modules/content/Posts/components/PostNavigation/PostInfiniteScroll/PostInfiniteScroll'
import PlatformPromoteAlert from '@//:common/components/PlatformPromoteAlert/PlatformPromoteAlert'
import SearchCustomCharacterCopyLinkButton
  from './SearchCustomCharacterCopyLinkButton/SearchCustomCharacterCopyLinkButton'
import SearchCustomCharacterShareDiscordButton
  from './SearchCustomCharacterShareDiscordButton/SearchCustomCharacterShareDiscordButton'
import SearchCustomCharacterShareRedditButton
  from './SearchCustomCharacterShareRedditButton/SearchCustomCharacterShareRedditButton'
import SearchCustomCharacterShareTwitterButton
  from './SearchCustomCharacterShareTwitterButton/SearchCustomCharacterShareTwitterButton'

interface Props {
  query: PreloadedQuery<PublicClubCharacterQuery>
}

const Query = graphql`
  query PublicClubCharacterQuery(
    $sortBy: PostsSort!,
    $clubSlug: String,
    $characterSlug: String!,
    $seed: String
  ) @preloadable {
    character(clubSlug: $clubSlug, slug: $characterSlug) {
      name
      totalPosts
      totalLikes
      club @required(action: THROW) {
        ...ClubCharacterRecommendationsFragment
      }
      ...PublicClubCharacterFragment
      ...PublicClubCharacterRichObjectFragment
      ...SearchCustomCharacterCopyLinkButtonFragment
      ...SearchCustomCharacterShareDiscordButtonFragment
      ...SearchCustomCharacterShareRedditButtonFragment
      ...SearchCustomCharacterShareTwitterButtonFragment
    }
    viewer {
      ...FullSimplePostViewerFragment
    }
  }
`

const Fragment = graphql`
  fragment PublicClubCharacterFragment on Character
  @argumentDefinitions(
    first: {type: Int, defaultValue: 5}
    after: {type: String}
  )
  @refetchable(queryName: "PublicClubCharacterPostsPaginationQuery" ) {
    posts (
      first: $first,
      after: $after,
      sortBy: $sortBy,
      seed: $seed
    )
    @connection (key: "PublicClubCharacterPosts_posts") {
      edges {
        node {
          ...FullSimplePostFragment
        }
      }
      ...PostInfiniteScrollFragment
    }
  }
`

export default function PublicClubCharacter ({ query }: Props): JSX.Element {
  const queryData = usePreloadedQuery<PublicClubCharacterQuery>(
    Query,
    query
  )

  const {
    data,
    loadNext,
    hasNext,
    isLoadingNext
  } = usePaginationFragment<PublicClubCharacterQuery, any>(
    Fragment,
    queryData.character
  )

  if (queryData?.character == null) {
    return <NotFoundCharacter />
  }

  return (
    <>
      <PublicClubCharacterRichObject query={queryData.character} />
      <Stack spacing={8}>
        <Stack spacing={2}>
          <ClubCharacterRecommendations query={queryData.character.club} />
          <SearchSummary
            title={queryData.character.name}
            type={<Trans>Club Character</Trans>}
            totalPosts={queryData.character.totalPosts}
            totalLikes={queryData.character.totalLikes}
          />
          <HStack justify='space-between' spacing={2}>
            <HStack spacing={1}>
              <SearchCustomCharacterCopyLinkButton query={queryData.character} />
              <SearchCustomCharacterShareDiscordButton query={queryData.character} />
              <SearchCustomCharacterShareRedditButton query={queryData.character} />
              <SearchCustomCharacterShareTwitterButton query={queryData.character} />
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
            {({ index }) => (
              <FullSimplePost
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
