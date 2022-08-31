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
import CreatePostOpening from './CreatePostOpening/CreatePostOpening'
import useAbility from '@//:modules/authorization/useAbility'
import { Alert, AlertDescription, AlertIcon } from '@//:modules/content/ThemeComponents'
import { Trans } from '@lingui/macro'

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

  const {
    state
  } = useSequenceContext()

  const ability = useAbility()

  if (clubData == null) {
    return <NotFoundClub />
  }

  // If there is no post found from the URL parameter, show create post initiator
  if (postData == null) {
    return (
      <>
        <ClubInformationBanner query={clubData} />
        <Stack spacing={4}>
          <ClubDraftPostsAlert query={clubData} />
          <PostSubmitted />
          <CreatePostFlow query={clubData} />
          <CreatePostFooter />
        </Stack>
      </>
    )
  }

  if (state.isSubmitted === true) {
    return <CreatePostOpening />
  }

  // If the post was already submitted
  if (postData?.state !== 'DRAFT' && !ability.can('staff', 'Post')) {
    return (
      <PostNotDraft />
    )
  }

  // When there is a valid post we load the post creator flow
  return (
    <>
      {(ability.can('staff', 'Post') && postData?.state !== 'DRAFT') && (
        <Alert
          status='info'
          mb={2}
        >
          <AlertIcon />
          <AlertDescription>
            <Trans>
              You are editing this post as a staff member
            </Trans>
          </AlertDescription>
        </Alert>
      )}
      <UpdatePostFlow
        query={postData}
      />
    </>
  )
}
