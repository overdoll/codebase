import { graphql, usePaginationFragment } from 'react-relay'
import { ScrollRandomFragment$key } from '@//:artifacts/ScrollRandomFragment.graphql'
import { ResultRandomQuery } from '@//:artifacts/ResultRandomQuery.graphql'
import { PreviewPost, VerticalPaginationScroller } from '@//:modules/content/HookedComponents/Post'

interface Props {
  rootQuery: ScrollRandomFragment$key
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
      edges {
        node {
          ...PreviewPostFragment
        }
      }
      ...VerticalPaginationScrollerFragment
    }
  }
`

export default function ScrollRandom (props: Props): JSX.Element {
  const {
    rootQuery
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

  return (
    <VerticalPaginationScroller
      postConnectionQuery={data.postsFeed}
      hasNext={hasNext}
      loadNext={loadNext}
      isLoadingNext={isLoadingNext}
    >
      {({
        index
      }) => (
        <PreviewPost
          postQuery={data.postsFeed.edges[index].node}
        />
      )}
    </VerticalPaginationScroller>
  )
}
