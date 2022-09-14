import { useFragment } from 'react-relay/hooks'
import { graphql, usePaginationFragment } from 'react-relay'
import { ScrollPublicClubCharacterFragment$key } from '@//:artifacts/ScrollPublicClubCharacterFragment.graphql'
import {
  ScrollPublicClubCharacterViewerFragment$key
} from '@//:artifacts/ScrollPublicClubCharacterViewerFragment.graphql'
import { ResultPublicClubCharacterQuery } from '@//:artifacts/ResultPublicClubCharacterQuery.graphql'
import PostInfiniteScroll
  from '@//:modules/content/Posts/components/PostNavigation/PostInfiniteScroll/PostInfiniteScroll'
import PlatformPromoteAlert from '@//:common/components/PlatformPromoteAlert/PlatformPromoteAlert'
import FullSimplePost
  from '@//:modules/content/Posts/components/PostNavigation/PostInfiniteScroll/FullSimplePost/FullSimplePost'

interface Props {
  characterQuery: ScrollPublicClubCharacterFragment$key
  viewerQuery: ScrollPublicClubCharacterViewerFragment$key | null
}

const Fragment = graphql`
  fragment ScrollPublicClubCharacterFragment on Character
  @argumentDefinitions(
    first: {type: Int, defaultValue: 5}
    after: {type: String}
  )
  @refetchable(queryName: "PublicClubCharacterPostsPaginationQuery" ) {
    posts (
      first: $first,
      after: $after,
      sortBy: $sortBy,
      seed: $seed
    )
    @connection (key: "PublicClubCharacterPosts_posts") {
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
  fragment ScrollPublicClubCharacterViewerFragment on Account {
    ...FullSimplePostViewerFragment
  }
`

export default function ScrollPublicClubCharacter (props: Props): JSX.Element {
  const {
    characterQuery,
    viewerQuery
  } = props

  const {
    data,
    loadNext,
    hasNext,
    isLoadingNext
  } = usePaginationFragment<ResultPublicClubCharacterQuery, any>(
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
