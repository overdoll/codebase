import type { SuggestedPublicPostFragment$key } from '@//:artifacts/SuggestedPublicPostFragment.graphql'
import { graphql, usePaginationFragment } from 'react-relay'
import { ResultPublicPostQuery } from '@//:artifacts/ResultPublicPostQuery.graphql'
import { Heading, Stack } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import React from 'react'
import { PreviewPost, VerticalPaginationScroller } from '@//:modules/content/HookedComponents/Post'

interface Props {
  postQuery: SuggestedPublicPostFragment$key
}

const Fragment = graphql`
  fragment SuggestedPublicPostFragment on Post
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

export default function SuggestedPublicPost (props: Props): JSX.Element {
  const { postQuery } = props

  const {
    data,
    loadNext,
    hasNext,
    isLoadingNext
  } = usePaginationFragment<ResultPublicPostQuery, any>(
    Fragment,
    postQuery
  )

  return (
    <Stack spacing={4}>
      <Heading color='gray.00' fontSize='2xl'>
        <Trans>Suggested Posts</Trans>
      </Heading>
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
            postQuery={data.suggestedPosts.edges[index].node}
          />
        )}
      </VerticalPaginationScroller>
    </Stack>
  )
}
