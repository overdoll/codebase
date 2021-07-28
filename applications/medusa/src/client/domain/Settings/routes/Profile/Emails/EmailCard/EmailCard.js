/**
 * @flow
 */
import type { Node } from 'react'
import {
  Badge, Box,
  Flex, Heading, IconButton, Menu, MenuButton, MenuItem, MenuList, Text
} from '@chakra-ui/react'
import Icon from '@//:modules/content/Icon/Icon'
import InterfaceDeleteBin1
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/add-remove-delete/interface-delete-bin-1.svg'
import InterfaceSettingCog
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/setting/interface-setting-cog.svg'
import MailSendEnvelope from '@streamlinehq/streamlinehq/img/streamline-mini-bold/mail/send/mail-send-envelope.svg'

import { useTranslation } from 'react-i18next'
import type { EmailsSettingsFragment$key } from '@//:artifacts/EmailsSettingsFragment.graphql'
import MakePrimary from './MakePrimary/MakePrimary'

type Props = {
  email: string,
  status: string,
  emailID: string,
  connectionID: EmailsSettingsFragment$key
};

export default function EmailCard ({ email, status, emailID, connectionID }: Props): Node {
  const [t] = useTranslation('settings')

  return (
    <Box
      borderWidth={status === 'PRIMARY' ? 1 : 2}
      borderColor={status === 'PRIMARY' ? 'green.500' : 'gray.800'} p={4}
      borderRadius={5}
      bg={status === 'PRIMARY' ? 'gray.800' : 'transparent'}
    >
      <Flex align='flex-start' direction='column'>
        <Flex mb={1} align='center' w='100%' direction='row'>
          <Flex wordBreak='break-all' w='75%'>
            <Heading size='sm'>
              {email}
            </Heading>
          </Flex>
          <Flex justify='flex-end' w='25%'>
            <Badge
              colorScheme={
                status === 'PRIMARY'
                  ? 'green'
                  : status === 'CONFIRMED'
                    ? 'purple'
                    : 'orange'
              }
            >{status}
            </Badge>
          </Flex>
        </Flex>
        <Flex w='100%' align='center' justify='space-between'>
          <Flex direction='column'>
            {status === 'PRIMARY' &&
              <>
                <Text color='gray.200' fontSize='sm'>{t('profile.email.primary.hint1')}</Text>
                <Text color='gray.200' fontSize='sm'>{t('profile.email.primary.hint2')}</Text>
              </>}
            {status === 'CONFIRMED' &&
              <Text color='gray.200' fontSize='sm'>{t('profile.email.confirmed.hint1')}</Text>}
            {status === 'UNCONFIRMED' &&
              <Text color='gray.200' fontSize='sm'>{t('profile.email.unconfirmed.hint1')}</Text>}
          </Flex>
          {status !== 'PRIMARY' &&
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
                {status === 'CONFIRMED' &&
                  <MakePrimary email={email} emailID={emailID} connectionID={connectionID} />}
                {status === 'UNCONFIRMED' &&
                  <MenuItem justify='center'>
                    <Icon pointerEvents='none' icon={MailSendEnvelope} fill='gray.100' w={4} h={4} mr={2} />
                    <Text pointerEvents='none' color='gray.100'>{t('profile.email.options.resend.button')}</Text>
                  </MenuItem>}
                {(status === 'CONFIRMED' || status === 'UNCONFIRMED') &&
                  <MenuItem
                    justify='center'
                  >
                    <Icon pointerEvents='none' icon={InterfaceDeleteBin1} fill='orange.300' w={4} h={4} mr={2} />
                    <Text pointerEvents='none' color='orange.300'>{t('profile.email.options.delete.button')}</Text>
                  </MenuItem>}
              </MenuList>
            </Menu>}
        </Flex>
      </Flex>
    </Box>
  )
}
