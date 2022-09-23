import { graphql, useFragment } from 'react-relay/hooks'
import type { ContainerCreatePostFragment$key } from '@//:artifacts/ContainerCreatePostFragment.graphql'
import type { ContainerCreatePostClubFragment$key } from '@//:artifacts/ContainerCreatePostClubFragment.graphql'
import { useSequenceContext } from '@//:modules/content/HookedComponents/Sequence'
import useAbility from '@//:modules/authorization/useAbility'
import SuspenseCreatePost from '../../../SuspenseCreatePost/SuspenseCreatePost'
import { BannerContainer, MobileContainer } from '@//:modules/content/PageLayout'
import SubmittedCreatePost from './SubmittedCreatePost/SubmittedCreatePost'
import BannerCreatePost from './BannerCreatePost/BannerCreatePost'
import UpdateCreatePost from './UpdateCreatePost/UpdateCreatePost'
import NewCreatePost from './NewCreatePost/NewCreatePost'

interface Props {
  postQuery: ContainerCreatePostFragment$key | null
  clubQuery: ContainerCreatePostClubFragment$key
}

const PostFragment = graphql`
  fragment ContainerCreatePostFragment on Post {
    state
    ...BannerCreatePostFragment
    ...UpdateCreatePostFragment
  }
`

const ClubFragment = graphql`
  fragment ContainerCreatePostClubFragment on Club {
    ...BannerCreatePostClubFragment
    ...NewCreatePostClubFragment
  }
`

export default function ContainerCreatePost ({
  postQuery,
  clubQuery
}: Props): JSX.Element {
  const postData = useFragment(PostFragment, postQuery)
  const clubData = useFragment(ClubFragment, clubQuery)

  const {
    state
  } = useSequenceContext()

  const ability = useAbility()

  // If there is no post found from the URL parameter, show create post initiator
  if (postData == null) {
    return (
      <>
        <BannerContainer pt={2}>
          <BannerCreatePost postQuery={postData} clubQuery={clubData} />
        </BannerContainer>
        <MobileContainer>
          <NewCreatePost clubQuery={clubData} />
        </MobileContainer>
      </>
    )
  }

  if (state.isSubmitted === true) {
    return <SuspenseCreatePost />
  }

  // If the post was already submitted
  if (postData?.state !== 'DRAFT' && !ability.can('staff', 'Post')) {
    return (
      <MobileContainer pt={2}>
        <SubmittedCreatePost />
      </MobileContainer>
    )
  }

  // When there is a valid post we load the post creator flow
  return (
    <>
      <BannerContainer pt={2}>
        <BannerCreatePost postQuery={postData} clubQuery={clubData} />
      </BannerContainer>
      <UpdateCreatePost query={postData} />
    </>
  )
}
