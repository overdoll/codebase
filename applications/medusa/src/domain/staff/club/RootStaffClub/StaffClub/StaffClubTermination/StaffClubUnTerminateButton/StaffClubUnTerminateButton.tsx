import { t, Trans } from '@lingui/macro'
import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import { useToast } from '@//:modules/content/ThemeComponents'
import { StaffClubUnTerminateButtonFragment$key } from '@//:artifacts/StaffClubUnTerminateButtonFragment.graphql'
import { StaffClubUnTerminateButtonMutation } from '@//:artifacts/StaffClubUnTerminateButtonMutation.graphql'

import Button from '@//:modules/form/Button/Button'

interface Props {
  query: StaffClubUnTerminateButtonFragment$key
}

const Fragment = graphql`
  fragment StaffClubUnTerminateButtonFragment on Club {
    id
  }
`

const Mutation = graphql`
  mutation StaffClubUnTerminateButtonMutation($input: UnTerminateClubInput!) {
    unTerminateClub(input: $input) {
      club {
        id
        termination {
          account {
            id
            username
          }
        }
      }
    }
  }
`

export default function StaffClubUnTerminateButton ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const [commit, isInFlight] = useMutation<StaffClubUnTerminateButtonMutation>(Mutation)

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
          title: t`Successfully un-terminated club`
        })
      },
      onError () {
        notify({
          status: 'error',
          title: t`There was an error un-terminating the club`
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
        Un-Terminate Club
      </Trans>
    </Button>
  )
}
