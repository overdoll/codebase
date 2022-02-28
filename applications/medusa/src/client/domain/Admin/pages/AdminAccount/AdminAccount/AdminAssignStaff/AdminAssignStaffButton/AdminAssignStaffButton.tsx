import { t, Trans } from '@lingui/macro'
import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import { useToast } from '@//:modules/content/ThemeComponents'
import { AdminAssignStaffButtonMutation } from '@//:artifacts/AdminAssignStaffButtonMutation.graphql'
import { AdminAssignStaffButtonFragment$key } from '@//:artifacts/AdminAssignStaffButtonFragment.graphql'

import Button from '@//:modules/form/Button/Button'

interface Props {
  query: AdminAssignStaffButtonFragment$key
}

const Fragment = graphql`
  fragment AdminAssignStaffButtonFragment on Account {
    id
  }
`

const Mutation = graphql`
  mutation AdminAssignStaffButtonMutation($input: AssignAccountStaffRole!) {
    assignAccountStaffRole(input: $input) {
      account {
        id
        isStaff
      }
    }
  }
`

export default function AdminAssignStaffButton ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const [commit, isInFlight] = useMutation<AdminAssignStaffButtonMutation>(Mutation)

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
          title: t`Successfully assigned staff role`
        })
      },
      onError () {
        notify({
          status: 'error',
          title: t`There was an error assigning the staff role`
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
      colorScheme='green'
    >
      <Trans>
        Assign Staff
      </Trans>
    </Button>
  )
}
