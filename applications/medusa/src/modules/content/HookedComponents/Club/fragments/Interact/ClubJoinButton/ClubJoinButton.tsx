import { graphql, useFragment } from 'react-relay/hooks'
import type { ClubJoinButtonFragment$key } from '@//:artifacts/ClubJoinButtonFragment.graphql'
import type { ClubJoinButtonViewerFragment$key } from '@//:artifacts/ClubJoinButtonViewerFragment.graphql'
import ClubJoinWrapper from '../../../../../Wrappers/ClubJoinWrapper/ClubJoinWrapper'
import Can from '../../../../../../authorization/Can'
import ClubJoinLoggedOutButton from '../ClubJoinLoggedOutButton/ClubJoinLoggedOutButton'
import { PlusCircle } from '@//:assets/icons'
import { t } from '@lingui/macro'
import MediumGenericButton from '@//:common/components/GenericButtons/MediumGenericButton/MediumGenericButton'
import { useLingui } from '@lingui/react'

interface Props {
  clubQuery: ClubJoinButtonFragment$key
  viewerQuery: ClubJoinButtonViewerFragment$key | null
}

const ClubFragment = graphql`
  fragment ClubJoinButtonFragment on Club {
    viewerIsOwner
    ...ClubJoinLoggedOutButtonFragment
    ...ClubJoinWrapperFragment
  }
`

const ViewerFragment = graphql`
  fragment ClubJoinButtonViewerFragment on Account {
    ...ClubJoinWrapperViewerFragment
  }
`

export default function ClubJoinButton (props: Props): JSX.Element {
  const {
    clubQuery,
    viewerQuery
  } = props

  const clubData = useFragment(ClubFragment, clubQuery)
  const viewerData = useFragment(ViewerFragment, viewerQuery)
  const { i18n } = useLingui()

  if (clubData.viewerIsOwner) {
    return <></>
  }

  if (viewerData == null) {
    return <ClubJoinLoggedOutButton clubQuery={clubData} />
  }

  return (
    <Can I='interact' a='Club' passThrough>
      {allowed => (
        <ClubJoinWrapper clubQuery={clubData} viewerQuery={viewerData}>
          {({
            joinClub,
            canJoinClub,
            isJoiningClub
          }) => (
            <MediumGenericButton
              colorScheme='green'
              isDisabled={isJoiningClub || !canJoinClub || allowed === false}
              onClick={joinClub}
              icon={PlusCircle}
            >
              {i18n._(t`Join`)}
            </MediumGenericButton>
          )}
        </ClubJoinWrapper>
      )}
    </Can>
  )
}
