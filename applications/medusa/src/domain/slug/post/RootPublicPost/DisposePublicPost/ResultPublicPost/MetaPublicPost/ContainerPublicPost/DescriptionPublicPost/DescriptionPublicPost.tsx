import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { DescriptionPublicPostFragment$key } from '@//:artifacts/DescriptionPublicPostFragment.graphql'
import { DescriptionPublicPostViewerFragment$key } from '@//:artifacts/DescriptionPublicPostViewerFragment.graphql'
import { Stack } from '@chakra-ui/react'
import RepostPublicPost from './RepostPublicPost/RepostPublicPost'
import ClubPublicPost from './ClubPublicPost/ClubPublicPost'
import SavePublicPost from './SavePublicPost/SavePublicPost'
import TagsPublicPost from './TagsPublicPost/TagsPublicPost'

interface Props {
  postQuery: DescriptionPublicPostFragment$key
  viewerQuery: DescriptionPublicPostViewerFragment$key | null
}

const PostFragment = graphql`
  fragment DescriptionPublicPostFragment on Post {
    ...RepostPublicPostFragment
    ...ClubPublicPostFragment
    ...SavePublicPostFragment
    ...TagsPublicPostFragment
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
      <Stack spacing={3}>
        <RepostPublicPost postQuery={postData} />
        <SavePublicPost postQuery={postData} />
      </Stack>
      <ClubPublicPost postQuery={postData} viewerQuery={viewerData} />
      <TagsPublicPost postQuery={postData} />
    </Stack>
  )
}
