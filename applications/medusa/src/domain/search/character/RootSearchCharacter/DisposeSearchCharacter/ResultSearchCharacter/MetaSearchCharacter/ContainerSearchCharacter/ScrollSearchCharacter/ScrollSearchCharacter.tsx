import { useFragment } from 'react-relay/hooks'
import { graphql, usePaginationFragment } from 'react-relay'
import { ScrollSearchCharacterFragment$key } from '@//:artifacts/ScrollSearchCharacterFragment.graphql'
import { ScrollSearchCharacterViewerFragment$key } from '@//:artifacts/ScrollSearchCharacterViewerFragment.graphql'
import { ResultSearchCharacterQuery } from '@//:artifacts/ResultSearchCharacterQuery.graphql'
import PostInfiniteScroll
  from '@//:modules/content/Posts/components/PostNavigation/PostInfiniteScroll/PostInfiniteScroll'
import PlatformPromoteAlert from '@//:common/components/PlatformPromoteAlert/PlatformPromoteAlert'
import FullSimplePost
  from '@//:modules/content/Posts/components/PostNavigation/PostInfiniteScroll/FullSimplePost/FullSimplePost'

interface Props {
  characterQuery: ScrollSearchCharacterFragment$key
  viewerQuery: ScrollSearchCharacterViewerFragment$key | null
}

const Fragment = graphql`
  fragment ScrollSearchCharacterFragment on Character
  @argumentDefinitions(
    first: {type: Int, defaultValue: 5}
    after: {type: String}
  )
  @refetchable(queryName: "SearchCharacterPostsPaginationQuery" ) {
    posts (
      first: $first,
      after: $after,
      sortBy: $sortBy,
      seed: $seed
    )
    @connection (key: "SearchCharacterPosts_posts") {
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
  fragment ScrollSearchCharacterViewerFragment on Account {
    ...FullSimplePostViewerFragment
  }
`

export default function ScrollSearchCharacter (props: Props): JSX.Element {
  const {
    characterQuery,
    viewerQuery
  } = props

  const {
    data,
    loadNext,
    hasNext,
    isLoadingNext
  } = usePaginationFragment<ResultSearchCharacterQuery, any>(
    Fragment,
    characterQuery
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
