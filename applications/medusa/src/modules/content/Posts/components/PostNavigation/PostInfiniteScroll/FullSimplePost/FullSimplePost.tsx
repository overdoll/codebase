import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { FullSimplePostFragment$key } from '@//:artifacts/FullSimplePostFragment.graphql'
import { FullSimplePostViewerFragment$key } from '@//:artifacts/FullSimplePostViewerFragment.graphql'
import { Stack } from '@chakra-ui/react'
import PostFooterButtons from '../../../PostInteraction/PostFooterButtons/PostFooterButtons'
import PostPublicHeader from '../../../PostInteraction/PostHeaders/PostPublicHeader/PostPublicHeader'
import { PreviewContent } from '../../../../../HookedComponents/Post'

interface Props {
  query: FullSimplePostFragment$key
  viewerQuery: FullSimplePostViewerFragment$key | null
}

const PostFragment = graphql`
  fragment FullSimplePostFragment on Post {
    ...PreviewContentFragment
    ...PostFooterButtonsFragment
    ...PostPublicHeaderFragment
  }
`

const ViewerFragment = graphql`
  fragment FullSimplePostViewerFragment on Account {
    ...PostGalleryPublicSimpleViewerFragment
    ...PostFooterButtonsViewerFragment
    ...PostPublicHeaderViewerFragment
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
      <PostPublicHeader redirectToPost descriptionProps={{ noOfLines: 1 }} postQuery={data} viewerQuery={viewerData} />
      <PreviewContent postQuery={data} />
      <PostFooterButtons postQuery={data} viewerQuery={viewerData} />
    </Stack>
  )
}
