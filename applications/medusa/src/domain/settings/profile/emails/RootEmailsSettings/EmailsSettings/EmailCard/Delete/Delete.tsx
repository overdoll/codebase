import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import type { DeleteEmailMutation } from '@//:artifacts/DeleteEmailMutation.graphql'
import type { DeleteFragment$key } from '@//:artifacts/DeleteFragment.graphql'
import { SmallMenuItem } from '@//:modules/content/PageLayout'
import { DeleteBin } from '@//:assets/icons/interface'
import { t, Trans } from '@lingui/macro'
import { useToast } from '@//:modules/content/ThemeComponents'
import { useLingui } from '@lingui/react'

interface Props {
  connectionID: string
  query: DeleteFragment$key
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

export default function Delete ({
  connectionID,
  query
}: Props): JSX.Element {
  const data = useFragment(DeleteEmailFragmentGQL, query)

  const [deleteEmail, isDeletingEmail] = useMutation<DeleteEmailMutation>(
    DeleteEmailMutationGQL
  )

  const notify = useToast()
  const { i18n } = useLingui()

  const onDeleteEmail = (): void => {
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
          title: i18n._(t`${data.email} was removed`),
          isClosable: true
        })
      },
      onError () {
        notify({
          status: 'error',
          title: i18n._(t`There was an error removing ${data.email}`),
          isClosable: true
        })
      }
    })
  }

  return (
    <SmallMenuItem
      color='orange.300'
      isDisabled={isDeletingEmail}
      onClick={onDeleteEmail}
      icon={DeleteBin}
      text={<Trans>Remove</Trans>}
    />
  )
}
