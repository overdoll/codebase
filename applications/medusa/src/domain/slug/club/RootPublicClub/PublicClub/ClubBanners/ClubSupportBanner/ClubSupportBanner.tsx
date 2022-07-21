import { graphql, useFragment } from 'react-relay/hooks'
import type { ClubSupportBannerFragment$key } from '@//:artifacts/ClubSupportBannerFragment.graphql'
import type { ClubSupportBannerViewerFragment$key } from '@//:artifacts/ClubSupportBannerViewerFragment.graphql'
import ClubSupportConditionWrapper from '../../ClubWrappers/ClubSupportConditionWrapper/ClubSupportConditionWrapper'
import ClubSupporterSubscriptionPriceButton
  from '../../ClubGenericButtons/ClubSupporterSubscriptionPriceButton/ClubSupporterSubscriptionPriceButton'
import { ClubMembers } from '@//:assets/icons'
import { Trans } from '@lingui/macro'
import ClubIconBanner from '../ClubIconBanner/ClubIconBanner'

interface Props {
  clubQuery: ClubSupportBannerFragment$key
  viewerQuery: ClubSupportBannerViewerFragment$key | null
}

const ClubFragment = graphql`
  fragment ClubSupportBannerFragment on Club {
    id
    viewerMember {
      isSupporter
    }
    viewerIsOwner
    canSupport
    ...ClubSupportConditionWrapperFragment
    ...ClubSupporterSubscriptionPriceButtonFragment
  }
`

const ViewerFragment = graphql`
  fragment ClubSupportBannerViewerFragment on Account {
    ...ClubSupportConditionWrapperViewerFragment
  }
`

export default function ClubSupportBanner ({
  clubQuery,
  viewerQuery
}: Props): JSX.Element {
  const clubData = useFragment(ClubFragment, clubQuery)
  const viewerData = useFragment(ViewerFragment, viewerQuery)

  if (!clubData.canSupport) {
    return <></>
  }

  if (((clubData?.viewerMember?.isSupporter) === true) && !clubData.viewerIsOwner) {
    return <></>
  }

  return (
    <ClubIconBanner
      text={<Trans>Become a Supporter and get access to exclusive content!</Trans>}
      colorScheme='orange'
      icon={ClubMembers}
      seed={clubData.id}
    >
      <ClubSupportConditionWrapper clubQuery={clubData} viewerQuery={viewerData}>
        {props => (
          <ClubSupporterSubscriptionPriceButton w='100%' query={clubData} {...props} />
        )}
      </ClubSupportConditionWrapper>
    </ClubIconBanner>
  )
}
