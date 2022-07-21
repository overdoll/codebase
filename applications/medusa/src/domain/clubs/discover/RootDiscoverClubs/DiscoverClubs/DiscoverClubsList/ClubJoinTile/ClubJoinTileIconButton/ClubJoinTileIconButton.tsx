import { graphql, useFragment } from 'react-relay/hooks'
import { ClubJoinTileIconButtonFragment$key } from '@//:artifacts/ClubJoinTileIconButtonFragment.graphql'
import { ClubJoinTileIconButtonViewerFragment$key } from '@//:artifacts/ClubJoinTileIconButtonViewerFragment.graphql'
import { Icon } from '@//:modules/content/PageLayout'
import { PlusCircle } from '@//:assets/icons'
import { t } from '@lingui/macro'
import ClubJoinConditionWrapper
  from '../../../../../../../slug/club/RootPublicClub/PublicClub/ClubWrappers/ClubJoinConditionWrapper/ClubJoinConditionWrapper'
import IconButton from '@//:modules/form/IconButton/IconButton'
import { useLingui } from '@lingui/react'

interface Props {
  clubQuery: ClubJoinTileIconButtonFragment$key
  viewerQuery: ClubJoinTileIconButtonViewerFragment$key | null
}

const ClubFragment = graphql`
  fragment ClubJoinTileIconButtonFragment on Club {
    name
    viewerMember {
      __typename
    }
    ...ClubTileOverlayFragment
    ...ClubJoinConditionWrapperFragment
  }
`

const ViewerFragment = graphql`
  fragment ClubJoinTileIconButtonViewerFragment on Account {
    ...ClubJoinConditionWrapperViewerFragment
  }
`

export default function ClubJoinTileIconButton ({
  clubQuery,
  viewerQuery
}: Props): JSX.Element {
  const clubData = useFragment(ClubFragment, clubQuery)
  const viewerData = useFragment(ViewerFragment, viewerQuery)

  const { i18n } = useLingui()

  if (clubData.viewerMember != null) {
    return <></>
  }

  return (
    <ClubJoinConditionWrapper clubQuery={clubData} viewerQuery={viewerData}>
      {props => (
        <IconButton
          aria-label={i18n._(t`Join ${clubData.name}`)}
          colorScheme='primary'
          size='sm'
          borderRadius='lg'
          icon={<Icon icon={PlusCircle} w={4} h={4} fill='primary.900' />}
          {...props}
        />
      )}
    </ClubJoinConditionWrapper>
  )
}
