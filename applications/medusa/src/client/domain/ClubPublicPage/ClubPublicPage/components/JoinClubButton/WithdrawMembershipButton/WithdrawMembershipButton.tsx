import type {
  WithdrawMembershipButtonClubFragment$key
} from '@//:artifacts/WithdrawMembershipButtonClubFragment.graphql'
import { graphql } from 'react-relay'
import { useFragment, useMutation } from 'react-relay/hooks'
import Button from '@//:modules/form/Button/Button'
import { Trans } from '@lingui/macro'
import { useContext } from 'react'
import { AbilityContext } from '@//:modules/authorization/AbilityContext'
import { ButtonProps } from '@chakra-ui/react'
import { WithdrawMembershipButtonMutation } from '@//:artifacts/WithdrawMembershipButtonMutation.graphql'

interface Props extends ButtonProps {
  clubQuery: WithdrawMembershipButtonClubFragment$key
}

const ClubFragment = graphql`
  fragment WithdrawMembershipButtonClubFragment on Club {
    id
    name
  }
`

const LeaveClubMutation = graphql`
  mutation WithdrawMembershipButtonMutation($clubId: ID!) {
    leaveClub(input: {clubId: $clubId}) {
      clubMemberId
    }
  }
`

export default function WithdrawMembershipButton ({
  clubQuery,
  ...rest
}: Props): JSX.Element {
  const clubData = useFragment(ClubFragment, clubQuery)

  const [withdrawMembership, isWithdrawingMembership] = useMutation<WithdrawMembershipButtonMutation>(LeaveClubMutation)

  const ability = useContext(AbilityContext)

  const isDisabled = ability.cannot('interact', 'Club')

  const onWithdrawMembership = (): void => {
    if (clubData?.id == null) return

    withdrawMembership({
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
    <Button
      isDisabled={isDisabled}
      onClick={onWithdrawMembership}
      isLoading={isWithdrawingMembership}
      colorScheme='gray'
      {...rest}
    >
      <Trans>
        Leave
      </Trans>
    </Button>
  )
}
