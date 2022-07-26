import type {
  PostSupporterContentLockedButtonFragment$key
} from '@//:artifacts/PostSupporterContentLockedButtonFragment.graphql'
import type {
  PostSupporterContentLockedButtonViewerFragment$key
} from '@//:artifacts/PostSupporterContentLockedButtonViewerFragment.graphql'
import { graphql } from 'react-relay'
import { useFragment } from 'react-relay/hooks'
import {
  SUPPORT_BUTTON_PROPS
} from '@//:domain/slug/club/RootPublicClub/PublicClub/ClubGenericButtons/ClubSupporterSubscriptionPriceButton/ClubSupporterSubscriptionPriceButton'
import { ButtonProps } from '@chakra-ui/react'
import ClubSupportPostConditionWrapper
  from '../../../../PostWrappers/ClubSupportPostConditionWrapper/ClubSupportPostConditionWrapper'
import { Trans } from '@lingui/macro'
import Button from '../../../../../../../form/Button/Button'

interface Props extends ButtonProps {
  clubQuery: PostSupporterContentLockedButtonFragment$key
  viewerQuery: PostSupporterContentLockedButtonViewerFragment$key | null
}

const ClubFragment = graphql`
  fragment PostSupporterContentLockedButtonFragment on Club {
    ...ClubSupportPostConditionWrapperFragment
  }
`

const ViewerFragment = graphql`
  fragment PostSupporterContentLockedButtonViewerFragment on Account {
    ...ClubSupportPostConditionWrapperViewerFragment
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
    <ClubSupportPostConditionWrapper
      clubQuery={clubData}
      viewerQuery={viewerData}
    >
      {props => (
        <Button
          {...SUPPORT_BUTTON_PROPS}
          {...props}
          {...rest}
        >
          <Trans>
            Unlock Supporter Content
          </Trans>
        </Button>
      )}
    </ClubSupportPostConditionWrapper>
  )
}
