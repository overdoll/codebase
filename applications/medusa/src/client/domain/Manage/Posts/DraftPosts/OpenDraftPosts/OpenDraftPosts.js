/**
 * @flow
 */
import type { Node } from 'react'
import { graphql, useQueryLoader } from 'react-relay/hooks'
import { usePaginationFragment } from 'react-relay'
import type { OpenDraftPostsFragment$key } from '@//:artifacts/OpenDraftPostsFragment.graphql'

type Props = {
  query: OpenDraftPostsFragment$key
}

const OpenDraftPostsGQL = graphql`
  fragment OpenDraftPostsFragment on Account
  @argumentDefinitions(
    first: {type: Int, defaultValue: 3}
    after: {type: String}
  )
  @refetchable(queryName: "OpenDraftPostsPaginationQuery" ) {
    posts (first: $first, after: $after)
    @connection(key: "OpenDraftPostsPaginationQuery_posts") {
      edges {
        node {
          id
          state
        }
      }
    }
  }
`

export default function OpenDraftPosts ({ query }: Props): Node {
  const { data, loadNext, hasNext, isLoadingNext } = usePaginationFragment<OpenDraftPostsFragment$key,
    _>(
      OpenDraftPostsGQL,
      query
    )

  return (
    <>

    </>
  )
}
