/**
 * @flow
 */
import { useTranslation } from 'react-i18next'
import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import type { RevokeSessionMutation } from '@//:artifacts/RevokeSessionMutation.graphql'
import { MenuItem, Text, useToast } from '@chakra-ui/react'
import Icon from '@//:modules/content/Icon/Icon'
import { DeleteBin } from '../../../../../../../../assets/icons/interface'
import type { EmailsSettingsFragment$key } from '@//:artifacts/EmailsSettingsFragment.graphql'
import type { RevokeSessionFragment$key } from '@//:artifacts/RevokeSessionFragment.graphql'
import Button from '@//:modules/form/Button'

type Props = {
  connectionID: EmailsSettingsFragment$key,
  session: RevokeSessionFragment$key,
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

export default function RevokeSession ({ connectionID, session }: Props): Node {
  const [t] = useTranslation('settings')

  const data = useFragment(SessionGQL, session)

  const [RevokeSession, isRevokingSession] = useMutation<RevokeSessionMutation>(
    DeleteEmailMutationGQL
  )

  const notify = useToast()

  const onRevokeSession = () => {
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
          title: t('security.sessions.query.success'),
          isClosable: true
        })
      },
      onError () {
        notify({
          status: 'error',
          title: t('security.sessions.query.error'),
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
      {t('security.sessions.revoke')}
    </Button>
  )
}
