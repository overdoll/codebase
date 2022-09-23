import { graphql, usePaginationFragment } from 'react-relay'
import { ScrollNewFragment$key } from '@//:artifacts/ScrollNewFragment.graphql'
import { ResultNewQuery } from '@//:artifacts/ResultNewQuery.graphql'
import { PreviewPost, VerticalPaginationScroller } from '@//:modules/content/HookedComponents/Post'

interface Props {
  rootQuery: ScrollNewFragment$key
}

const RootFragment = graphql`
  fragment ScrollNewFragment on Query
  @argumentDefinitions(
    first: {type: Int, defaultValue: 5}
    after: {type: String}
  )
  @refetchable(queryName: "NewPostsPaginationQuery" ) {
    posts (first: $first, after: $after, state: PUBLISHED, sortBy: NEW)
    @connection (key: "NewPosts_posts") {
      edges {
        node {
          ...PreviewPostFragment
        }
      }
      ...VerticalPaginationScrollerFragment
    }
  }
`

export default function ScrollNew (props: Props): JSX.Element {
  const {
    rootQuery
  } = props

  const {
    data,
    loadNext,
    hasNext,
    isLoadingNext
  } = usePaginationFragment<ResultNewQuery, any>(
    RootFragment,
    rootQuery
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
