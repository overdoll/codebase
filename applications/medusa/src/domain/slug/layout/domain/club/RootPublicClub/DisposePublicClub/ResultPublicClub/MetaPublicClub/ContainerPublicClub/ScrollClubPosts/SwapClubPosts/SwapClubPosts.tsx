import { SwapClubPostsFragment$key } from '@//:artifacts/SwapClubPostsFragment.graphql'
import { graphql, usePaginationFragment } from 'react-relay'
import React from 'react'
import SwapPaginationScroller from '../../../../../../../../../components/SwapPaginationScroller/SwapPaginationScroller'
import type { ResultPublicClubQuery } from '@//:artifacts/ResultPublicClubQuery.graphql'
import ClubEmptyPosts from '../ClubEmptyPosts/ClubEmptyPosts'

interface Props {
  clubQuery: SwapClubPostsFragment$key
}

const Fragment = graphql`
  fragment SwapClubPostsFragment on Club
  @argumentDefinitions(
    first: {type: Int, defaultValue: 6}
    after: {type: String}
    seed: {type: String}
  )
  @refetchable(queryName: "ScrollClubPostsFragmentPaginationQuery" ) {
    posts(
      first: $first,
      after: $after,
      sortBy: NEW,
      seed: $seed)
    @connection (key: "ClubPostsPreview_posts") {
      edges {
        node {
          id
        }
      }
      ...SwapPaginationScrollerFragment
    }
    postsView
    ...ClubEmptyPostsFragment
  }
`

export default function SwapClubPosts (props: Props): JSX.Element {
  const { clubQuery } = props

  const {
    data,
    loadNext,
    hasNext,
    isLoadingNext
  } = usePaginationFragment<ResultPublicClubQuery, any>(
    Fragment,
    clubQuery
  )

  if (data.posts.edges.length < 1) {
    return (
      <ClubEmptyPosts clubQuery={data} />
    )
  }

  return (
    <SwapPaginationScroller
      type={data.postsView}
      limit={6}
      postConnectionQuery={data.posts}
      hasNext={hasNext}
      loadNext={loadNext}
      isLoadingNext={isLoadingNext}
    />
  )
}
