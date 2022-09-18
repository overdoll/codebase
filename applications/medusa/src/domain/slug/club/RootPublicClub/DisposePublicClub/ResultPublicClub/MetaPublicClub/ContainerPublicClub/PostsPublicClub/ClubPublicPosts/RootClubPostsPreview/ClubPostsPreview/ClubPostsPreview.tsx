import { graphql, usePaginationFragment } from 'react-relay'
import { ClubPostsPreviewFragment$key } from '@//:artifacts/ClubPostsPreviewFragment.graphql'
import type { ResultPublicClubQuery } from '@//:artifacts/ResultPublicClubQuery.graphql'
import { PreviewPost, VerticalPaginationScroller } from '@//:modules/content/HookedComponents/Post'

interface Props {
  clubQuery: ClubPostsPreviewFragment$key
}

const Fragment = graphql`
  fragment ClubPostsPreviewFragment on Club
  @argumentDefinitions(
    first: {type: Int, defaultValue: 5}
    after: {type: String}
  )
  @refetchable(queryName: "ClubPostsPreviewPaginationQuery" ) {
    clubPosts: posts(
      first: $first,
      after: $after,
      sortBy: ALGORITHM,
      seed: $seed)
    @connection (key: "ClubPostsPreview_clubPosts") {
      edges {
        node {
          ...PreviewPostFragment
        }
      }
      ...VerticalPaginationScrollerFragment
    }
  }
`

export default function ClubPostsPreview (props: Props): JSX.Element {
  const {
    clubQuery
  } = props

  const {
    data,
    hasNext,
    loadNext,
    isLoadingNext
  } = usePaginationFragment<ResultPublicClubQuery, any>(
    Fragment,
    clubQuery
  )

  return (
    <VerticalPaginationScroller
      postConnectionQuery={data.clubPosts}
      hasNext={hasNext}
      loadNext={loadNext}
      isLoadingNext={isLoadingNext}
    >
      {({
        index
      }) => (
        <PreviewPost
          postQuery={data.clubPosts.edges[index].node}
        />
      )}
    </VerticalPaginationScroller>
  )
}
