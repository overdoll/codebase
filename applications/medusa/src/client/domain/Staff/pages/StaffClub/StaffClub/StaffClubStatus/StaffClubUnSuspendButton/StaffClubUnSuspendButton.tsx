import { t, Trans } from '@lingui/macro'
import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import { useToast } from '@//:modules/content/ThemeComponents'
import { StaffClubUnSuspendButtonFragment$key } from '@//:artifacts/StaffClubUnSuspendButtonFragment.graphql'
import { StaffClubUnSuspendButtonMutation } from '@//:artifacts/StaffClubUnSuspendButtonMutation.graphql'

import Button from '@//:modules/form/Button/Button'

interface Props {
  query: StaffClubUnSuspendButtonFragment$key
}

const Fragment = graphql`
  fragment StaffClubUnSuspendButtonFragment on Club {
    id
  }
`

const Mutation = graphql`
  mutation StaffClubUnSuspendButtonMutation($input: UnSuspendClubInput!) {
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

export default function StaffClubUnSuspendButton ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const [commit, isInFlight] = useMutation<StaffClubUnSuspendButtonMutation>(Mutation)

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
