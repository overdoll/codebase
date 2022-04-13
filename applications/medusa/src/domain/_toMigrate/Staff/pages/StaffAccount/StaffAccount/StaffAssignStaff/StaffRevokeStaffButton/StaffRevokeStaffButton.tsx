import { t, Trans } from '@lingui/macro'
import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import { useToast } from '@//:modules/content/ThemeComponents'
import { StaffRevokeStaffButtonMutation } from '@//:artifacts/StaffRevokeStaffButtonMutation.graphql'
import { StaffRevokeStaffButtonFragment$key } from '@//:artifacts/StaffRevokeStaffButtonFragment.graphql'

import Button from '@//:modules/form/Button/Button'

interface Props {
  query: StaffRevokeStaffButtonFragment$key
}

const Fragment = graphql`
  fragment StaffRevokeStaffButtonFragment on Account {
    id
  }
`

const Mutation = graphql`
  mutation StaffRevokeStaffButtonMutation($input: RevokeAccountStaffRole!) {
    revokeAccountStaffRole(input: $input) {
      account {
        id
        isStaff
      }
    }
  }
`

export default function StaffRevokeStaffButton ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const [commit, isInFlight] = useMutation<StaffRevokeStaffButtonMutation>(Mutation)

  const notify = useToast()

  const onSubmit = (): void => {
    commit({
      variables: {
        input: {
          accountId: data.id
        }
      },
      onCompleted () {
        notify({
          status: 'success',
          title: t`Successfully revoked staff role`
        })
      },
      onError () {
        notify({
          status: 'error',
          title: t`There was an error revoking the staff role`
        })
      }
    }
    )
  }

  return (
    <Button
      isLoading={isInFlight}
      onClick={onSubmit}
      w='100%'
      size='md'
      colorScheme='orange'
    >
      <Trans>
        Revoke Staff
      </Trans>
    </Button>
  )
}
