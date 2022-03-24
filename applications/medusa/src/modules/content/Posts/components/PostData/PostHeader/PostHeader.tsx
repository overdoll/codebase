import type { PostHeaderFragment$key } from '@//:artifacts/PostHeaderFragment.graphql'
import type { PostHeaderViewerFragment$key } from '@//:artifacts/PostHeaderViewerFragment.graphql'
import { graphql } from 'react-relay'
import { useFragment } from 'react-relay/hooks'
import { ButtonProps, HStack } from '@chakra-ui/react'
import { PostHeaderClub } from '../../../index'
import JoinClubFromPost
  from '../../../../../../client/domain/ClubPublicPage/ClubPublicPage/components/JoinClubButton/JoinClubFromPost/JoinClubFromPost'

interface Props extends ButtonProps {
  postQuery: PostHeaderFragment$key
  viewerQuery: PostHeaderViewerFragment$key | null
}

const PostFragment = graphql`
  fragment PostHeaderFragment on Post {
    club {
      ...JoinClubFromPostFragment
    }
    ...PostHeaderClubFragment
  }
`

const ViewerFragment = graphql`
  fragment PostHeaderViewerFragment on Account {
    ...JoinClubFromPostViewerFragment
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
      <JoinClubFromPost size='sm' clubQuery={postData.club} viewerQuery={viewerData} />
    </HStack>
  )
}