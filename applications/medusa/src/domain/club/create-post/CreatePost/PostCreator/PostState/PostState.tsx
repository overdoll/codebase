import { graphql, useFragment } from 'react-relay/hooks'
import { Stack } from '@chakra-ui/react'
import UpdatePostFlow from './UpdatePostFlow/UpdatePostFlow'
import CreatePostFlow from './CreatePostFlow/CreatePostFlow'
import type { PostStateFragment$key } from '@//:artifacts/PostStateFragment.graphql'
import type { PostStateClubFragment$key } from '@//:artifacts/PostStateClubFragment.graphql'
import PostSubmitted from './PostSubmitted/PostSubmitted'
import { NotFoundClub } from '@//:modules/content/Placeholder'
import { useSequenceContext } from '@//:modules/content/HookedComponents/Sequence'
import ClubInformationBanner from '../../../../../../common/components/ClubInformationBanner/ClubInformationBanner'
import ClubDraftPostsAlert from './ClubDraftPostsAlert/ClubDraftPostsAlert'
import CreatePostFooter from './CreatePostFooter/CreatePostFooter'
import PostNotDraft from './PostNotDraft/PostNotDraft'

interface Props {
  postQuery: PostStateFragment$key | null
  clubQuery: PostStateClubFragment$key | null
}

const PostFragment = graphql`
  fragment PostStateFragment on Post {
    __typename
    state
    ...UpdatePostFlowFragment
  }
`

const ClubFragment = graphql`
  fragment PostStateClubFragment on Club {
    __typename
    ...ClubInformationBannerFragment
    ...ClubDraftPostsAlertFragment
    ...CreatePostFlowFragment
  }
`

export default function PostState ({
  postQuery,
  clubQuery
}: Props): JSX.Element {
  const postData = useFragment(PostFragment, postQuery)
  const clubData = useFragment(ClubFragment, clubQuery)

  const { state } = useSequenceContext()

  if (clubData == null) {
    return <NotFoundClub />
  }

  if (state.isSubmitted === true) {
    return <PostSubmitted />
  }

  // If there is no post found from the URL parameter, show create post initiator
  if (postData == null) {
    return (
      <>
        <ClubInformationBanner query={clubData} />
        <Stack spacing={4}>
          <ClubDraftPostsAlert query={clubData} />
          <CreatePostFlow query={clubData} />
          <CreatePostFooter />
        </Stack>
      </>
    )
  }

  // If the post was already submitted
  if (postData?.state !== 'DRAFT') {
    return (
      <PostNotDraft />
    )
  }

  // When there is a valid post we load the post creator flow
  return (
    <UpdatePostFlow
      query={postData}
    />
  )
}
