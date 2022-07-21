import type {
  PostSupporterContentLockedButtonFragment$key
} from '@//:artifacts/PostSupporterContentLockedButtonFragment.graphql'
import type {
  PostSupporterContentLockedButtonViewerFragment$key
} from '@//:artifacts/PostSupporterContentLockedButtonViewerFragment.graphql'
import { graphql } from 'react-relay'
import { useFragment } from 'react-relay/hooks'
import ClubSupportConditionWrapper
  from '@//:domain/slug/club/RootPublicClub/PublicClub/ClubWrappers/ClubSupportConditionWrapper/ClubSupportConditionWrapper'
import ClubSupporterSubscriptionPriceButton
  from '@//:domain/slug/club/RootPublicClub/PublicClub/ClubGenericButtons/ClubSupporterSubscriptionPriceButton/ClubSupporterSubscriptionPriceButton'
import { ButtonProps } from '@chakra-ui/react'

interface Props extends ButtonProps {
  clubQuery: PostSupporterContentLockedButtonFragment$key
  viewerQuery: PostSupporterContentLockedButtonViewerFragment$key | null
}

const ClubFragment = graphql`
  fragment PostSupporterContentLockedButtonFragment on Club {
    ...ClubSupportConditionWrapperFragment
    ...ClubSupporterSubscriptionPriceButtonFragment
  }
`

const ViewerFragment = graphql`
  fragment PostSupporterContentLockedButtonViewerFragment on Account {
    ...ClubSupportConditionWrapperViewerFragment
  }
`

export default function PostSupporterContentLockedButton ({
  clubQuery,
  viewerQuery,
  ...rest
}: Props): JSX.Element {
  const clubData = useFragment(ClubFragment, clubQuery)

  const viewerData = useFragment(ViewerFragment, viewerQuery)

  return (
    <ClubSupportConditionWrapper
      redirectSupport
      clubQuery={clubData}
      viewerQuery={viewerData}
    >
      {props => (
        <ClubSupporterSubscriptionPriceButton query={clubData} {...props} {...rest} />
      )}
    </ClubSupportConditionWrapper>
  )
}
