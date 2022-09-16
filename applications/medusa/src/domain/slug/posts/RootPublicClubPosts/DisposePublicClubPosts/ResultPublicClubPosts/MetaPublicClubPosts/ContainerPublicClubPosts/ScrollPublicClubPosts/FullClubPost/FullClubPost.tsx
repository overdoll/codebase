import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { FullClubPostFragment$key } from '@//:artifacts/FullClubPostFragment.graphql'
import { FullClubPostViewerFragment$key } from '@//:artifacts/FullClubPostViewerFragment.graphql'
import { Stack } from '@chakra-ui/react'
import PostFooterButtons from '@//:modules/content/Posts/components/PostInteraction/PostFooterButtons/PostFooterButtons'
import { useMemo } from 'react'
import { PostGalleryPublicSimple } from '@//:modules/content/Posts'
import PostPublicHeader
  from '@//:modules/content/Posts/components/PostInteraction/PostHeaders/PostPublicHeader/PostPublicHeader'
import PreviewGallery from '@//:modules/content/HookedComponents/Post/fragments/Gallery/PreviewGallery/PreviewGallery'
import { PreviewContent } from '@//:modules/content/HookedComponents/Post'

interface Props {
  query: FullClubPostFragment$key
  viewerQuery: FullClubPostViewerFragment$key | null
  hideOverflow?: boolean
}

const PostFragment = graphql`
  fragment FullClubPostFragment on Post {
    id
    ...PreviewContentFragment
    ...PostFooterButtonsFragment
    ...PostPublicHeaderFragment
  }
`

const ViewerFragment = graphql`
  fragment FullClubPostViewerFragment on Account {
    ...PostGalleryPublicSimpleViewerFragment
    ...PostFooterButtonsViewerFragment
    ...PostPublicHeaderViewerFragment
  }
`

export default function FullClubPost ({
  query,
  viewerQuery,
  hideOverflow = false
}: Props): JSX.Element {
  const data = useFragment<FullClubPostFragment$key>(PostFragment, query)
  const viewerData = useFragment<FullClubPostViewerFragment$key>(ViewerFragment, viewerQuery)

  return (
    <Stack spacing={2}>
      <PostPublicHeader redirectToPost postQuery={data} viewerQuery={viewerData} />
      <PreviewContent postQuery={data} />
      <PostFooterButtons postQuery={data} viewerQuery={viewerData} />
    </Stack>
  )
}
