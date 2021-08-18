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
import AddEmailForm from './AddEmailForm/AddEmailForm'
import { graphql, useFragment, usePreloadedQuery } from 'react-relay/hooks'
import type { EmailsSettingsFragment$key } from '@//:artifacts/EmailsSettingsFragment.graphql'
import EmailCard from './EmailCard/EmailCard'
import { useFlash } from '@//:modules/flash'
import type { EmailsQuery } from '@//:artifacts/EmailsQuery.graphql'

type Props = {
  query: EmailsSettingsFragment$key
}

const EmailsQueryGQL = graphql`
  query EmailsQuery($first: Int) {
    viewer {
      ...EmailsSettingsFragment
    }
  }
`

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

export default function Emails (props: Props): Node {
  const queryData = usePreloadedQuery<EmailsQuery>(
    EmailsQueryGQL,
    props.query
  )

  const data = useFragment(EmailsFragmentGQL, queryData?.viewer)

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
