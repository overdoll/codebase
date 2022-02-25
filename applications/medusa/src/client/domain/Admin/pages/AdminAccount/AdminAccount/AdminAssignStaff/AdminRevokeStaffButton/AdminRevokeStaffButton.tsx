import { t, Trans } from '@lingui/macro'
import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import { useToast } from '@//:modules/content/ThemeComponents'
import { AdminRevokeStaffButtonMutation } from '@//:artifacts/AdminRevokeStaffButtonMutation.graphql'
import { AdminRevokeStaffButtonFragment$key } from '@//:artifacts/AdminRevokeStaffButtonFragment.graphql'

import Button from '@//:modules/form/Button/Button'

interface Props {
  query: AdminRevokeStaffButtonFragment$key
}

const Fragment = graphql`
  fragment AdminRevokeStaffButtonFragment on Account {
    id
  }
`

const Mutation = graphql`
  mutation AdminRevokeStaffButtonMutation($input: RevokeAccountStaffRole!) {
    revokeAccountStaffRole(input: $input) {
      account {
        id
        isStaff
      }
    }
  }
`

export default function AdminRevokeStaffButton ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const [commit, isInFlight] = useMutation<AdminRevokeStaffButtonMutation>(Mutation)

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
