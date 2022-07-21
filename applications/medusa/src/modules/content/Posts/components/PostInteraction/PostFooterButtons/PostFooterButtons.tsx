import { graphql, useFragment } from 'react-relay/hooks'
import type { PostFooterButtonsFragment$key } from '@//:artifacts/PostFooterButtonsFragment.graphql'
import type { PostFooterButtonsViewerFragment$key } from '@//:artifacts/PostFooterButtonsViewerFragment.graphql'
import { HStack } from '@chakra-ui/react'
import PostMenuButton from './PostMenuButton/PostMenuButton'
import PostLikeButton from './PostLikeButton/PostLikeButton'
import PostCopyLinkButton from './PostCopyLinkButton/PostCopyLinkButton'

interface Props {
  postQuery: PostFooterButtonsFragment$key
  viewerQuery: PostFooterButtonsViewerFragment$key | null
}

const PostFragment = graphql`
  fragment PostFooterButtonsFragment on Post {
    ...PostMenuButtonFragment
    ...PostLikeButtonFragment
    ...PostCopyLinkButtonFragment
  }
`
const ViewerFragment = graphql`
  fragment PostFooterButtonsViewerFragment on Account {
    ...PostMenuButtonViewerFragment
    ...PostLikeButtonViewerFragment
  }
`

export default function PostFooterButtons ({
  postQuery,
  viewerQuery
}: Props): JSX.Element {
  const postData = useFragment(PostFragment, postQuery)
  const viewerData = useFragment(ViewerFragment, viewerQuery)

  return (
    <HStack w='100%' justify='flex-end' spacing={1}>
      <PostMenuButton postQuery={postData} viewerQuery={viewerData} />
      <PostCopyLinkButton query={postData} />
      <PostLikeButton postQuery={postData} viewerQuery={viewerData} />
    </HStack>
  )
}
