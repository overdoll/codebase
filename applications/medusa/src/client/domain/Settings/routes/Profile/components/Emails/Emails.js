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
  IconButton,
  Menu,
  MenuButton, MenuItem,
  MenuList,
  Stack,
  Text, useToast
} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import Icon from '@//:modules/content/icon/Icon'
import AddEmailForm from './AddEmailForm/AddEmailForm'

import { graphql, useMutation } from 'react-relay/hooks'
import type { EmailsPrimaryMutation } from '@//:artifacts/EmailsPrimaryMutation.graphql'

import InterfaceDeleteBin1
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/add-remove-delete/interface-delete-bin-1.svg'
import InterfaceSettingWrench
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/setting/interface-setting-wrench.svg'
import MailSendEnvelope from '@streamlinehq/streamlinehq/img/streamline-mini-bold/mail/send/mail-send-envelope.svg'
import InterfaceSettingCog
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/setting/interface-setting-cog.svg'

type Props = {
  emails: Array<{
    email: string,
    status: string,
  }>,
  refresh: () => void,
}

const MakeEmailPrimaryMutationGQL = graphql`
  mutation EmailsPrimaryMutation($input: AddAccountEmailInput!) {
    addAccountEmail(input: $input) {
      accountEmail {
        id
      }
    }
  }
`

export default function Emails ({ emails, refresh }: Props): Node {
  const [t] = useTranslation('settings')

  const [makePrimary, isMakingPrimary] = useMutation<EmailsPrimaryMutation>(
    MakeEmailPrimaryMutationGQL
  )

  const setPrimary = (email) => {
    makePrimary({
      variables: {
        email: email
      },
      onCompleted (data) {
        if (data.addAccountEmail.ok) {
          notify({
            status: 'success',
            title: t('profile.email.confirmed.query.success', { email: email }),
            isClosable: true
          })
          refresh()
        } else {
          notify({
            status: 'error',
            title: data.addAccountEmail.validation.code,
            isClosable: true
          })
        }
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

  const [primaryEmail, confirmedEmails, unconfirmedEmails] = [
    emails.filter((item) => { return item.status === 'PRIMARY' }),
    emails.filter((item) => { return item.status === 'CONFIRMED' }),
    emails.filter((item) => { return item.status === 'UNCONFIRMED' })
  ]

  const notify = useToast()

  return (
    <>
      <Heading size='lg' color='gray.00'>{t('profile.email.title')}</Heading>
      <Divider borderColor='gray.500' mt={1} mb={3} />
      <Stack spacing={3} mb={3}>
        {primaryEmail.map((item, index) =>
          <Box key={index} borderWidth={1} borderColor='green.500' bg='gray.800' p={4} borderRadius={5}>
            <Flex align='flex-start' direction='column'>
              <Flex mb={1} align='center' w='100%' direction='row'>
                <Flex wordBreak='break-all' w='80%'>
                  <Heading size='sm'>
                    {item.email}
                  </Heading>
                </Flex>
                <Flex justify='flex-end' w='20%'>
                  <Badge colorScheme='green'>{item.status}</Badge>
                </Flex>
              </Flex>
              <Flex direction='column'>
                <Text color='gray.200' fontSize='sm'>{t('profile.email.primary.hint1')}</Text>
                <Text color='gray.200' fontSize='sm'>{t('profile.email.primary.hint2')}</Text>
              </Flex>
            </Flex>
          </Box>
        )}
        {confirmedEmails.map((item, index) =>
          <Box key={index} borderWidth={2} borderColor='gray.800' p={4} borderRadius={5}>
            <Flex align='flex-start' direction='column'>
              <Flex mb={1} align='center' w='100%' direction='row'>
                <Flex wordBreak='break-all' w='75%'>
                  <Heading size='sm'>
                    {item.email}
                  </Heading>
                </Flex>
                <Flex justify='flex-end' w='25%'>
                  <Badge colorScheme='purple'>{item.status}</Badge>
                </Flex>
              </Flex>
              <Flex w='100%' align='center' justify='space-between'>
                <Text color='gray.200' fontSize='sm'>{t('profile.email.confirmed.hint1')}</Text>
                <Menu autoSelect={false}>
                  <MenuButton
                    bg='transparent'
                    size='xs'
                    as={IconButton}
                    icon={
                      <Icon
                        icon={InterfaceSettingCog} w='fill' h='fill'
                        fill='gray.300' m={1}
                      />
                    }
                  />
                  <MenuList boxShadow='xs'>
                    <MenuItem onClick={() => setPrimary(item.email)} isDisabled={isMakingPrimary} justify='center'>
                      <Icon pointerEvents='none' icon={InterfaceSettingWrench} fill='gray.100' w={4} h={4} mr={2} />
                      <Text pointerEvents='none' color='gray.100'>{t('profile.email.options.set_primary')}</Text>
                    </MenuItem>
                    <MenuItem justify='center'>
                      <Icon pointerEvents='none' icon={InterfaceDeleteBin1} fill='orange.300' w={4} h={4} mr={2} />
                      <Text pointerEvents='none' color='orange.300'>{t('profile.email.options.delete')}</Text>
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Flex>
            </Flex>
          </Box>
        )}
        {unconfirmedEmails.map((item, index) =>
          <Box key={index} borderWidth={2} borderColor='gray.800' p={4} borderRadius={5}>
            <Flex align='flex-start' direction='column'>
              <Flex mb={1} align='center' w='100%' direction='row'>
                <Flex wordBreak='break-all' w='70%'>
                  <Heading size='sm'>
                    {item.email}
                  </Heading>
                </Flex>
                <Flex justify='flex-end' w='30%'>
                  <Badge colorScheme='orange'>{item.status}</Badge>
                </Flex>
              </Flex>
              <Flex w='100%' align='center' justify='space-between'>
                <Text color='gray.200' fontSize='sm'>{t('profile.email.unconfirmed.hint1')}</Text>
                <Menu autoSelect={false}>
                  <MenuButton
                    bg='transparent'
                    size='xs'
                    as={IconButton}
                    icon={
                      <Icon
                        icon={InterfaceSettingCog} w='fill' h='fill'
                        fill='gray.300' m={1}
                      />
                    }
                  />
                  <MenuList boxShadow='xs'>
                    <MenuItem justify='center'>
                      <Icon pointerEvents='none' icon={MailSendEnvelope} fill='gray.100' w={4} h={4} mr={2} />
                      <Text pointerEvents='none' color='gray.100'>{t('profile.email.options.resend')}</Text>
                    </MenuItem>
                    <MenuItem justify='center'>
                      <Icon pointerEvents='none' icon={InterfaceDeleteBin1} fill='orange.300' w={4} h={4} mr={2} />
                      <Text pointerEvents='none' color='orange.300'>{t('profile.email.options.delete')}</Text>
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Flex>
            </Flex>
          </Box>
        )}
      </Stack>
      <Flex>
        <AddEmailForm refresh={refresh} />
      </Flex>
    </>
  )
}
