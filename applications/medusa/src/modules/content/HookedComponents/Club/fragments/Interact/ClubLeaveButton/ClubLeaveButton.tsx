import { ClubLeaveButtonFragment$key } from '@//:artifacts/ClubLeaveButtonFragment.graphql'
import { graphql } from 'react-relay'
import { useFragment, useMutation } from 'react-relay/hooks'
import { ClubLeaveButtonMutation } from '@//:artifacts/ClubLeaveButtonMutation.graphql'
import { PlusCircle } from '@//:assets/icons'
import { t } from '@lingui/macro'
import MediumGenericButton from '@//:common/components/GenericButtons/MediumGenericButton/MediumGenericButton'
import { useLingui } from '@lingui/react'

interface Props {
  clubQuery: ClubLeaveButtonFragment$key
}

const ClubFragment = graphql`
  fragment ClubLeaveButtonFragment on Club {
    id
  }
`

const Mutation = graphql`
  mutation ClubLeaveButtonMutation($clubId: ID!) {
    leaveClub(input: {clubId: $clubId}) {
      clubMemberId
    }
  }
`

export default function ClubLeaveButton (props: Props): JSX.Element {
  const {
    clubQuery
  } = props

  const clubData = useFragment(ClubFragment, clubQuery)

  const [leaveClub, isLeavingClub] = useMutation<ClubLeaveButtonMutation>(Mutation)

  const { i18n } = useLingui()

  const onLeaveClub = (): void => {
    if (clubData?.id == null) return

    leaveClub({
      variables: {
        clubId: clubData.id
      },
      updater: (store, payload) => {
        const node = store.get(clubData.id)
        if (node != null) {
          node.setValue(null, 'viewerMember')
          node.setValue(node.getValue('membersCount') as number - 1, 'membersCount')
        }
      }
    }
    )
  }

  return (
    <MediumGenericButton
      isLoading={isLeavingClub}
      colorScheme='primary'
      onClick={onLeaveClub}
      icon={PlusCircle}
    >
      {i18n._(t`Joined`)}
    </MediumGenericButton>
  )
}
