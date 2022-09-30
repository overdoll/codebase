import type { ScrollSuggestedPostsFragment$key } from '@//:artifacts/ScrollSuggestedPostsFragment.graphql'
import { graphql, usePaginationFragment } from 'react-relay'
import { LazySuggestedPostsQuery } from '@//:artifacts/LazySuggestedPostsQuery.graphql'
import React from 'react'
import { PreviewPost, VerticalPaginationScroller } from '@//:modules/content/HookedComponents/Post'
import { PreviewPostFragment$key } from '@//:artifacts/PreviewPostFragment.graphql'

interface Props {
  postQuery: ScrollSuggestedPostsFragment$key
}

const Fragment = graphql`
  fragment ScrollSuggestedPostsFragment on Post
  @argumentDefinitions(
    first: {type: Int, defaultValue: 5}
    after: {type: String}
  )
  @refetchable(queryName: "SuggestedPostsPaginationQuery" ) {
    suggestedPosts (first: $first, after: $after)
    @connection (key: "SuggestedPosts_suggestedPosts") {
      edges {
        node {
          ...PreviewPostFragment
        }
      }
      ...VerticalPaginationScrollerFragment
    }
  }
`

export default function ScrollSuggestedPosts (props: Props): JSX.Element {
  const { postQuery } = props

  const {
    data,
    loadNext,
    hasNext,
    isLoadingNext
  } = usePaginationFragment<LazySuggestedPostsQuery, any>(
    Fragment,
    postQuery
  )

  return (
    <VerticalPaginationScroller
      postConnectionQuery={data.suggestedPosts}
      hasNext={hasNext}
      loadNext={loadNext}
      isLoadingNext={isLoadingNext}
    >
      {({
        index
      }) => (
        <PreviewPost
          postQuery={data?.suggestedPosts?.edges?.[index]?.node as PreviewPostFragment$key}
        />
      )}
    </VerticalPaginationScroller>
  )
}
