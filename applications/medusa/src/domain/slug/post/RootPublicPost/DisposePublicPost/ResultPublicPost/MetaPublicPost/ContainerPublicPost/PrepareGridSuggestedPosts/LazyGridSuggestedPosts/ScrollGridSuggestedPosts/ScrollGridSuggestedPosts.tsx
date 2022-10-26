import type { ScrollGridSuggestedPostsFragment$key } from '@//:artifacts/ScrollGridSuggestedPostsFragment.graphql'
import { graphql, usePaginationFragment } from 'react-relay'
import { LazyGridSuggestedPostsQuery } from '@//:artifacts/LazyGridSuggestedPostsQuery.graphql'
import React from 'react'
import GridPaginationScroller
  from '@//:modules/content/HookedComponents/Post/components/PaginationScroller/GridPaginationScroller/GridPaginationScroller'

interface Props {
  postQuery: ScrollGridSuggestedPostsFragment$key
}

const Fragment = graphql`
  fragment ScrollGridSuggestedPostsFragment on Post
  @argumentDefinitions(
    first: {type: Int, defaultValue: 6}
    after: {type: String}
  )
  @refetchable(queryName: "SuggestedPostsGridPaginationQuery" ) {
    suggestedPosts (first: $first, after: $after)
    @connection (key: "SuggestedPostsGrid_suggestedPosts") {
      edges {
        node {
          __typename
        }
      }
      ...GridPaginationScrollerFragment
    }
  }
`

export default function ScrollGridSuggestedPosts (props: Props): JSX.Element {
  const { postQuery } = props

  const {
    data,
    loadNext,
    hasNext,
    isLoadingNext
  } = usePaginationFragment<LazyGridSuggestedPostsQuery, any>(
    Fragment,
    postQuery
  )

  return (
    <GridPaginationScroller
      postConnectionQuery={data.suggestedPosts}
      hasNext={hasNext}
      loadNext={loadNext}
      isLoadingNext={isLoadingNext}
    />
  )
}
