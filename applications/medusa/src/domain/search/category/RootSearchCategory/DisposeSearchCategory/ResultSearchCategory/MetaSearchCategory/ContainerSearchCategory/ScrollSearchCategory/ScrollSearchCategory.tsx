import { useFragment } from 'react-relay/hooks'
import { graphql, usePaginationFragment } from 'react-relay'
import { ScrollSearchCategoryFragment$key } from '@//:artifacts/ScrollSearchCategoryFragment.graphql'
import { ScrollSearchCategoryViewerFragment$key } from '@//:artifacts/ScrollSearchCategoryViewerFragment.graphql'
import { ResultSearchCategoryQuery } from '@//:artifacts/ResultSearchCategoryQuery.graphql'
import PlatformPromoteAlert from '@//:common/components/PlatformPromoteAlert/PlatformPromoteAlert'
import FullSimplePost
  from '@//:modules/content/Posts/components/PostNavigation/PostInfiniteScroll/FullSimplePost/FullSimplePost'
import PostInfiniteScroll
  from '@//:modules/content/Posts/components/PostNavigation/PostInfiniteScroll/PostInfiniteScroll'

interface Props {
  categoryQuery: ScrollSearchCategoryFragment$key
  viewerQuery: ScrollSearchCategoryViewerFragment$key | null
}

const Fragment = graphql`
  fragment ScrollSearchCategoryFragment on Category
  @argumentDefinitions(
    first: {type: Int, defaultValue: 5}
    after: {type: String}
  )
  @refetchable(queryName: "SearchCategoryPostsPaginationQuery" ) {
    posts (
      first: $first,
      after: $after,
      sortBy: $sortBy,
      seed: $seed
    )
    @connection (key: "SearchCategoryPosts_posts") {
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
  fragment ScrollSearchCategoryViewerFragment on Account {
    ...FullSimplePostViewerFragment
  }
`

export default function ScrollSearchCategory (props: Props): JSX.Element {
  const {
    categoryQuery,
    viewerQuery
  } = props

  const {
    data,
    loadNext,
    hasNext,
    isLoadingNext
  } = usePaginationFragment<ResultSearchCategoryQuery, any>(
    Fragment,
    categoryQuery
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
