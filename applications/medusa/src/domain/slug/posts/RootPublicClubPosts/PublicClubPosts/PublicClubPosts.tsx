import { PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import type { PublicClubPostsQuery } from '@//:artifacts/PublicClubPostsQuery.graphql'
import { graphql, usePaginationFragment } from 'react-relay'
import { GlobalVideoManagerProvider } from '@//:modules/content/Posts'
import PostsInfiniteScroll
  from '@//:modules/content/Posts/components/PostNavigation/PostsInfiniteScroll/PostsInfiniteScroll'
import { NotFoundClub } from '@//:modules/content/Placeholder'
import AccountInformationBanner
  from '../../../../../common/components/AccountInformationBanner/AccountInformationBanner'
import PublicClubPostsRichObject
  from '../../../../../common/rich-objects/slug/PublicClubPostsRichObject/PublicClubPostsRichObject'

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
    }
    viewer {
      ...PostsInfiniteScrollViewerFragment
      ...AccountInformationBannerFragment
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
        __typename
      }
      ...PostsInfiniteScrollFragment
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
      <AccountInformationBanner query={queryData.viewer} />
      <GlobalVideoManagerProvider>
        <PostsInfiniteScroll
          hasNext={hasNext}
          isLoadingNext={isLoadingNext}
          loadNext={loadNext}
          query={data.posts}
          viewerQuery={queryData.viewer}
        />
      </GlobalVideoManagerProvider>
    </>
  )
}
