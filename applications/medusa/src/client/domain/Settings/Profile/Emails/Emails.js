/**
 * @flow
 */
import type { Node } from 'react'
import { useEffect } from 'react'
import {
  Divider,
  Flex,
  Heading,
  Stack, useToast
} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import AddEmailForm from './AddEmailForm/AddEmailForm'

import { graphql, useFragment } from 'react-relay/hooks'
import type { EmailsSettingsFragment$key } from '@//:artifacts/EmailsSettingsFragment.graphql'
import EmailCard from './EmailCard/EmailCard'
import { useFlash } from '@//:modules/flash'

type Props = {
  emails: EmailsSettingsFragment$key
}

const EmailsFragmentGQL = graphql`
  fragment EmailsSettingsFragment on Account {
    emails(first: $first) @connection(key: "EmailsSettingsFragment_emails") {
      __id
      edges {
        node {
          ...EmailCardFragment
          id
        }
      }
    }
  }
`

export default function Emails ({ emails }: Props): Node {
  const [t] = useTranslation('settings')

  const data = useFragment(EmailsFragmentGQL, emails)

  const emailsConnectionID = data?.emails?.__id

  const { read, flush } = useFlash()

  const notify = useToast()

  const confirmationSuccess = read('confirmation.success')

  const confirmationError = read('confirmation.error')

  useEffect(() => {
    if (confirmationError) {
      notify({
        status: 'error',
        duration: 10000,
        isClosable: true,
        title: confirmationError
      })
      flush('confirmation.error')
    }

    if (confirmationSuccess) {
      notify({
        status: 'success',
        isClosable: true,
        title: confirmationSuccess
      })
      flush('confirmation.success')
    }
  }, [confirmationError, confirmationSuccess])

  return (
    <>
      <Heading size='lg' color='gray.00'>{t('profile.email.title')}</Heading>
      <Divider borderColor='gray.500' mt={1} mb={3} />
      <Stack spacing={3} mb={3}>
        {data?.emails.edges.map((item, index) => {
          return (
            <EmailCard
              emails={item.node}
              key={index}
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
