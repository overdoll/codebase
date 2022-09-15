import { useFragment } from 'react-relay/hooks'
import { graphql, usePaginationFragment } from 'react-relay'
import { ScrollSearchSeriesFragment$key } from '@//:artifacts/ScrollSearchSeriesFragment.graphql'
import { ScrollSearchSeriesViewerFragment$key } from '@//:artifacts/ScrollSearchSeriesViewerFragment.graphql'
import PostInfiniteScroll
  from '@//:modules/content/Posts/components/PostNavigation/PostInfiniteScroll/PostInfiniteScroll'
import PlatformPromoteAlert from '@//:common/components/PlatformPromoteAlert/PlatformPromoteAlert'
import FullSimplePost
  from '@//:modules/content/Posts/components/PostNavigation/PostInfiniteScroll/FullSimplePost/FullSimplePost'
import { ResultSearchSeriesQuery } from '@//:artifacts/ResultSearchSeriesQuery.graphql'

interface Props {
  seriesQuery: ScrollSearchSeriesFragment$key
  viewerQuery: ScrollSearchSeriesViewerFragment$key | null
}

const Fragment = graphql`
  fragment ScrollSearchSeriesFragment on Series
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

const ViewerFragment = graphql`
  fragment ScrollSearchSeriesViewerFragment on Account {
    ...FullSimplePostViewerFragment
  }
`

export default function ScrollSearchSeries (props: Props): JSX.Element {
  const {
    seriesQuery,
    viewerQuery
  } = props

  const {
    data,
    loadNext,
    hasNext,
    isLoadingNext
  } = usePaginationFragment<ResultSearchSeriesQuery, any>(
    Fragment,
    seriesQuery
  )
  const viewerData = useFragment(ViewerFragment, viewerQuery)

  return (
    <PostInfiniteScroll
      query={data.posts}
      hasNext={hasNext}
      loadNext={loadNext}
      isLoadingNext={isLoadingNext}
      endOfTree={<PlatformPromoteAlert />}
    >
      {({
        index,
        key
      }) => (
        <FullSimplePost
          key={key}
          query={data.posts.edges[index].node}
          viewerQuery={viewerData}
        />
      )}
    </PostInfiniteScroll>
  )
}
