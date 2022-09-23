import { graphql, usePaginationFragment } from 'react-relay'
import { ScrollSearchSeriesFragment$key } from '@//:artifacts/ScrollSearchSeriesFragment.graphql'
import { ResultSearchSeriesQuery } from '@//:artifacts/ResultSearchSeriesQuery.graphql'
import { PreviewPost, VerticalPaginationScroller } from '@//:modules/content/HookedComponents/Post'

interface Props {
  seriesQuery: ScrollSearchSeriesFragment$key
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
          ...PreviewPostFragment
        }
      }
      ...VerticalPaginationScrollerFragment
    }
  }
`

export default function ScrollSearchSeries (props: Props): JSX.Element {
  const {
    seriesQuery
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
