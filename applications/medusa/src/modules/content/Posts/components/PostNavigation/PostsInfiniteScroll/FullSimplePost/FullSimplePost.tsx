import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { FullSimplePostFragment$key } from '@//:artifacts/FullSimplePostFragment.graphql'
import { FullSimplePostViewerFragment$key } from '@//:artifacts/FullSimplePostViewerFragment.graphql'
import { Stack } from '@chakra-ui/react'
import { PostGalleryPublicSimple } from '../../../../index'
import PostHeader from '../../../PostInteraction/PostHeader/PostHeader'
import PostFooterButtons from '../../../PostInteraction/PostFooterButtons/PostFooterButtons'

interface Props {
  query: FullSimplePostFragment$key
  viewerQuery: FullSimplePostViewerFragment$key | null
}

const PostFragment = graphql`
  fragment FullSimplePostFragment on Post {
    ...PostGalleryPublicSimpleFragment
    ...PostHeaderFragment
    ...PostFooterButtonsFragment
  }
`

const ViewerFragment = graphql`
  fragment FullSimplePostViewerFragment on Account {
    ...PostHeaderViewerFragment
    ...PostGalleryPublicSimpleViewerFragment
    ...PostFooterButtonsViewerFragment
  }
`

export default function FullSimplePost ({
  query,
  viewerQuery
}: Props): JSX.Element {
  const data = useFragment<FullSimplePostFragment$key>(PostFragment, query)
  const viewerData = useFragment<FullSimplePostViewerFragment$key>(ViewerFragment, viewerQuery)

  return (
    <Stack spacing={2}>
      <PostHeader postQuery={data} viewerQuery={viewerData} />
      <PostGalleryPublicSimple postQuery={data} viewerQuery={viewerData} />
      <PostFooterButtons postQuery={data} viewerQuery={viewerData} />
    </Stack>
  )
}
