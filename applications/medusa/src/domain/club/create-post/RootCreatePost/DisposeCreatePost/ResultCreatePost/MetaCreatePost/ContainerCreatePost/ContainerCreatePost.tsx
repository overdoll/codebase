import { graphql, useFragment } from 'react-relay/hooks'
import type { ContainerCreatePostFragment$key } from '@//:artifacts/ContainerCreatePostFragment.graphql'
import type { ContainerCreatePostClubFragment$key } from '@//:artifacts/ContainerCreatePostClubFragment.graphql'
import { useSequenceContext } from '@//:modules/content/HookedComponents/Sequence'
import SuspenseCreatePost from '../../../SuspenseCreatePost/SuspenseCreatePost'
import { BannerContainer, MobileContainer } from '@//:modules/content/PageLayout'
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
