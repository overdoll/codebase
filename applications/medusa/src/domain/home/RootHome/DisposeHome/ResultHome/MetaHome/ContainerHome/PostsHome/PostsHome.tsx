import type { PostsHomeFragment$key } from '@//:artifacts/PostsHomeFragment.graphql'
import { graphql, usePaginationFragment } from 'react-relay'
import type { ResultHomeQuery } from '@//:artifacts/ResultHomeQuery.graphql'
import { Stack } from '@chakra-ui/react'
import LinkButton from '@//:modules/content/ThemeComponents/LinkButton/LinkButton'
import { Trans } from '@lingui/macro'
import PreviewPost from '@//:modules/content/HookedComponents/Post/fragments/Post/PreviewPost/PreviewPost'

interface Props {
  rootQuery: PostsHomeFragment$key
}

const RootFragment = graphql`
  fragment PostsHomeFragment on Query
  @argumentDefinitions(
    first: {type: Int, defaultValue: 5}
    after: {type: String}
  )
  @refetchable(queryName: "BrowsePostsPreviewPaginationQuery" ) {
    postsFeed (first: $first, after: $after, seed: $seed)
    @connection (key: "BrowsePostsPreview_postsFeed") {
      edges {
        node {
          id
          ...PreviewPostFragment
        }
      }
    }
  }
`

export default function PostsHome (props: Props): JSX.Element {
  const {
    rootQuery
  } = props

  const {
    data
  } = usePaginationFragment<ResultHomeQuery, any>(
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
