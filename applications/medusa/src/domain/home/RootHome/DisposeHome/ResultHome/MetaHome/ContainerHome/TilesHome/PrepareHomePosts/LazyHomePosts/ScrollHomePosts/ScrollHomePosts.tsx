import type { ScrollHomePostsFragment$key } from '@//:artifacts/ScrollHomePostsFragment.graphql'
import { graphql, usePaginationFragment } from 'react-relay'
import type { LazyHomePostsQuery } from '@//:artifacts/LazyHomePostsQuery.graphql'
import { Stack } from '@chakra-ui/react'
import LinkButton from '@//:modules/content/ThemeComponents/LinkButton/LinkButton'
import { Trans } from '@lingui/macro'
import PreviewPost from '@//:modules/content/HookedComponents/Post/fragments/Post/PreviewPost/PreviewPost'

interface Props {
  rootQuery: ScrollHomePostsFragment$key
}

const RootFragment = graphql`
  fragment ScrollHomePostsFragment on Query
  @argumentDefinitions(
    first: {type: Int, defaultValue: 5}
    after: {type: String}
    seed: {type: String}
  )
  @refetchable(queryName: "ScrollHomePostsPaginationQuery" ) {
    postsFeed (first: $first, after: $after, seed: $seed)
    @connection (key: "ScrollHomePosts_postsFeed") {
      edges {
        node {
          id
          ...PreviewPostFragment
        }
      }
    }
  }
`

export default function ScrollHomePosts (props: Props): JSX.Element {
  const {
    rootQuery
  } = props

  const {
    data
  } = usePaginationFragment<LazyHomePostsQuery, any>(
    RootFragment,
    rootQuery
  )

  return (
    <Stack spacing={16}>
      {data.postsFeed?.edges?.map((item) => (
        <PreviewPost key={item.node.id} postQuery={item.node} />
      ))}
      <LinkButton
        colorScheme='gray'
        w='100%'
        size='xl'
        href='/browse'
      >
        <Trans>
          See More Posts
        </Trans>
      </LinkButton>
    </Stack>
  )
}
