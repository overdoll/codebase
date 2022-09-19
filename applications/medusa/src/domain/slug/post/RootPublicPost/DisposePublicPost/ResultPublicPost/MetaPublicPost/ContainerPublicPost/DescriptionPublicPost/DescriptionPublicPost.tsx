import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { DescriptionPublicPostFragment$key } from '@//:artifacts/DescriptionPublicPostFragment.graphql'
import { DescriptionPublicPostViewerFragment$key } from '@//:artifacts/DescriptionPublicPostViewerFragment.graphql'
import { Stack } from '@chakra-ui/react'
import PostClickableCharacters
  from '@//:modules/content/HookedComponents/Post/fragments/Interact/PostClickableCharacters/PostClickableCharacters'
import PostClickableCategories
  from '@//:modules/content/HookedComponents/Post/fragments/Interact/PostClickableCategories/PostClickableCategories'
import RepostPublicPost from './RepostPublicPost/RepostPublicPost'
import ClubPublicPost from './ClubPublicPost/ClubPublicPost'

interface Props {
  postQuery: DescriptionPublicPostFragment$key
  viewerQuery: DescriptionPublicPostViewerFragment$key | null
}

const PostFragment = graphql`
  fragment DescriptionPublicPostFragment on Post {
    ...PostClickableCharactersFragment
    ...PostClickableCategoriesFragment
    ...RepostPublicPostFragment
    ...ClubPublicPostFragment
  }
`

const ViewerFragment = graphql`
  fragment DescriptionPublicPostViewerFragment on Account {
    ...ClubPublicPostViewerFragment
  }
`

export default function DescriptionPublicPost (props: Props): JSX.Element {
  const {
    postQuery,
    viewerQuery
  } = props

  const postData = useFragment(PostFragment, postQuery)
  const viewerData = useFragment(ViewerFragment, viewerQuery)

  return (
    <Stack spacing={6}>
      <RepostPublicPost postQuery={postData} />
      <ClubPublicPost postQuery={postData} viewerQuery={viewerData} />
      <PostClickableCharacters query={postData} />
      <PostClickableCategories query={postData} />
    </Stack>
  )
}
