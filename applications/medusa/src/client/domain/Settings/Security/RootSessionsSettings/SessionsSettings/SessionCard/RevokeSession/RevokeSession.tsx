import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import type { RevokeSessionMutation } from '@//:artifacts/RevokeSessionMutation.graphql'
import { useToast } from '@chakra-ui/react'
import type { RevokeSessionFragment$key } from '@//:artifacts/RevokeSessionFragment.graphql'
import { t, Trans } from '@lingui/macro'
import Button from '@//:modules/form/Button/Button'

interface Props {
  connectionID: string
  session: RevokeSessionFragment$key
}

const SessionGQL = graphql`
  fragment RevokeSessionFragment on AccountSession {
    id
  }
`

const DeleteEmailMutationGQL = graphql`
  mutation RevokeSessionMutation($input: RevokeAccountSessionInput!, $connections: [ID!]!) {
    revokeAccountSession(input: $input) {
      accountSessionId @deleteEdge(connections: $connections)
    }
  }
`

export default function RevokeSession ({
  connectionID,
  session
}: Props): JSX.Element {
  const data = useFragment(SessionGQL, session)

  const [RevokeSession, isRevokingSession] = useMutation<RevokeSessionMutation>(
    DeleteEmailMutationGQL
  )
  const notify = useToast()

  const onRevokeSession = (): void => {
    RevokeSession({
      variables: {
        input: {
          accountSessionId: data.id
        },
        connections: [connectionID]
      },
      onCompleted () {
        notify({
          status: 'success',
          title: t`Session successfully revoked`,
          isClosable: true
        })
      },
      onError () {
        notify({
          status: 'error',
          title: t`There was an error revoking the session`,
          isClosable: true
        })
      }
    }
    )
  }

  return (
    <Button
      colorScheme='orange'
      size='md'
      isDisabled={isRevokingSession}
      onClick={onRevokeSession}
    >
      <Trans>
        Revoke Session
      </Trans>
    </Button>
  )
}
