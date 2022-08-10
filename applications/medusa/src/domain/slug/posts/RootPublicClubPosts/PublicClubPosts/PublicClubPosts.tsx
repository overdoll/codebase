import { PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import type { PublicClubPostsQuery } from '@//:artifacts/PublicClubPostsQuery.graphql'
import { graphql, usePaginationFragment } from 'react-relay'
import { GlobalVideoManagerProvider } from '@//:modules/content/Posts'
import { NotFoundClub } from '@//:modules/content/Placeholder'
import AccountInformationBanner
  from '../../../../../common/components/AccountInformationBanner/AccountInformationBanner'
import PublicClubPostsRichObject
  from '../../../../../common/rich-objects/slug/PublicClubPostsRichObject/PublicClubPostsRichObject'
import { HStack, Stack } from '@chakra-ui/react'
import SearchButton from '../../../../../common/components/PageHeader/SearchButton/SearchButton'
import PostOrderButton from '../../../../../common/components/PageHeader/PostOrderButton/PostOrderButton'
import PostSupporterStatusButton
  from '../../../../../common/components/PageHeader/PostSupporterStatusButton/PostSupporterStatusButton'
import PublicClubPostsStructuredData
  from '../../../../../common/structured-data/slug/PublicClubPostsStructuredData/PublicClubPostsStructuredData'
import PostInfiniteScroll
  from '@//:modules/content/Posts/components/PostNavigation/PostInfiniteScroll/PostInfiniteScroll'
import FullClubPost from './FullClubPost/FullClubPost'
import ClubCharacterRecommendations
  from '../../../character/RootPublicClubCharacter/PublicClubCharacter/ClubCharacterRecommendations/ClubCharacterRecommendations'

interface Props {
  query: PreloadedQuery<PublicClubPostsQuery>
}

const Query = graphql`
  query PublicClubPostsQuery($slug: String!,
    $sortBy: PostsSort!,
    $categorySlugs: [String!],
    $seriesSlugs: [String!],
    $characterSlugs: [String!],
    $supporterOnlyStatus: [SupporterOnlyStatus!]
  ) {
    club(slug: $slug) {
      ...PublicClubPostsFragment
      ...PublicClubPostsRichObjectFragment
      ...PublicClubPostsStructuredDataFragment
      ...ClubCharacterRecommendationsFragment
    }
    viewer {
      ...AccountInformationBannerFragment
      ...FullClubPostViewerFragment
    }
  }
`

const Fragment = graphql`
  fragment PublicClubPostsFragment on Club
  @argumentDefinitions(
    first: {type: Int, defaultValue: 5}
    after: {type: String}
  )
  @refetchable(queryName: "ClubPublicPostsPaginationQuery" ) {
    posts (first: $first,
      after: $after,
      sortBy: $sortBy,
      categorySlugs: $categorySlugs,
      seriesSlugs: $seriesSlugs,
      characterSlugs: $characterSlugs,
      supporterOnlyStatus: $supporterOnlyStatus
    )
    @connection (key: "ClubPublicPosts_posts") {
      edges {
        node {
          ...FullClubPostFragment
        }
      }
      ...PostInfiniteScrollFragment
    }
  }
`

export default function PublicClubPosts (props: Props): JSX.Element {
  const queryData = usePreloadedQuery<PublicClubPostsQuery>(
    Query,
    props.query
  )

  if (queryData?.club == null) {
    return <NotFoundClub />
  }

  const {
    data,
    loadNext,
    hasNext,
    isLoadingNext
  } = usePaginationFragment<PublicClubPostsQuery, any>(
    Fragment,
    queryData.club
  )

  return (
    <>
      <PublicClubPostsRichObject clubQuery={queryData.club} />
      <PublicClubPostsStructuredData query={queryData.club} />
      <AccountInformationBanner query={queryData.viewer} />
      <Stack spacing={2}>
        <ClubCharacterRecommendations query={queryData.club} />
        <HStack justify='space-between' mt={2} spacing={2}>
          <HStack spacing={2}>
            <PostOrderButton />
            <PostSupporterStatusButton />
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
        >
          {({ index }) => (
            <FullClubPost
              query={data.posts.edges[index].node}
              viewerQuery={queryData.viewer}
            />
          )}
        </PostInfiniteScroll>
      </GlobalVideoManagerProvider>
    </>
  )
}
