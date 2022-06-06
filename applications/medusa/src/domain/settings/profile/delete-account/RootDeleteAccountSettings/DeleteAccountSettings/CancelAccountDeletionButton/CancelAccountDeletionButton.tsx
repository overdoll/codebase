import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import type { CancelAccountDeletionButtonMutation } from '@//:artifacts/CancelAccountDeletionButtonMutation.graphql'
import type { CancelAccountDeletionButtonFragment$key } from '@//:artifacts/CancelAccountDeletionButtonFragment.graphql'
import { t, Trans } from '@lingui/macro'
import { useToast } from '@//:modules/content/ThemeComponents'
import Button from '@//:modules/form/Button/Button'

interface Props {
  query: CancelAccountDeletionButtonFragment$key
}

const Fragment = graphql`
  fragment CancelAccountDeletionButtonFragment on Account {
    id
  }
`

const Mutation = graphql`
  mutation CancelAccountDeletionButtonMutation($input: CancelAccountDeletionInput!) {
    cancelAccountDeletion(input: $input) {
      account {
        id
        isDeleted
        deleting {
          scheduledDeletion
        }
      }
    }
  }
`

export default function CancelAccountDeletionButton ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const [commit, isInFlight] = useMutation<CancelAccountDeletionButtonMutation>(
    Mutation
  )

  const notify = useToast()

  const onSubmit = (): void => {
    commit({
      variables: {
        input: {
          accountID: data.id
        }
      },
      onCompleted (d) {
        notify({
          status: 'success',
          title: t`You have cancelled the deletion of your account`
        })
      },
      onError () {
        notify({
          status: 'error',
          title: t`There was an error cancelling the deletion of your account`
        })
      }
    }
    )
  }

  return (
    <Button isLoading={isInFlight} onClick={onSubmit} size='lg' colorScheme='orange'>
      <Trans>
        Cancel Account Deletion
      </Trans>
    </Button>
  )
}
