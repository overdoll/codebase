import type { PostHeaderFragment$key } from '@//:artifacts/PostHeaderFragment.graphql'
import type { PostHeaderViewerFragment$key } from '@//:artifacts/PostHeaderViewerFragment.graphql'
import { graphql } from 'react-relay'
import { useFragment } from 'react-relay/hooks'
import { ButtonProps, HStack } from '@chakra-ui/react'
import { PostHeaderClub } from '../../../index'
import PostJoinClub from '../PostJoinClub/PostJoinClub'

interface Props extends ButtonProps {
  postQuery: PostHeaderFragment$key
  viewerQuery: PostHeaderViewerFragment$key | null
}

const PostFragment = graphql`
  fragment PostHeaderFragment on Post {
    club {
      ...PostJoinClubFragment
    }
    ...PostHeaderClubFragment
  }
`

const ViewerFragment = graphql`
  fragment PostHeaderViewerFragment on Account {
    ...PostJoinClubViewerFragment
  }
`

export default function PostHeader ({
  postQuery,
  viewerQuery
}: Props): JSX.Element {
  const postData = useFragment(PostFragment, postQuery)

  const viewerData = useFragment(ViewerFragment, viewerQuery)

  return (
    <HStack spacing={3} justify='space-between' align='center'>
      <PostHeaderClub query={postData} />
      <PostJoinClub clubQuery={postData.club} viewerQuery={viewerData} />
    </HStack>
  )
}
