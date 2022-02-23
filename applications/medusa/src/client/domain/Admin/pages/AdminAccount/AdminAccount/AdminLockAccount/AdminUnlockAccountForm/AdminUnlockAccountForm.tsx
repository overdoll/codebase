import { t, Trans } from '@lingui/macro'
import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import { useToast } from '@//:modules/content/ThemeComponents'
import { AdminUnlockAccountFormMutation } from '@//:artifacts/AdminUnlockAccountFormMutation.graphql'
import { AdminUnlockAccountFormFragment$key } from '@//:artifacts/AdminUnlockAccountFormFragment.graphql'
import Button from '@//:modules/form/Button/Button'

interface Props {
  query: AdminUnlockAccountFormFragment$key
}

const Fragment = graphql`
  fragment AdminUnlockAccountFormFragment on Account {
    id
  }
`

const Mutation = graphql`
  mutation AdminUnlockAccountFormMutation($input: UnlockAccountInput!) {
    unlockAccount(input: $input) {
      account {
        id
        lock {
          expires
        }
      }
    }
  }
`

export default function AdminUnlockAccountForm ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const [commit, isInFlight] = useMutation<AdminUnlockAccountFormMutation>(Mutation)

  const notify = useToast()

  const onSubmit = (): void => {
    commit({
      variables: {
        input: {
          accountID: data.id
        }
      },
      onCompleted () {
        notify({
          status: 'success',
          title: t`Successfully unlocked account`
        })
      },
      onError () {
        notify({
          status: 'error',
          title: t`There was an error unlocking the account`
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
        Unlock Account
      </Trans>
    </Button>
  )
}
