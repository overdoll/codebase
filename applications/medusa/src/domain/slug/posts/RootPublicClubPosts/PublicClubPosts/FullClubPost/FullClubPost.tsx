import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { FullClubPostFragment$key } from '@//:artifacts/FullClubPostFragment.graphql'
import { FullClubPostViewerFragment$key } from '@//:artifacts/FullClubPostViewerFragment.graphql'
import { Stack } from '@chakra-ui/react'
import PostFooterButtons from '@//:modules/content/Posts/components/PostInteraction/PostFooterButtons/PostFooterButtons'
import { useMemo } from 'react'
import PostPrivateHeader
  from '@//:modules/content/Posts/components/PostInteraction/PostHeaders/PostPrivateHeader/PostPrivateHeader'
import { PostGalleryPublicSimple } from '@//:modules/content/Posts'

interface Props {
  query: FullClubPostFragment$key
  viewerQuery: FullClubPostViewerFragment$key | null
  hideOverflow?: boolean
}

const PostFragment = graphql`
  fragment FullClubPostFragment on Post {
    id
    ...PostGalleryPublicSimpleFragment
    ...PostFooterButtonsFragment
    ...PostPrivateHeaderFragment
  }
`

const ViewerFragment = graphql`
  fragment FullClubPostViewerFragment on Account {
    ...PostGalleryPublicSimpleViewerFragment
    ...PostFooterButtonsViewerFragment
  }
`

export default function FullClubPost ({
  query,
  viewerQuery,
  hideOverflow = false
}: Props): JSX.Element {
  const data = useFragment<FullClubPostFragment$key>(PostFragment, query)
  const viewerData = useFragment<FullClubPostViewerFragment$key>(ViewerFragment, viewerQuery)

  const PostMemo = useMemo(() => (
    <PostGalleryPublicSimple hideOverflow={hideOverflow} postQuery={data} viewerQuery={viewerData} />), [data.id])

  return (
    <Stack spacing={2}>
      <PostPrivateHeader descriptionProps={{ noOfLines: 1 }} postQuery={data} />
      {PostMemo}
      <PostFooterButtons postQuery={data} viewerQuery={viewerData} />
    </Stack>
  )
}
