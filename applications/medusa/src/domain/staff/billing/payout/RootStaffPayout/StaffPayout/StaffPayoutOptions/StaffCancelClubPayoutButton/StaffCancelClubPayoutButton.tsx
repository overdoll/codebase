import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import type { StaffCancelClubPayoutButtonFragment$key } from '@//:artifacts/StaffCancelClubPayoutButtonFragment.graphql'
import { t, Trans } from '@lingui/macro'
import { StaffCancelClubPayoutButtonMutation } from '@//:artifacts/StaffCancelClubPayoutButtonMutation.graphql'
import { useToast } from '@//:modules/content/ThemeComponents'
import { MenuItem } from '@//:modules/content/ThemeComponents/Menu/Menu'
import { DeleteCircle } from '@//:assets/icons'

interface Props {
  query: StaffCancelClubPayoutButtonFragment$key
}

const Fragment = graphql`
  fragment StaffCancelClubPayoutButtonFragment on ClubPayout {
    id
  }
`

const Mutation = graphql`
  mutation StaffCancelClubPayoutButtonMutation($input: CancelClubPayoutInput!) {
    cancelClubPayout(input: $input) {
      clubPayout {
        id
        status
      }
    }
  }
`

export default function StaffCancelClubPayoutButton ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const [commit, isInFlight] = useMutation<StaffCancelClubPayoutButtonMutation>(Mutation)

  const notify = useToast()

  const onSubmit = (): void => {
    commit({
      variables: {
        input: {
          payoutId: data.id
        }
      },
      onCompleted () {
        notify({
          status: 'success',
          title: 'Successfully cancelled payout'
        })
      },
      onError () {
        notify({
          status: 'error',
          title: t`There was an error cancelling the payout`
        })
      }
    })
  }

  return (
    <MenuItem
      onClick={onSubmit}
      isDisabled={isInFlight}
      icon={DeleteCircle}
      text={(
        <Trans>
          Cancel Payout
        </Trans>)}
    />
  )
}
