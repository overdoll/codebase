/**
 * @flow
 */
import { useTranslation } from 'react-i18next'
import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import type { DeleteEmailMutation } from '@//:artifacts/DeleteEmailMutation.graphql'
import { useToast } from '@chakra-ui/react'
import type { EmailsSettingsFragment$key } from '@//:artifacts/EmailsSettingsFragment.graphql'
import type { DeleteFragment$key } from '@//:artifacts/DeleteFragment.graphql'
import { SmallMenuItem } from '@//:modules/content/PageLayout'
import { DeleteBin } from '../../../../../../../../assets/icons/interface'

type Props = {
  connectionID: EmailsSettingsFragment$key,
  query: DeleteFragment$key,
}

const DeleteEmailFragmentGQL = graphql`
  fragment DeleteFragment on AccountEmail {
    id
    email
  }
`

const DeleteEmailMutationGQL = graphql`
  mutation DeleteEmailMutation($input: DeleteAccountEmailInput!, $connections: [ID!]!) {
    deleteAccountEmail(input: $input) {
      accountEmailId @deleteEdge(connections: $connections)
    }
  }
`

export default function Delete ({ connectionID, query }: Props): Node {
  const [t] = useTranslation('settings')

  const data = useFragment(DeleteEmailFragmentGQL, query)

  const [deleteEmail, isDeletingEmail] = useMutation<DeleteEmailMutation>(
    DeleteEmailMutationGQL
  )

  const notify = useToast()

  const onDeleteEmail = () => {
    deleteEmail({
      variables: {
        input: {
          accountEmailId: data.id
        },
        connections: [connectionID]
      },
      onCompleted () {
        notify({
          status: 'success',
          title: t('profile.email.options.delete.query.success', { email: data.email }),
          isClosable: true
        })
      },
      onError () {
        notify({
          status: 'error',
          title: t('profile.email.options.delete.query.error', { email: data.email }),
          isClosable: true
        })
      }
    }
    )
  }

  return (
    <SmallMenuItem
      isDisabled={isDeletingEmail}
      onClick={onDeleteEmail}
      icon={DeleteBin}
      color='orange.300'
      text={t('profile.email.options.delete.button')}
    />
  )
}
