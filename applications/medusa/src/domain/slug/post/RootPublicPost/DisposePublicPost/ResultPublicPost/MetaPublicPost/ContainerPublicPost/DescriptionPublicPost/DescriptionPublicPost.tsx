import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { DescriptionPublicPostFragment$key } from '@//:artifacts/DescriptionPublicPostFragment.graphql'
import { DescriptionPublicPostViewerFragment$key } from '@//:artifacts/DescriptionPublicPostViewerFragment.graphql'
import { Stack } from '@chakra-ui/react'
import RepostPublicPost from './RepostPublicPost/RepostPublicPost'
import ClubPublicPost from './ClubPublicPost/ClubPublicPost'
import SavePublicPost from './SavePublicPost/SavePublicPost'
import TagsPublicPost from './TagsPublicPost/TagsPublicPost'
import MenuPublicPost from './MenuPublicPost/MenuPublicPost'

interface Props {
  postQuery: DescriptionPublicPostFragment$key
  viewerQuery: DescriptionPublicPostViewerFragment$key | null
}

const PostFragment = graphql`
  fragment DescriptionPublicPostFragment on Post {
    id
    ...RepostPublicPostFragment
    ...ClubPublicPostFragment
    ...SavePublicPostFragment
    ...TagsPublicPostFragment
    ...MenuPublicPostFragment
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
      <ClubPublicPost postQuery={postData} viewerQuery={viewerData} />
      <SavePublicPost postQuery={postData} />
      <RepostPublicPost postQuery={postData} />
      <TagsPublicPost postQuery={postData} />
      <MenuPublicPost postQuery={postData} />
    </Stack>
  )
}
