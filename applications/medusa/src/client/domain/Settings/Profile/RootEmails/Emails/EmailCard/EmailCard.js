/**
 * @flow
 */
import type { Node } from 'react'
import {
  Badge, Box,
  Flex, Heading, IconButton, Menu, MenuButton, MenuList, Text
} from '@chakra-ui/react'
import Icon from '@//:modules/content/Icon/Icon'
import InterfaceSettingCog
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/setting/interface-setting-cog.svg'
import { useTranslation } from 'react-i18next'
import type { EmailsSettingsFragment$key } from '@//:artifacts/EmailsSettingsFragment.graphql'
import type { EmailCardFragment$key } from '@//:artifacts/EmailCardFragment.graphql'
import MakePrimary from './MakePrimary/MakePrimary'
import Delete from './Delete/Delete'
import { graphql } from 'react-relay'
import { useFragment } from 'react-relay/hooks'
import Resend from './Resend/Resend'

type Props = {
  emails: EmailCardFragment$key,
  connectionID: EmailsSettingsFragment$key
};

const EmailCardFragmentGQL = graphql`
  fragment EmailCardFragment on AccountEmail {
    ...DeleteFragment
    ...MakePrimaryFragment
    email
    status
  }
`

export default function EmailCard ({ emails, connectionID }: Props): Node {
  const data = useFragment(EmailCardFragmentGQL, emails)

  const [t] = useTranslation('settings')

  return (
    <Box
      borderWidth={data.status === 'PRIMARY' ? 1 : 2}
      borderColor={data.status === 'PRIMARY' ? 'green.500' : 'gray.800'} p={4}
      borderRadius={5}
      bg={data.status === 'PRIMARY' ? 'gray.800' : 'transparent'}
      position='relative'
    >
      <Flex align='flex-start' direction='column'>
        <Flex mb={1} align='center' w='100%' direction='row'>
          <Flex wordBreak='break-all' w='75%'>
            <Heading size='sm'>
              {data.email}
            </Heading>
          </Flex>
          <Flex justify='flex-end' w='25%'>
            <Badge
              colorScheme={
                data.status === 'PRIMARY'
                  ? 'green'
                  : data.status === 'CONFIRMED'
                    ? 'purple'
                    : 'orange'
              }
            >{data.status}
            </Badge>
          </Flex>
        </Flex>
        <Flex w='100%' align='center' justify='space-between'>
          <Flex direction='column'>
            {data.status === 'PRIMARY' &&
              <>
                <Text color='gray.200' fontSize='sm'>{t('profile.email.primary.hint1')}</Text>
                <Text color='gray.200' fontSize='sm'>{t('profile.email.primary.hint2')}</Text>
              </>}
            {data.status === 'CONFIRMED' &&
              <Text color='gray.200' fontSize='sm'>{t('profile.email.confirmed.hint1')}</Text>}
            {data.status === 'UNCONFIRMED' &&
              <Text color='gray.200' fontSize='sm'>{t('profile.email.unconfirmed.hint1')}</Text>}
          </Flex>
          {data.status !== 'PRIMARY' &&
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
                {data.status === 'CONFIRMED' &&
                  <MakePrimary emails={data} connectionID={connectionID} />}
                {data.status === 'UNCONFIRMED' &&
                  <Resend />}
                {(data.status === 'CONFIRMED' || data.status === 'UNCONFIRMED') &&
                  <Delete emails={data} connectionID={connectionID} />}
              </MenuList>
            </Menu>}
        </Flex>
      </Flex>
    </Box>
  )
}
