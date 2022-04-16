import { PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import type { PublicClubPostsQuery } from '@//:artifacts/PublicClubPostsQuery.graphql'
import { graphql, usePaginationFragment } from 'react-relay'
import { GlobalVideoManagerProvider } from '@//:modules/content/Posts'
import PostsInfiniteScroll from '../../../../modules/content/Posts/components/PostNavigation/PostsInfiniteScroll/PostsInfiniteScroll'
import { NotFoundClub } from '@//:modules/content/Placeholder'
import { Helmet } from 'react-helmet-async'

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
      slug
      name
      ...PublicClubPostsFragment
    }
    viewer {
      ...PostsInfiniteScrollViewerFragment
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
      <Helmet>
        <title>
          {queryData.club.name}'s Posts :: overdoll.com/{queryData.club.slug}
        </title>
      </Helmet>
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