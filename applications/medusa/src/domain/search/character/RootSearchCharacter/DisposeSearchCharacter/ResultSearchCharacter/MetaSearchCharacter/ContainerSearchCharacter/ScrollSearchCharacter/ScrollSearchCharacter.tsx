import { graphql, usePaginationFragment } from 'react-relay'
import { ScrollSearchCharacterFragment$key } from '@//:artifacts/ScrollSearchCharacterFragment.graphql'
import { ResultSearchCharacterQuery } from '@//:artifacts/ResultSearchCharacterQuery.graphql'
import { PreviewPost, VerticalPaginationScroller } from '@//:modules/content/HookedComponents/Post'

interface Props {
  characterQuery: ScrollSearchCharacterFragment$key
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
          ...PreviewPostFragment
        }
      }
      ...VerticalPaginationScrollerFragment
    }
  }
`

export default function ScrollSearchCharacter (props: Props): JSX.Element {
  const {
    characterQuery
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

  return (
    <VerticalPaginationScroller
      postConnectionQuery={data.posts}
      hasNext={hasNext}
      loadNext={loadNext}
      isLoadingNext={isLoadingNext}
    >
      {({
        index
      }) => (
        <PreviewPost
          postQuery={data.posts.edges[index].node}
        />
      )}
    </VerticalPaginationScroller>
  )
}
