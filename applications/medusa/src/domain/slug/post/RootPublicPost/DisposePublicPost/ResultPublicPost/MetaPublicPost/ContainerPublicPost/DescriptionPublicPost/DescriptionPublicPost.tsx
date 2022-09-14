import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { DescriptionPublicPostFragment$key } from '@//:artifacts/DescriptionPublicPostFragment.graphql'
import { DescriptionPublicPostViewerFragment$key } from '@//:artifacts/DescriptionPublicPostViewerFragment.graphql'
import { Stack } from '@chakra-ui/react'
import PostClickableCharacters
  from '@//:modules/content/Posts/components/PostInteraction/PostClickableCharacters/PostClickableCharacters'
import PostClickableCategories
  from '@//:modules/content/Posts/components/PostInteraction/PostClickableCategories/PostClickableCategories'
import PostFooterButtons from '@//:modules/content/Posts/components/PostInteraction/PostFooterButtons/PostFooterButtons'
import PostPublicHeader
  from '@//:modules/content/Posts/components/PostInteraction/PostHeaders/PostPublicHeader/PostPublicHeader'
import PostClubLinks from '@//:modules/content/Posts/components/PostData/PostClubLinks/PostClubLinks'

interface Props {
  postQuery: DescriptionPublicPostFragment$key
  viewerQuery: DescriptionPublicPostViewerFragment$key | null
}

const PostFragment = graphql`
  fragment DescriptionPublicPostFragment on Post {
    id
    club {
      ...PostClubLinksFragment
    }
    ...PostClickableCharactersFragment
    ...PostClickableCategoriesFragment
    ...PostFooterButtonsFragment
    ...PostPublicHeaderFragment
  }
`

const ViewerFragment = graphql`
  fragment DescriptionPublicPostViewerFragment on Account {
    ...PostFooterButtonsViewerFragment
    ...PostPublicHeaderViewerFragment
  }
`

export default function DescriptionPublicPost ({
  postQuery,
  viewerQuery
}: Props): JSX.Element {
  const postData = useFragment(PostFragment, postQuery)
  const viewerData = useFragment(ViewerFragment, viewerQuery)

  return (
    <Stack spacing={4}>
      <Stack spacing={2}>
        <PostPublicHeader postQuery={postData} viewerQuery={viewerData} />
        <PostClubLinks query={postData.club} />
        <PostFooterButtons postQuery={postData} viewerQuery={viewerData} />
      </Stack>
      <Stack spacing={2}>
        <PostClickableCharacters query={postData} />
        <PostClickableCategories query={postData} />
      </Stack>
    </Stack>
  )
}
