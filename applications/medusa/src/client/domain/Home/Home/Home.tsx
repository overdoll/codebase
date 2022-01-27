import { PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import type { HomeQuery } from '@//:artifacts/HomeQuery.graphql'
import { graphql, usePaginationFragment } from 'react-relay'
import { GlobalVideoManagerProvider } from '@//:modules/content/Posts'
import PostsInfiniteScroll from '../../../components/PostsInfiniteScroll/PostsInfiniteScroll'
import FloatingGeneralSearchButton from '../../../components/FloatingGeneralSearchButton/FloatingGeneralSearchButton'

interface Props {
  query: PreloadedQuery<HomeQuery>
}

const Query = graphql`
  query HomeQuery {
    ...HomeFragment
    viewer {
      ...PostsInfiniteScrollViewerFragment
    }
  }
`

const Fragment = graphql`
  fragment HomeFragment on Query
  @argumentDefinitions(
    first: {type: Int, defaultValue: 5}
    after: {type: String}
  )
  @refetchable(queryName: "HomePostsPaginationQuery" ) {
    posts (first: $first, after: $after, sortBy: TOP)
    @connection (key: "HomePosts_posts") {
      edges {
        __typename
      }
      ...PostsInfiniteScrollFragment
    }
  }
`

export default function Home (props: Props): JSX.Element {
  const queryData = usePreloadedQuery<HomeQuery>(
    Query,
    props.query
  )

  const {
    data,
    loadNext,
    hasNext,
    isLoadingNext
  } = usePaginationFragment<HomeQuery, any>(
    Fragment,
    queryData
  )

  return (
    <GlobalVideoManagerProvider>
      <FloatingGeneralSearchButton
        routeTo='/search'
      />
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
