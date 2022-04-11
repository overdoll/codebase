import { PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import type { SearchQuery } from '@//:artifacts/SearchQuery.graphql'
import { graphql, usePaginationFragment } from 'react-relay'
import { GlobalVideoManagerProvider } from '@//:modules/content/Posts'
import PostsInfiniteScroll from '../../../../modules/content/Posts/components/PostNavigation/PostsInfiniteScroll/PostsInfiniteScroll'

interface Props {
  query: PreloadedQuery<SearchQuery>
}

const Query = graphql`
  query SearchQuery(
    $sortBy: PostsSort!,
    $categorySlugs: [String!],
    $seriesSlugs: [String!],
    $characterSlugs: [String!]
  ) {
    ...SearchFragment
    viewer {
      ...PostsInfiniteScrollViewerFragment
    }
  }
`

const Fragment = graphql`
  fragment SearchFragment on Query
  @argumentDefinitions(
    first: {type: Int, defaultValue: 5}
    after: {type: String}
  )
  @refetchable(queryName: "SearchPostsPaginationQuery" ) {
    posts (first: $first,
      after: $after,
      sortBy: $sortBy,
      categorySlugs: $categorySlugs,
      seriesSlugs: $seriesSlugs,
      characterSlugs: $characterSlugs)
    @connection (key: "SearchPosts_posts") {
      edges {
        __typename
      }
      ...PostsInfiniteScrollFragment
    }
  }
`

export default function Search (props: Props): JSX.Element {
  const queryData = usePreloadedQuery<SearchQuery>(
    Query,
    props.query
  )

  const {
    data,
    loadNext,
    hasNext,
    isLoadingNext
  } = usePaginationFragment<SearchQuery, any>(
    Fragment, queryData
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
