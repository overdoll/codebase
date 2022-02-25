import { t, Trans } from '@lingui/macro'
import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import { useToast } from '@//:modules/content/ThemeComponents'
import { AdminClubUnSuspendButtonFragment$key } from '@//:artifacts/AdminClubUnSuspendButtonFragment.graphql'
import { AdminClubUnSuspendButtonMutation } from '@//:artifacts/AdminClubUnSuspendButtonMutation.graphql'

import Button from '@//:modules/form/Button/Button'

interface Props {
  query: AdminClubUnSuspendButtonFragment$key
}

const Fragment = graphql`
  fragment AdminClubUnSuspendButtonFragment on Club {
    id
  }
`

const Mutation = graphql`
  mutation AdminClubUnSuspendButtonMutation($input: UnSuspendClubInput!) {
    unSuspendClub(input: $input) {
      club {
        id
        suspension {
          expires
        }
      }
    }
  }
`

export default function AdminClubUnSuspendButton ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const [commit, isInFlight] = useMutation<AdminClubUnSuspendButtonMutation>(Mutation)

  const notify = useToast()

  const onSubmit = (): void => {
    commit({
      variables: {
        input: {
          clubId: data.id
        }
      },
      onCompleted () {
        notify({
          status: 'success',
          title: t`Successfully un-suspended club`
        })
      },
      onError () {
        notify({
          status: 'error',
          title: t`There was an error un-suspending club`
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
        Un-Suspend Club
      </Trans>
    </Button>
  )
}
