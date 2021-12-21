import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import type { RevokeSessionMutation } from '@//:artifacts/RevokeSessionMutation.graphql'
import { MenuItem, Text, useToast } from '@chakra-ui/react'
import Icon from '@//:modules/content/Icon/Icon'
import { DeleteBin } from '@//:assets/icons/interface'
import type { RevokeSessionFragment$key } from '@//:artifacts/RevokeSessionFragment.graphql'
import { t, Trans } from '@lingui/macro'

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
          title: t`Session revoked successfully`,
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
    })
  }

  return (
    <MenuItem
      justify='center'
      isDisabled={isRevokingSession}
      onClick={onRevokeSession}
    >
      <Icon pointerEvents='none' icon={DeleteBin} fill='orange.300' w={4} h={4} mr={2} />
      <Text pointerEvents='none' color='orange.300'>
        <Trans>
          Revoke
        </Trans>
      </Text>
    </MenuItem>
  )
}
