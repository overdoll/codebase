import { useFragment } from 'react-relay/hooks'
import type { PostsHomeFragment$key } from '@//:artifacts/PostsHomeFragment.graphql'
import type { PostsHomeViewerFragment$key } from '@//:artifacts/PostsHomeViewerFragment.graphql'
import { graphql, usePaginationFragment } from 'react-relay'
import FullSimplePost
  from '@//:modules/content/Posts/components/PostNavigation/PostInfiniteScroll/FullSimplePost/FullSimplePost'
import type { ResultHomeQuery } from '@//:artifacts/ResultHomeQuery.graphql'
import { Stack } from '@chakra-ui/react'
import LinkButton from '@//:modules/content/ThemeComponents/LinkButton/LinkButton'
import { Trans } from '@lingui/macro'

interface Props {
  rootQuery: PostsHomeFragment$key
  viewerQuery: PostsHomeViewerFragment$key | null
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
          ...FullSimplePostFragment
        }
      }
      ...PostInfiniteScrollFragment
    }
  }
`

const ViewerFragment = graphql`
  fragment PostsHomeViewerFragment on Account {
    ...FullSimplePostViewerFragment
  }
`

export default function PostsHome (props: Props): JSX.Element {
  const {
    rootQuery,
    viewerQuery
  } = props

  const {
    data
  } = usePaginationFragment<ResultHomeQuery, any>(
    RootFragment,
    rootQuery
  )

  const viewerData = useFragment(ViewerFragment, viewerQuery)

  return (
    <Stack spacing={16}>
      {data.postsFeed?.edges?.map((item) => (
        <FullSimplePost
          key={item.node.id}
          query={item.node}
          viewerQuery={viewerData}
        />
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
