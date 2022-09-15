import { useFragment } from 'react-relay/hooks'
import { graphql, usePaginationFragment } from 'react-relay'
import { ScrollRandomFragment$key } from '@//:artifacts/ScrollRandomFragment.graphql'
import { ResultRandomQuery } from '@//:artifacts/ResultRandomQuery.graphql'
import { ScrollRandomViewerFragment$key } from '@//:artifacts/ScrollRandomViewerFragment.graphql'
import PlatformPromoteAlert from '@//:common/components/PlatformPromoteAlert/PlatformPromoteAlert'
import FullSimplePost
  from '@//:modules/content/Posts/components/PostNavigation/PostInfiniteScroll/FullSimplePost/FullSimplePost'
import PostInfiniteScroll
  from '@//:modules/content/Posts/components/PostNavigation/PostInfiniteScroll/PostInfiniteScroll'

interface Props {
  rootQuery: ScrollRandomFragment$key
  viewerQuery: ScrollRandomViewerFragment$key | null
}

const RootFragment = graphql`
  fragment ScrollRandomFragment on Query
  @argumentDefinitions(
    first: {type: Int, defaultValue: 5}
    after: {type: String}
  )
  @refetchable(queryName: "RandomPostsPaginationQuery" ) {
    postsFeed (first: $first, after: $after, seed: $seed)
    @connection (key: "RandomPosts_postsFeed") {
      pageInfo {
        startCursor
      }
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
  fragment ScrollRandomViewerFragment on Account {
    ...FullSimplePostViewerFragment
  }
`

export default function ScrollRandom (props: Props): JSX.Element {
  const {
    rootQuery,
    viewerQuery
  } = props

  const {
    data,
    loadNext,
    hasNext,
    isLoadingNext
  } = usePaginationFragment<ResultRandomQuery, any>(
    RootFragment,
    rootQuery
  )

  const viewerData = useFragment(ViewerFragment, viewerQuery)

  return (
    <PostInfiniteScroll
      key={data.postsFeed.pageInfo.startCursor}
      query={data.postsFeed}
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
          query={data.postsFeed.edges[index].node}
          viewerQuery={viewerData}
        />
      )}
    </PostInfiniteScroll>
  )
}
