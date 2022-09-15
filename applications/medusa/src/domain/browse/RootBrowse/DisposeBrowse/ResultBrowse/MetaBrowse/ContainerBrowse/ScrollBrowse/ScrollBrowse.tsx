import { useFragment } from 'react-relay/hooks'
import { graphql, usePaginationFragment } from 'react-relay'
import { ScrollBrowseFragment$key } from '@//:artifacts/ScrollBrowseFragment.graphql'
import { ResultBrowseQuery } from '@//:artifacts/ResultBrowseQuery.graphql'
import { ScrollBrowseViewerFragment$key } from '@//:artifacts/ScrollBrowseViewerFragment.graphql'
import PlatformPromoteAlert from '@//:common/components/PlatformPromoteAlert/PlatformPromoteAlert'
import FullSimplePost
  from '@//:modules/content/Posts/components/PostNavigation/PostInfiniteScroll/FullSimplePost/FullSimplePost'
import PostInfiniteScroll
  from '@//:modules/content/Posts/components/PostNavigation/PostInfiniteScroll/PostInfiniteScroll'

interface Props {
  rootQuery: ScrollBrowseFragment$key
  viewerQuery: ScrollBrowseViewerFragment$key | null
}

const RootFragment = graphql`
  fragment ScrollBrowseFragment on Query
  @argumentDefinitions(
    first: {type: Int, defaultValue: 5}
    after: {type: String}
  )
  @refetchable(queryName: "BrowsePostsPaginationQuery" ) {
    postsFeed (first: $first, after: $after, seed: $seed)
    @connection (key: "BrowsePosts_postsFeed") {
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
  fragment ScrollBrowseViewerFragment on Account {
    ...FullSimplePostViewerFragment
  }
`

export default function ScrollBrowse (props: Props): JSX.Element {
  const {
    rootQuery,
    viewerQuery
  } = props

  const {
    data,
    loadNext,
    hasNext,
    isLoadingNext
  } = usePaginationFragment<ResultBrowseQuery, any>(
    RootFragment,
    rootQuery
  )

  const viewerData = useFragment(ViewerFragment, viewerQuery)

  return (
    <PostInfiniteScroll
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
