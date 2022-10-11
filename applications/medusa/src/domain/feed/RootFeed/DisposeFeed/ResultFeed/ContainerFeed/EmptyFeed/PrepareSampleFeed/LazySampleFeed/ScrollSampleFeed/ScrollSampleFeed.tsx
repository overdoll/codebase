import type { ScrollSampleFeedFragment$key } from '@//:artifacts/ScrollSampleFeedFragment.graphql'
import { graphql, usePaginationFragment } from 'react-relay'
import type { LazySampleFeedQuery } from '@//:artifacts/LazySampleFeedQuery.graphql'
import { Stack } from '@chakra-ui/react'
import PreviewPost from '@//:modules/content/HookedComponents/Post/fragments/Post/PreviewPost/PreviewPost'

interface Props {
  rootQuery: ScrollSampleFeedFragment$key
}

const RootFragment = graphql`
  fragment ScrollSampleFeedFragment on Query
  @argumentDefinitions(
    first: {type: Int, defaultValue: 3}
    after: {type: String}
  )
  @refetchable(queryName: "ScrollSampleFeedPaginationQuery" ) {
    postsFeed (first: $first, after: $after)
    @connection (key: "ScrollSampleFeed_postsFeed") {
      edges {
        node {
          id
          ...PreviewPostFragment
        }
      }
    }
  }
`

export default function ScrollSampleFeed (props: Props): JSX.Element {
  const {
    rootQuery
  } = props

  const {
    data
  } = usePaginationFragment<LazySampleFeedQuery, any>(
    RootFragment,
    rootQuery
  )

  return (
    <Stack spacing={16}>
      {data.postsFeed?.edges?.map((item) => (
        <PreviewPost key={item.node.id} postQuery={item.node} />
      ))}
    </Stack>
  )
}
