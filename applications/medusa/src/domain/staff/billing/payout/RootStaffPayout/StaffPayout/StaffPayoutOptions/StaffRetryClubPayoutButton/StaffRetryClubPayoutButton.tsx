import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import type { StaffRetryClubPayoutButtonFragment$key } from '@//:artifacts/StaffRetryClubPayoutButtonFragment.graphql'
import { t, Trans } from '@lingui/macro'
import { StaffCancelClubPayoutButtonMutation } from '@//:artifacts/StaffCancelClubPayoutButtonMutation.graphql'
import { useToast } from '@//:modules/content/ThemeComponents'
import { MenuItem } from '@//:modules/content/ThemeComponents/Menu/Menu'
import { ArrowButtonRefresh } from '@//:assets/icons'

interface Props {
  query: StaffRetryClubPayoutButtonFragment$key
}

const Fragment = graphql`
  fragment StaffRetryClubPayoutButtonFragment on ClubPayout {
    id
  }
`

const Mutation = graphql`
  mutation StaffRetryClubPayoutButtonMutation($input: RetryClubPayoutInput!) {
    retryClubPayout(input: $input) {
      clubPayout {
        id
        status
      }
    }
  }
`

export default function StaffRetryClubPayoutButton ({
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
          title: 'Successfully retried payout'
        })
      },
      onError () {
        notify({
          status: 'error',
          title: t`There was an error retrying the payout`
        })
      }
    })
  }

  return (
    <MenuItem
      onClick={onSubmit}
      isDisabled={isInFlight}
      icon={ArrowButtonRefresh}
      text={(
        <Trans>
          Retry Payout
        </Trans>)}
    />
  )
}
