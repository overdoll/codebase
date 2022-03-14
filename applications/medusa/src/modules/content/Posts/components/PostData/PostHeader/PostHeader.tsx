import type { PostHeaderFragment$key } from '@//:artifacts/PostHeaderFragment.graphql'
import type { PostHeaderViewerFragment$key } from '@//:artifacts/PostHeaderViewerFragment.graphql'
import { graphql } from 'react-relay'
import { useFragment } from 'react-relay/hooks'
import { ButtonProps, HStack } from '@chakra-ui/react'
import { PostHeaderClub } from '../../../index'
import JoinClubButton
  from '../../../../../../client/domain/ClubPublicPage/ClubPublicPage/components/JoinClubButton/JoinClubButton'
import { PremiumStar } from '@//:assets/icons'
import { Icon } from '../../../../PageLayout'

interface Props extends ButtonProps {
  postQuery: PostHeaderFragment$key
  viewerQuery: PostHeaderViewerFragment$key | null
}

const PostFragment = graphql`
  fragment PostHeaderFragment on Post {
    club {
      viewerMember {
        isSupporter
      }
      ...JoinClubButtonClubFragment
    }
    ...PostHeaderClubFragment
  }
`

const ViewerFragment = graphql`
  fragment PostHeaderViewerFragment on Account {
    ...JoinClubButtonViewerFragment
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
      {postData?.club?.viewerMember?.isSupporter === true
        ? (<Icon
            p={1}
            icon={PremiumStar}
            fill='orange.400'
            h={4}
            w={4}
           />)
        : (<JoinClubButton
            size='sm'
            clubQuery={postData.club}
            viewerQuery={viewerData}
           />)}
    </HStack>
  )
}
