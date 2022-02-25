import { t, Trans } from '@lingui/macro'
import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import { useToast } from '@//:modules/content/ThemeComponents'
import { AdminAssignModeratorButtonMutation } from '@//:artifacts/AdminAssignModeratorButtonMutation.graphql'
import { AdminAssignModeratorButtonFragment$key } from '@//:artifacts/AdminAssignModeratorButtonFragment.graphql'

import Button from '@//:modules/form/Button/Button'

interface Props {
  query: AdminAssignModeratorButtonFragment$key
}

const Fragment = graphql`
  fragment AdminAssignModeratorButtonFragment on Account {
    id
  }
`

const Mutation = graphql`
  mutation AdminAssignModeratorButtonMutation($input: AssignAccountModeratorRole!) {
    assignAccountModeratorRole(input: $input) {
      account {
        id
        isModerator
      }
    }
  }
`

export default function AdminAssignModeratorButton ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const [commit, isInFlight] = useMutation<AdminAssignModeratorButtonMutation>(Mutation)

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
          title: t`Successfully assigned moderator role`
        })
      },
      onError () {
        notify({
          status: 'error',
          title: t`There was an error assigning the moderator role`
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
        Assign Moderator
      </Trans>
    </Button>
  )
}
