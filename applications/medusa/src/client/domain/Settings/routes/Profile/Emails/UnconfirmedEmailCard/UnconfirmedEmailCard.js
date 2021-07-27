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

type Props = {
  email: string,
  status: string,
  onDelete: () => void,
  onResendEmail: () => void,
  isLoading: boolean,
};

export default function UnconfirmedEmailCard (props: Props): Node {
  const [t] = useTranslation('settings')

  return (
    <Box borderWidth={2} borderColor='gray.800' p={4} borderRadius={5}>
      <Flex align='flex-start' direction='column'>
        <Flex mb={1} align='center' w='100%' direction='row'>
          <Flex wordBreak='break-all' w='70%'>
            <Heading size='sm'>
              {props.email}
            </Heading>
          </Flex>
          <Flex justify='flex-end' w='30%'>
            <Badge colorScheme='orange'>{props.status}</Badge>
          </Flex>
        </Flex>
        <Flex w='100%' align='center' justify='space-between'>
          <Text color='gray.200' fontSize='sm'>{t('profile.email.unconfirmed.hint1')}</Text>
          <Menu autoSelect={false}>
            <MenuButton
              bg='transparent'
              isLoading={props.isLoading}
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
              <MenuItem justify='center' onClick={props.onResendEmail} isDisabled={props.isLoading}>
                <Icon pointerEvents='none' icon={MailSendEnvelope} fill='gray.100' w={4} h={4} mr={2} />
                <Text pointerEvents='none' color='gray.100'>{t('profile.email.options.resend.button')}</Text>
              </MenuItem>
              <MenuItem justify='center' onClick={props.onDelete} isDisabled={props.isLoading}>
                <Icon pointerEvents='none' icon={InterfaceDeleteBin1} fill='orange.300' w={4} h={4} mr={2} />
                <Text pointerEvents='none' color='orange.300'>{t('profile.email.options.delete.button')}</Text>
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </Box>
  )
}
