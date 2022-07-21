import { graphql, useFragment } from 'react-relay/hooks'
import type { ClubFooterLeaveButtonFragment$key } from '@//:artifacts/ClubFooterLeaveButtonFragment.graphql'
import { Trans } from '@lingui/macro'
import { SafetyExitDoorLeft } from '@//:assets/icons'
import ClubFooterButton from '../ClubFooterButton/ClubFooterButton'
import ClubLeaveWrapper from '../../ClubWrappers/ClubLeaveWrapper/ClubLeaveWrapper'
import Can from '@//:modules/authorization/Can'

interface Props {
  query: ClubFooterLeaveButtonFragment$key
}

const Fragment = graphql`
  fragment ClubFooterLeaveButtonFragment on Club {
    ...ClubLeaveWrapperClubFragment
    viewerMember {
      isSupporter
    }
    viewerIsOwner
  }
`

export default function ClubFooterLeaveButton ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  if (data.viewerIsOwner) {
    return <></>
  }

  if ((data?.viewerMember?.isSupporter) === true) {
    return <></>
  }

  if (data.viewerMember == null) {
    return <></>
  }

  return (
    <Can I='interact' a='Club'>
      <ClubLeaveWrapper clubQuery={data}>
        {({
          leaveClub,
          isLeavingClub
        }) => (
          <ClubFooterButton
            onClick={leaveClub}
            isLoading={isLeavingClub}
            icon={SafetyExitDoorLeft}
          >
            <Trans>
              Leave
            </Trans>
          </ClubFooterButton>
        )}
      </ClubLeaveWrapper>
    </Can>
  )
}
