import { useFragment } from 'react-relay/hooks'
import type { BrowsePostsPreviewFragment$key } from '@//:artifacts/BrowsePostsPreviewFragment.graphql'
import type { BrowsePostsPreviewViewerFragment$key } from '@//:artifacts/BrowsePostsPreviewViewerFragment.graphql'
import { graphql, usePaginationFragment } from 'react-relay'
import { GlobalVideoManagerProvider } from '@//:modules/content/Posts'
import FullSimplePost
  from '@//:modules/content/Posts/components/PostNavigation/PostsInfiniteScroll/FullSimplePost/FullSimplePost'
import type { HomeQuery } from '@//:artifacts/HomeQuery.graphql'
import { Stack } from '@chakra-ui/react'
import LinkButton from '@//:modules/content/ThemeComponents/LinkButton/LinkButton'
import { Trans } from '@lingui/macro'
import { Icon } from '@//:modules/content/PageLayout'
import { ControlPlayButton } from '@//:assets/icons'

interface Props {
  postQuery: BrowsePostsPreviewFragment$key
  viewerQuery: BrowsePostsPreviewViewerFragment$key | null
}

const PostFragment = graphql`
  fragment BrowsePostsPreviewFragment on Query
  @argumentDefinitions(
    first: {type: Int, defaultValue: 9}
    after: {type: String}
  )
  @refetchable(queryName: "BrowsePostsPreviewPaginationQuery" ) {
    postsFeed (first: $first, after: $after, seed: $seed)
    @connection (key: "BrowsePostsPreview_postsFeed") {
      edges {
        node {
          ...FullSimplePostFragment
        }
      }
      ...PostInfiniteScrollFragment
    }
  }
`

const ViewerFragment = graphql`
  fragment BrowsePostsPreviewViewerFragment on Account {
    ...FullSimplePostViewerFragment
  }
`

export default function BrowsePostsPreview (props: Props): JSX.Element {
  const {
    postQuery,
    viewerQuery
  } = props

  const {
    data
  } = usePaginationFragment<HomeQuery, any>(
    PostFragment,
    postQuery
  )

  const viewerData = useFragment(ViewerFragment, viewerQuery)

  return (
    <GlobalVideoManagerProvider>
      <Stack spacing={16}>
        {data.postsFeed.edges.map((item, index) => (
          <FullSimplePost
            key={index}
            query={item.node}
            viewerQuery={viewerData}
          />
        ))}
        <LinkButton
          colorScheme='primary'
          w='100%'
          size='xl'
          href='/browse'
          rightIcon={<Icon icon={ControlPlayButton} w={4} h={4} fill='primary.900' />}
        >
          <Trans>
            See All Posts
          </Trans>
        </LinkButton>
      </Stack>
    </GlobalVideoManagerProvider>
  )
}
