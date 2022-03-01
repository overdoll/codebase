import { PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import type { ClubPublicPostsQuery } from '@//:artifacts/ClubPublicPostsQuery.graphql'
import { graphql, usePaginationFragment } from 'react-relay'
import { GlobalVideoManagerProvider } from '@//:modules/content/Posts'
import PostsInfiniteScroll from '../../../../../../../components/PostsInfiniteScroll/PostsInfiniteScroll'
import { NotFoundClub } from '@//:modules/content/Placeholder'

interface Props {
  query: PreloadedQuery<ClubPublicPostsQuery>
}

const Query = graphql`
  query ClubPublicPostsQuery($slug: String!,
    $sortBy: PostsSort!,
    $categorySlugs: [String!],
    $seriesSlugs: [String!],
    $characterSlugs: [String!]) {
    club(slug: $slug) {
      slug
      ...ClubPublicPostsFragment
    }
    viewer {
      ...PostsInfiniteScrollViewerFragment
    }
  }
`

const Fragment = graphql`
  fragment ClubPublicPostsFragment on Club
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
      characterSlugs: $characterSlugs)
    @connection (key: "ClubPublicPosts_posts") {
      edges {
        __typename
      }
      ...PostsInfiniteScrollFragment
    }
  }
`

export default function ClubPublicPosts (props: Props): JSX.Element {
  const queryData = usePreloadedQuery<ClubPublicPostsQuery>(
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
  } = usePaginationFragment<ClubPublicPostsQuery, any>(
    Fragment,
    queryData.club
  )

  return (
    <GlobalVideoManagerProvider>
      <PostsInfiniteScroll
        hasNext={hasNext}
        isLoadingNext={isLoadingNext}
        loadNext={loadNext}
        query={data.posts}
        viewerQuery={queryData.viewer}
      />
    </GlobalVideoManagerProvider>
  )
}
