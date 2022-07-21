import { graphql, useFragment } from 'react-relay/hooks'
import type { ClubJoinBannerFragment$key } from '@//:artifacts/ClubJoinBannerFragment.graphql'
import type { ClubJoinBannerViewerFragment$key } from '@//:artifacts/ClubJoinBannerViewerFragment.graphql'
import ClubJoinConditionWrapper from '../../ClubWrappers/ClubJoinConditionWrapper/ClubJoinConditionWrapper'
import Button from '@//:modules/form/Button/Button'
import { Trans } from '@lingui/macro'
import { DiscoverGlobe, PlusCircle } from '@//:assets/icons'
import { Icon } from '@//:modules/content/PageLayout'
import ClubIconBanner from '../ClubIconBanner/ClubIconBanner'

interface Props {
  clubQuery: ClubJoinBannerFragment$key
  viewerQuery: ClubJoinBannerViewerFragment$key | null
}

const ClubFragment = graphql`
  fragment ClubJoinBannerFragment on Club {
    id
    name
    viewerMember {
      __typename
    }
    viewerIsOwner
    ...ClubJoinConditionWrapperFragment
  }
`

const ViewerFragment = graphql`
  fragment ClubJoinBannerViewerFragment on Account {
    ...ClubJoinConditionWrapperViewerFragment
  }
`

export default function ClubJoinBanner ({
  clubQuery,
  viewerQuery
}: Props): JSX.Element {
  const clubData = useFragment(ClubFragment, clubQuery)
  const viewerData = useFragment(ViewerFragment, viewerQuery)

  if (clubData.viewerMember != null && !clubData.viewerIsOwner) {
    return <></>
  }

  return (
    <ClubIconBanner
      text={<Trans>Join this club to see new content in your feed!</Trans>}
      colorScheme='green'
      icon={DiscoverGlobe}
      seed={clubData.id}
    >
      <ClubJoinConditionWrapper clubQuery={clubData} viewerQuery={viewerData}>
        {props => (
          <Button
            w='100%'
            colorScheme='green'
            size={{
              base: 'md',
              md: 'lg'
            }}
            leftIcon={<Icon icon={PlusCircle} w={4} h={4} fill='green.900' />}
            {...props}
          >
            <Trans>
              Join {clubData.name}
            </Trans>
          </Button>
        )}
      </ClubJoinConditionWrapper>
    </ClubIconBanner>
  )
}
