import { t, Trans } from '@lingui/macro'
import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import { useToast } from '@//:modules/content/ThemeComponents'
import { StaffUnlockAccountFormMutation } from '@//:artifacts/StaffUnlockAccountFormMutation.graphql'
import { StaffUnlockAccountFormFragment$key } from '@//:artifacts/StaffUnlockAccountFormFragment.graphql'
import Button from '@//:modules/form/Button/Button'

interface Props {
  query: StaffUnlockAccountFormFragment$key
}

const Fragment = graphql`
  fragment StaffUnlockAccountFormFragment on Account {
    id
  }
`

const Mutation = graphql`
  mutation StaffUnlockAccountFormMutation($input: UnlockAccountInput!) {
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

export default function StaffUnlockAccountForm ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const [commit, isInFlight] = useMutation<StaffUnlockAccountFormMutation>(Mutation)

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
