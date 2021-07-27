/**
 * @flow
 */
import type { Node } from 'react'
import {
  Badge,
  Box,
  Divider,
  Flex,
  Heading,
  Stack,
  Text,
  useToast
} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import AddEmailForm from './AddEmailForm/AddEmailForm'

import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import type { EmailsPrimaryMutation } from '@//:artifacts/EmailsPrimaryMutation.graphql'
import type { EmailsSettingsFragment$key } from '@//:artifacts/EmailsSettingsFragment.graphql'
import type { EmailsDeleteMutation } from '@//:artifacts/EmailsDeleteMutation.graphql'

import ConfirmedEmailCard from './ConfirmedEmailCard/ConfirmedEmailCard'
import UnconfirmedEmailCard from './UnconfirmedEmailCard/UnconfirmedEmailCard'

type Props = {
  emails: EmailsSettingsFragment$key
}

const EmailsFragmentGQL = graphql`
  fragment EmailsSettingsFragment on Account {
    emails {
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

const MakeEmailPrimaryMutationGQL = graphql`
  mutation EmailsPrimaryMutation($input: AddAccountEmailInput!) {
    addAccountEmail(input: $input) {
      accountEmail {
        id
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

  const [makePrimary, isMakingPrimary] = useMutation<EmailsPrimaryMutation>(
    MakeEmailPrimaryMutationGQL
  )

  const [deleteEmail, isDeletingEmail] = useMutation<EmailsPrimaryMutation>(
    DeleteEmailMutationGQL
  )

  const cardsLoading = isMakingPrimary || isDeletingEmail

  const notify = useToast()

  const setPrimary = (id, email) => {
    makePrimary({
      variables: {
        input: {
          accountEmailId: id
        }
      },
      onCompleted () {
        notify({
          status: 'success',
          title: t('profile.email.confirmed.query.success', { email: email }),
          isClosable: true
        })
      },
      onError () {
        notify({
          status: 'error',
          title: t('profile.email.confirmed.query.error', { email: email }),
          isClosable: true
        })
      }
    }
    )
  }

  const deleteSelectedEmail = (id, email) => {
    deleteEmail({
      variables: {
        input: {
          accountEmailId: id
        }
      },
      onCompleted () {
        notify({
          status: 'success',
          title: t('profile.email.options.set_primary.query.success', { email: email }),
          isClosable: true
        })
      },
      onError () {
        notify({
          status: 'error',
          title: t('profile.email.options.set_primary.query.error', { email: email }),
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
          if (item.node.status === 'PRIMARY') {
            return (
              <Box key={index} borderWidth={1} borderColor='green.500' bg='gray.800' p={4} borderRadius={5}>
                <Flex align='flex-start' direction='column'>
                  <Flex mb={1} align='center' w='100%' direction='row'>
                    <Flex wordBreak='break-all' w='80%'>
                      <Heading size='sm'>
                        {item.node.email}
                      </Heading>
                    </Flex>
                    <Flex justify='flex-end' w='20%'>
                      <Badge colorScheme='green'>{item.node.status}</Badge>
                    </Flex>
                  </Flex>
                  <Flex direction='column'>
                    <Text color='gray.200' fontSize='sm'>{t('profile.email.primary.hint1')}</Text>
                    <Text color='gray.200' fontSize='sm'>{t('profile.email.primary.hint2')}</Text>
                  </Flex>
                </Flex>
              </Box>
            )
          }
          if (item.node.status === 'CONFIRMED') {
            return (
              <ConfirmedEmailCard
                key={index} email={item.node.email} status={item.node.status}
                onDelete={() => deleteSelectedEmail(item.node.id, item.node.email)}
                onSetPrimary={() => setPrimary(item.node.id, item.node.email)} loading={cardsLoading}
              />
            )
          }
          if (item.node.status === 'UNCONFIRMED') {
            return (
              <UnconfirmedEmailCard
                key={index} email={item.node.email} status={item.node.status}
                onDelete={() => deleteSelectedEmail(item.node.id, item.node.email)}
                onResendEmail={() => { return null }} loading={cardsLoading}
              />
            )
          }
          return null
        })}
      </Stack>
      <Flex>
        <AddEmailForm />
      </Flex>
    </>
  )
}
