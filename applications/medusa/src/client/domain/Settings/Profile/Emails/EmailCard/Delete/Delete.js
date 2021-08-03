/**
 * @flow
 */
import { useTranslation } from 'react-i18next'
import { graphql, useMutation } from 'react-relay/hooks'
import type { DeleteEmailMutation } from '@//:artifacts/DeleteEmailMutation.graphql'
import { MenuItem, Text, useToast } from '@chakra-ui/react'
import Icon from '@//:modules/content/Icon/Icon'
import InterfaceDeleteBin1
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/add-remove-delete/interface-delete-bin-1.svg'
import type { EmailsSettingsFragment$key } from '@//:artifacts/EmailsSettingsFragment.graphql'

type Props = {
  emailID: string,
  connectionID: EmailsSettingsFragment$key,
  email: string,
}

const DeleteEmailMutationGQL = graphql`
  mutation DeleteEmailMutation($input: DeleteAccountEmailInput!, $connections: [ID!]!) {
    deleteAccountEmail(input: $input) {
      accountEmailId @deleteEdge(connections: $connections)
    }
  }
`

export default function Delete ({ emailID, connectionID, email }: Props): Node {
  const [t] = useTranslation('settings')

  const [deleteEmail, isDeletingEmail] = useMutation<DeleteEmailMutation>(
    DeleteEmailMutationGQL
  )

  const notify = useToast()

  const onDeleteEmail = (id, email) => {
    deleteEmail({
      variables: {
        input: {
          accountEmailId: id
        },
        connections: [connectionID]
      },
      onCompleted () {
        notify({
          status: 'success',
          title: t('profile.email.options.delete.query.success', { email: email }),
          isClosable: true
        })
      },
      onError () {
        notify({
          status: 'error',
          title: t('profile.email.options.delete.query.error', { email: email }),
          isClosable: true
        })
      }
    }
    )
  }

  return (
    <MenuItem
      justify='center' isDisabled={isDeletingEmail} onClick={() => onDeleteEmail(emailID, email)}
    >
      <Icon pointerEvents='none' icon={InterfaceDeleteBin1} fill='orange.300' w={4} h={4} mr={2} />
      <Text pointerEvents='none' color='orange.300'>{t('profile.email.options.delete.button')}</Text>
    </MenuItem>
  )
}
