import { t, Trans } from '@lingui/macro'
import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import { useToast } from '@//:modules/content/ThemeComponents'
import { AdminRevokeModeratorButtonMutation } from '@//:artifacts/AdminRevokeModeratorButtonMutation.graphql'
import { AdminRevokeModeratorButtonFragment$key } from '@//:artifacts/AdminRevokeModeratorButtonFragment.graphql'

import Button from '@//:modules/form/Button/Button'

interface Props {
  query: AdminRevokeModeratorButtonFragment$key
}

const Fragment = graphql`
  fragment AdminRevokeModeratorButtonFragment on Account {
    id
  }
`

const Mutation = graphql`
  mutation AdminRevokeModeratorButtonMutation($input: RevokeAccountModeratorRole!) {
    revokeAccountModeratorRole(input: $input) {
      account {
        id
        isModerator
      }
    }
  }
`

export default function AdminRevokeModeratorButton ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const [commit, isInFlight] = useMutation<AdminRevokeModeratorButtonMutation>(Mutation)

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
          title: t`Successfully revoked moderator role`
        })
      },
      onError () {
        notify({
          status: 'error',
          title: t`There was an error revoking the moderator role`
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
        Revoke Moderator
      </Trans>
    </Button>
  )
}
