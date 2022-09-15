import { graphql, useFragment } from 'react-relay/hooks'
import type { NewCreatePostClubFragment$key } from '@//:artifacts/NewCreatePostClubFragment.graphql'
import { Stack } from '@chakra-ui/react'
import ClubDraftPostsAlert
  from './ClubDraftPostsAlert/ClubDraftPostsAlert'
import PostSubmitted from './PostSubmitted/PostSubmitted'
import CreatePostFlow from './CreatePostFlow/CreatePostFlow'
import CreatePostFooter from './CreatePostFooter/CreatePostFooter'

interface Props {
  clubQuery: NewCreatePostClubFragment$key
}

const ClubFragment = graphql`
  fragment NewCreatePostClubFragment on Club {
    ...ClubDraftPostsAlertFragment
    ...CreatePostFlowFragment
  }
`

export default function NewCreatePost ({
  clubQuery
}: Props): JSX.Element {
  const clubData = useFragment(ClubFragment, clubQuery)

  return (
    <Stack spacing={4}>
      <ClubDraftPostsAlert query={clubData} />
      <PostSubmitted />
      <CreatePostFlow query={clubData} />
      <CreatePostFooter />
    </Stack>
  )
}
