/**
 * @flow
 */
import type { Node } from 'react'
import {
  Divider,
  Flex,
  Heading,
  Stack,
  useToast
} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import AddEmailForm from './AddEmailForm/AddEmailForm'

import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import type { EmailsPrimaryMutation } from '@//:artifacts/EmailsPrimaryMutation.graphql'
import type { EmailsSettingsFragment$key } from '@//:artifacts/EmailsSettingsFragment.graphql'
import type { EmailsDeleteMutation } from '@//:artifacts/EmailsDeleteMutation.graphql'
import EmailCard from './EmailCard/EmailCard'

type Props = {
  emails: EmailsSettingsFragment$key
}

const EmailsFragmentGQL = graphql`
  fragment EmailsSettingsFragment on Account {
    emails(first: $first) @connection(key: "EmailsSettingsFragment_emails") {
      __id
      edges {
        node {
          id
          email
          status
        }
      }
    }
  }
`

const DeleteEmailMutationGQL = graphql`
  mutation EmailsDeleteMutation($input: DeleteAccountEmailInput!) {
    deleteAccountEmail(input: $input) {
      accountEmailId
    }
  }
`

export default function Emails ({ emails }: Props): Node {
  const [t] = useTranslation('settings')

  const data = useFragment(EmailsFragmentGQL, emails)

  const [deleteEmail, isDeletingEmail] = useMutation<EmailsDeleteMutation>(
    DeleteEmailMutationGQL
  )

  const emailsConnectionID = data?.emails?.__id

  const notify = useToast()

  const onDeleteEmail = (id, email) => {
    deleteEmail({
      variables: {
        input: {
          accountEmailId: id
        }
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
    <>
      <Heading size='lg' color='gray.00'>{t('profile.email.title')}</Heading>
      <Divider borderColor='gray.500' mt={1} mb={3} />
      <Stack spacing={3} mb={3}>
        {data?.emails.edges.map((item, index) => {
          return (
            <EmailCard
              key={index}
              emailID={item.node.id}
              email={item.node.email} status={item.node.status}
              connectionID={emailsConnectionID}
            />
          )
        })}
      </Stack>
      <Flex>
        <AddEmailForm connectionID={emailsConnectionID} />
      </Flex>
    </>
  )
}
