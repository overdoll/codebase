import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { DescriptionPublicPostFragment$key } from '@//:artifacts/DescriptionPublicPostFragment.graphql'
import { DescriptionPublicPostViewerFragment$key } from '@//:artifacts/DescriptionPublicPostViewerFragment.graphql'
import { Stack } from '@chakra-ui/react'
import PostClickableCharacters
  from '@//:modules/content/HookedComponents/Post/fragments/Interact/PostClickableCharacters/PostClickableCharacters'
import PostClickableCategories
  from '@//:modules/content/HookedComponents/Post/fragments/Interact/PostClickableCategories/PostClickableCategories'
import PostFooterButtons
  from '@//:modules/content/HookedComponents/Post/fragments/Interact/PostFooterButtons/PostFooterButtons'
import ClubExternalLinks from '@//:modules/content/HookedComponents/Club/fragments/ClubExternalLinks/ClubExternalLinks'

interface Props {
  postQuery: DescriptionPublicPostFragment$key
  viewerQuery: DescriptionPublicPostViewerFragment$key | null
}

const PostFragment = graphql`
  fragment DescriptionPublicPostFragment on Post {
    club {
      ...ClubExternalLinksFragment
    }
    ...PostClickableCharactersFragment
    ...PostClickableCategoriesFragment
    ...PostFooterButtonsFragment
  }
`

const ViewerFragment = graphql`
  fragment DescriptionPublicPostViewerFragment on Account {
    ...PostFooterButtonsViewerFragment
  }
`

export default function DescriptionPublicPost ({
  postQuery,
  viewerQuery
}: Props): JSX.Element {
  const postData = useFragment(PostFragment, postQuery)
  const viewerData = useFragment(ViewerFragment, viewerQuery)

  // TODO add post header

  return (
    <Stack spacing={4}>
      <Stack spacing={2}>
        <ClubExternalLinks clubQuery={postData.club} />
        <PostFooterButtons postQuery={postData} viewerQuery={viewerData} />
      </Stack>
      <Stack spacing={2}>
        <PostClickableCharacters query={postData} />
        <PostClickableCategories query={postData} />
      </Stack>
    </Stack>
  )
}
